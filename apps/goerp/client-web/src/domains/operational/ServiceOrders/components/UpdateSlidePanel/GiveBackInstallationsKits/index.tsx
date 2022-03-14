import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as common from '@comigo/ui-common'
import * as mutations from '../../../operations/mutations'
import * as queries from '../../../operations/queries'
import * as api from '../../../api'

import * as serviceOrders from '&erp/domains/operational/ServiceOrders'

import * as utils from '@comigo/utils'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { InstallationKitsType } from '../../../types/installationKit'

type FormData = {
  Agendamento: Date
  Colaborador_Id: {
    key: string
    title: string
  }
  Responsavel: string
  Telefone: string
  Bairro: string
  Logradouro: string
  Cep: string
  Cidade: string
  Estado: string
  Numero: string
  Complemento: string
}

export function GiveBack() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [installationKits, setInstallationKits] =
    useState<InstallationKitsType[]>()
  const {
    serviceOrderData,
    serviceOrderRefetch,
    setSlidePanelState,
    serviceOrderActivitiesRefetch,
    client,
    productItens,
    setActiveEdit,
    vehicle
  } = serviceOrders.useUpdate()

  const { register, handleSubmit, control } = useForm()

  async function onSubmit(formData: FormData) {
    setLoading(true)
    try {
      await Promise.all(
        installationKits.map(async (installationKit, index) => {
          let itensValues = installationKit.KitDeInsumo.Itens.map(
            (item, index2) => {
              if (!formData['QuantidadeDevolver' + index + '-' + index2]) {
                return
              }

              if (formData['QuantidadeDevolver' + index + '-' + index2] == 0) {
                return
              }

              if (
                formData['QuantidadeDevolver' + index + '-' + index2] >
                formData['QuantidadeAtual' + index + '-' + index2]
              ) {
                return null
              }

              return {
                Data: new Date(),
                Item_Id: formData['Item_Id' + index + '-' + index2].key,
                Valor: 0,
                Quantidade:
                  formData['QuantidadeDevolver' + index + '-' + index2],
                Tipo: 'entrada',
                Motivo_Id: 'devolucaoDeKitDeInsumo',
                Id: item.Id,
                QuantidadeAtual:
                  formData['QuantidadeAtual' + index + '-' + index2]
              }
            }
          )
          if (itensValues.includes(null)) {
            throw new Error(
              'A quantidade para devolver precisa ser menor que a quantidade atual!'
            )
          }

          itensValues = itensValues.filter(
            (item) => item?.Quantidade !== undefined
          )

          const finalItensValues = itensValues.map((item) => {
            mutations.giveBackInputTypeItem({
              Id: item?.Id,
              Quantidade: item?.QuantidadeAtual - item?.Quantidade
            })

            return {
              Data: item?.Data,
              Item_Id: item?.Item_Id,
              Valor: item?.Valor,
              Quantidade: item?.Quantidade,
              Tipo: item?.Tipo,
              Motivo_Id: item?.Motivo_Id
            }
          })

          await mutations
            .giveBackInputType({
              data: finalItensValues,
              Id: installationKit.KitDeInsumo.Id
            })
            .then(async () => {
              setLoading(false)
              utils.notification('Insumos devolvidos com sucesso', 'success')
            })
        })
      )
      await api.finishServiceOrderSubmit({
        OS_Id: router.query.id as string,
        client,
        productItens,
        serviceOrderActivitiesRefetch,
        serviceOrderData,
        serviceOrderRefetch,
        setActiveEdit,
        vehicle,
        setLoading
      })
      setSlidePanelState({
        open: false,
        type: 'giveBack'
      })
    } catch (err: any) {
      setLoading(false)
      utils.showError(err)
    }
  }

  async function getInstallationsKits() {
    const installationsKits = await Promise.all(
      serviceOrderData.Produtos.filter(
        (product) => product.TipoDeIdentificavel_Id === 'kitsDeInstalacao'
      ).map(async (product) => {
        const installationKit =
          await queries.getInstallationKitsIdentifierByItemId(
            product.Identificavel_Id,
            undefined,
            true
          )
        return installationKit[0]
      })
    )
    setInstallationKits(installationsKits)
  }

  useEffect(() => {
    if (serviceOrderData) {
      getInstallationsKits()
    }
  }, [serviceOrderData])

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        {installationKits?.map((installationKit, index) => (
          <div key={index}>
            <p className="mb-2">
              Kit de Insumo:{' '}
              {installationKit.KitDeInsumo.TiposDeKitDeInsumo.Nome}
            </p>
            {installationKit.KitDeInsumo.Itens.map((item, index2) => (
              <div key={index2}>
                <Controller
                  name={'Item_Id' + index + '-' + index2}
                  defaultValue={{
                    key: item.Item.Id,
                    title:
                      item.Item.Produto.Nome +
                      ' - ' +
                      item.Item.Fabricante.Nome +
                      ' - ' +
                      item.Item.Modelo?.Nome +
                      ' - ' +
                      item.Item.Grupo.Nome +
                      ' - ' +
                      item.Item.Familia.Nome
                  }}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <common.form.Select
                        itens={[]}
                        value={value}
                        onChange={onChange}
                        disabled
                        label="Item"
                      />
                    </div>
                  )}
                />
                <div className="flex gap-4 my-2">
                  <Controller
                    name={'QuantidadeAtual' + index + '-' + index2}
                    defaultValue={item.Quantidade}
                    control={control}
                    render={({ field: { value } }) => (
                      <div>
                        <common.form.Input
                          fieldName={'QuantidadeAtual' + index}
                          value={value}
                          onChange={() => null}
                          title="Quantidade atual"
                          register={register}
                          disabled
                        />
                      </div>
                    )}
                  />

                  <div>
                    <common.form.Input
                      fieldName={'QuantidadeDevolver' + index + '-' + index2}
                      title="Quantidade para devolver"
                      register={register}
                    />
                  </div>
                </div>
              </div>
            ))}
            {index !== installationKits.length - 1 && <common.Separator />}
          </div>
        ))}
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
