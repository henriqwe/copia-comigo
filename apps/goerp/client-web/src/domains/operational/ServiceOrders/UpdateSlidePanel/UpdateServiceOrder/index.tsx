import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as common from '@comigo/ui-common'
import * as mutations from '../../operations/mutations'
import * as queries from '../../operations/queries'

import * as serviceOrders from '&erp/domains/operational/ServiceOrders'

import * as utils from '@comigo/utils'
import { useEffect, useState } from 'react'
import { datetimeFormat } from '@comigo/utils'
import { useRouter } from 'next/router'

type FormData = {
  Agendamento: Date
  Colaborador_Id: {
    key: string
    title: string
  }
}

export function Schedule() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {
    serviceOrderData,
    serviceOrderRefetch,
    serviceOrdersSchema,
    setSlidePanelState,
    serviceOrderActivitiesRefetch,
    collaboratorsData
  } = serviceOrders.useUpdate()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control
  } = useForm({ resolver: yupResolver(serviceOrdersSchema) })

  async function onSubmit(formData: FormData) {
    setLoading(true)
    let inventoryValidation = false
    const identifiers: { type: string; id: string; productId: string }[] = []

    const Itens = await Promise.all(
      serviceOrderData.Produtos.map(async (product) => {
        const item = await queries.getItemIdByProductId(product.Produto.Id)
        let saldo = 0
        switch (item[0].TipoDeItem_Id) {
          case 'chips':
            await queries
              .getChipIdentifierByItemId(undefined, item[0].Item_Id)
              .then((chip) => {
                if (chip.length === 0) {
                  inventoryValidation = true
                  return
                }
                identifiers.push({
                  type: 'chips',
                  id: chip[0].Id,
                  productId: product.Id
                })
              })
            break
          case 'equipamentos':
            await queries
              .getEquipmentIdentifierByItemId(undefined, item[0].Item_Id)
              .then((equipment) => {
                if (equipment.length === 0) {
                  inventoryValidation = true
                  return
                }
                identifiers.push({
                  type: 'equipamentos',
                  id: equipment[0].Id,
                  productId: product.Id
                })
              })
            break
          case 'identificadores':
            await queries
              .getIdentifierByItemId(undefined, item[0].Item_Id)
              .then((identifierResponse) => {
                if (identifierResponse.length === 0) {
                  inventoryValidation = true
                  return
                }
                identifiers.push({
                  type: 'identificadores',
                  id: identifierResponse[0].Id,
                  productId: product.Id
                })
              })
            break
          case 'rastreadores':
            await queries
              .getTrackerIdentifierByItemId(undefined, item[0].Item_Id)
              .then((tracker) => {
                if (tracker.length === 0) {
                  inventoryValidation = true
                  return
                }
                identifiers.push({
                  type: 'rastreadores',
                  id: tracker[0].Id,
                  productId: product.Id
                })
              })
            break
          case 'kitsDeInsumo':
            await queries
              .getInputKitsIdentifierByItemId(undefined, item[0].Item_Id)
              .then((inputKit) => {
                if (inputKit.length === 0) {
                  inventoryValidation = true
                  return
                }
                identifiers.push({
                  type: 'kitsDeInsumo',
                  id: inputKit[0].Id,
                  productId: product.Id
                })
              })
            break
          case 'kitsDeInstalacao':
            await queries
              .getInstallationKitsIdentifierByItemId(undefined, item[0].Item_Id)
              .then((installationKit) => {
                if (installationKit.length === 0) {
                  inventoryValidation = true
                  return
                }
                identifiers.push({
                  type: 'kitsDeInstalacao',
                  id: installationKit[0].Id,
                  productId: product.Id
                })
              })
            break
          default:
            await queries.getItemById(item[0].Item_Id).then((response) => {
              response.Movimentacoes.map((movimentacao) => {
                if (movimentacao.Tipo === 'saida') {
                  saldo = saldo - movimentacao.Quantidade
                  return
                }
                saldo = saldo + movimentacao.Quantidade
              })
            })

            if (saldo <= 0) {
              inventoryValidation = true
            }
            break
        }
        return {
          Produto_Id: product.Produto.Id,
          Item_Id: item[0].Item_Id,
          RetiradoDoEstoque: false
        }
      })
    )

    if (inventoryValidation) {
      setLoading(false)
      return utils.notification(
        'Há itens que não estão disponíveis no estoque',
        'error'
      )
    }

    await mutations
      .updateServiceOrders({
        Agendamento: formData.Agendamento,
        Colaborador_Id: formData.Colaborador_Id.key,
        Itens,
        OS_Id: router.query.id as string
      })
      .then(async () => {
        await Promise.all(
          identifiers.map(async (identifier) => {
            switch (identifier.type) {
              case 'chips':
                await mutations.updateChip({
                  Id: identifier.id,
                  Ativo: true
                })
                break
              case 'equipamentos':
                await mutations.updateEquipment({
                  Id: identifier.id,
                  Ativo: true
                })

                break
              case 'identificadores':
                await mutations.updateIdentifier({
                  Id: identifier.id,
                  Ativo: true
                })
                break
              case 'rastreadores':
                await mutations.updateTracker({
                  Id: identifier.id,
                  Ativo: true
                })
                break
              case 'kitsDeInsumo':
                await mutations.updateInputKit({
                  Id: identifier.id,
                  Ativo: true
                })
                break
              case 'kitsDeInstalacao':
                await mutations.updateInstallationKit({
                  Id: identifier.id,
                  Ativo: true
                })
                break
            }
            await mutations.updateServiceOrdersProduct({
              Id: identifier.productId,
              Identificavel_Id: identifier.id,
              TipoDeIdentificavel_Id: identifier.type
            })
          })
        )
        setLoading(false)
        serviceOrderRefetch()
        serviceOrderActivitiesRefetch()
        setSlidePanelState({
          open: false,
          type: 'schedule'
        })
        utils.notification('Ordem de serviço agendada com sucesso', 'success')
      })
      .catch((err) => {
        setLoading(false)
        utils.showError(err)
      })
  }

  useEffect(() => {
    if (serviceOrderData) {
      reset({
        Agendamento:
          serviceOrderData.Agendamentos.length > 0
            ? datetimeFormat(serviceOrderData.Agendamentos[0].Agendamento)
            : undefined
      })
    }
  }, [reset, serviceOrderData])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.Input
          fieldName="Agendamento"
          register={register}
          title="Data de agendamento"
          error={errors.Agendamento}
          type="datetime-local"
        />
        <Controller
          control={control}
          name="Colaborador_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  collaboratorsData
                    ? collaboratorsData.map((item) => {
                        return {
                          key: item.Id,
                          title: item.Pessoa.Nome
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Colaborador_Id}
                label="Colaborador"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={loading}
        loading={loading}
      />
    </form>
  )
}
