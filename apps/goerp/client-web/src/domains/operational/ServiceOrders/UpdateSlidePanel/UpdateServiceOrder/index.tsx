import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as common from '@comigo/ui-common'

import * as serviceOrders from '&erp/domains/operational/ServiceOrders'

import * as utils from '@comigo/utils'
import { useEffect } from 'react'
import { datetimeFormat } from '@comigo/utils'

type FormData = {
  Agendamento: Date
  Colaborador_Id: {
    key: string
    title: string
  }
}

export function Schedule() {
  const {
    updateServiceOrdersLoading,
    updateServiceOrders,
    serviceOrderData,
    serviceOrderRefetch,
    serviceOrdersSchema,
    setSlidePanelState,
    serviceOrderActivitiesRefetch,
    collaboratorsData,
    getItemIdByProductId,
    getChipIdentifierByItemId,
    getEquipmentIdentifierByItemId,
    getIdentifierByItemId,
    getTrackerIdentifierByItemId,
    getInputKitsIdentifierByItemId,
    getInstallationKitsIdentifierByItemId,
    updateChip,
    updateEquipment,
    updateIdentifier,
    updateTracker,
    updateInputKit,
    updateInstallationKit,
    getItemById,
    updateServiceOrdersProduct
  } = serviceOrders.useUpdate()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control
  } = useForm({ resolver: yupResolver(serviceOrdersSchema) })

  async function onSubmit(formData: FormData) {
    let inventoryValidation = false
    const identifiers: { type: string; id: string; productId: string }[] = []

    const Itens = await Promise.all(
      serviceOrderData.Produtos.map(async (product) => {
        const item = await getItemIdByProductId(product.Produto.Id)
        let saldo = 0
        switch (item[0].TipoDeItem_Id) {
          case 'chips':
            await getChipIdentifierByItemId(item[0].Item_Id).then((chip) => {
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
            await getEquipmentIdentifierByItemId(item[0].Item_Id).then(
              (equipment) => {
                if (equipment.length === 0) {
                  inventoryValidation = true
                  return
                }
                identifiers.push({
                  type: 'equipamentos',
                  id: equipment[0].Id,
                  productId: product.Id
                })
              }
            )
            break
          case 'identificadores':
            await getIdentifierByItemId(item[0].Item_Id).then(
              (identifierResponse) => {
                if (identifierResponse.length === 0) {
                  inventoryValidation = true
                  return
                }
                identifiers.push({
                  type: 'identificadores',
                  id: identifierResponse[0].Id,
                  productId: product.Id
                })
              }
            )
            break
          case 'rastreadores':
            await getTrackerIdentifierByItemId(item[0].Item_Id).then(
              (tracker) => {
                if (tracker.length === 0) {
                  inventoryValidation = true
                  return
                }
                identifiers.push({
                  type: 'rastreadores',
                  id: tracker[0].Id,
                  productId: product.Id
                })
              }
            )
            break
          case 'kitsDeInsumo':
            await getInputKitsIdentifierByItemId(item[0].Item_Id).then(
              (inputKit) => {
                if (inputKit.length === 0) {
                  inventoryValidation = true
                  return
                }
                identifiers.push({
                  type: 'kitsDeInsumo',
                  id: inputKit[0].Id,
                  productId: product.Id
                })
              }
            )
            break
          case 'kitsDeInstalacao':
            await getInstallationKitsIdentifierByItemId(item[0].Item_Id).then(
              (installationKit) => {
                if (installationKit.length === 0) {
                  inventoryValidation = true
                  return
                }
                identifiers.push({
                  type: 'kitsDeInstalacao',
                  id: installationKit[0].Id,
                  productId: product.Id
                })
              }
            )
            break
          default:
            ;(await getItemById(item[0].Item_Id)).Movimentacoes.map(
              (movimentacao) => {
                if (movimentacao.Tipo === 'saida') {
                  saldo = saldo - movimentacao.Quantidade
                  return
                }
                saldo = saldo + movimentacao.Quantidade
              }
            )
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
      return utils.notification(
        'Há itens que não estão disponíveis no estoque',
        'error'
      )
    }

    await updateServiceOrders({
      variables: {
        Agendamento: formData.Agendamento,
        Colaborador_Id: formData.Colaborador_Id.key,
        Itens
      }
    })
      .then(async () => {
        await Promise.all(
          identifiers.map(async (identifier) => {
            switch (identifier.type) {
              case 'chips':
                await updateChip({
                  variables: {
                    Id: identifier.id,
                    Ativo: true
                  }
                })
                break
              case 'equipamentos':
                await updateEquipment({
                  variables: {
                    Id: identifier.id,
                    Ativo: true
                  }
                })

                break
              case 'identificadores':
                await updateIdentifier({
                  variables: {
                    Id: identifier.id,
                    Ativo: true
                  }
                })
                break
              case 'rastreadores':
                await updateTracker({
                  variables: {
                    Id: identifier.id,
                    Ativo: true
                  }
                })
                break
              case 'kitsDeInsumo':
                await updateInputKit({
                  variables: {
                    Id: identifier.id,
                    Ativo: true
                  }
                })
                break
              case 'kitsDeInstalacao':
                await updateInstallationKit({
                  variables: {
                    Id: identifier.id,
                    Ativo: true
                  }
                })
                break
            }
            await updateServiceOrdersProduct({
              variables: {
                Id: identifier.productId,
                Identificavel_Id: identifier.id,
                TipoDeIdentificavel_Id: identifier.type
              }
            })
          })
        )
        serviceOrderRefetch()
        serviceOrderActivitiesRefetch()
        setSlidePanelState({
          open: false,
          type: 'schedule'
        })
        utils.notification('Ordem de serviço agendada com sucesso', 'success')
      })
      .catch((err) => {
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
        disabled={updateServiceOrdersLoading}
        loading={updateServiceOrdersLoading}
      />
    </form>
  )
}
