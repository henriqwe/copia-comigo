import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'

import * as products from '&crm/domains/commercial/Providers/Tabs/Products'

import * as utils from '@comigo/utils'

import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

type ProductProvider = {
  Id: string
  Precos: { Id: string; Valor: string }[]
}

type Price = {
  Id: string
  Valor: string
  created_at: Date
  TipoDeRecorrencia?: {
    Comentario: string
    Valor: string
  }
  TipoDePreco?: {
    Comentario: string
    Valor: string
  }
}

export default function CreateProductPrice() {
  const [productProvider, setProductProvider] = useState<ProductProvider>()
  const [prices, setPrices] = useState<Price[]>([])
  const [allowRecurrenceType, setAllowRecurrenceType] = useState(false)
  const {
    createProductPriceLoading,
    createProductPrice,
    setSlidePanelState,
    productsRefetch,
    slidePanelState,
    getProductProviderByProductId,
    pricingSchema,
    recurrenceTypeData,
    priceTypeData
  } = products.useProduct()
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(pricingSchema)
  })

  const onSubmit = (formData: {
    Valor: string
    TipoDeRecorrencia_Id?: { key: string }
    TipoDePreco_Id?: { key: string }
  }) => {
    try {
      if (allowRecurrenceType && formData.TipoDeRecorrencia_Id === undefined) {
        return utils.notification(
          'Selecione o tipo de recorrĂȘncia para continuar',
          'error'
        )
      }
      createProductPrice({
        variables: {
          Fornecedor_Produto_Id: productProvider?.Id,
          TipoDeRecorrencia_Id: formData.TipoDeRecorrencia_Id
            ? formData.TipoDeRecorrencia_Id.key
            : null,
          Valor: Number(utils.BRLMoneyUnformat(formData.Valor)).toFixed(2),
          TipoDePreco_Id: formData.TipoDePreco_Id.key
        }
      }).then(() => {
        productsRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        utils.notification('Produto precificado com sucesso', 'success')
      })
    } catch (error: any) {
      utils.showError(error)
    }
  }

  useEffect(() => {
    getProductProviderByProductId(slidePanelState.data?.Id).then((data) => {
      setProductProvider(data[0])
      if (data[0].Precos.length > 0) {
        setValue(
          'Valor',
          utils.BRLMoneyInputDefaultFormat(data[0].Precos[0].Valor.toString())
        )
        setPrices(data[0].Precos)
      }
    })
  }, [slidePanelState.data])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          control={control}
          name={'Valor'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Input
                fieldName={'Valor'}
                title={`Valor`}
                value={value}
                onChange={(e) => {
                  onChange(utils.BRLMoneyInputFormat(e))
                }}
                error={errors.Valor}
                icon="R$"
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name={'TipoDePreco_Id'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  priceTypeData
                    ? priceTypeData.map((priceType) => {
                        return {
                          key: priceType.Valor,
                          title: priceType.Comentario
                        }
                      })
                    : []
                }
                value={value}
                onChange={(e) => {
                  setAllowRecurrenceType(false)
                  if (e.key === 'recorrencia') {
                    setAllowRecurrenceType(true)
                  }
                  onChange(e)
                }}
                label="Tipo de preĂ§o"
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name={'TipoDeRecorrencia_Id'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  recurrenceTypeData
                    ? recurrenceTypeData.map((recurrenceType) => {
                        return {
                          key: recurrenceType.Valor,
                          title: recurrenceType.Comentario
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                disabled={!allowRecurrenceType}
                label="Tipo de recorrĂȘncia"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Confirmar"
        disabled={createProductPriceLoading}
        loading={createProductPriceLoading}
      />
      <div className="w-full">
        {prices.length > 0 ? (
          <>
            <common.Separator />
            <h2 className="mb-2 text-xl">Ăltimos preĂ§os</h2>

            <ol>
              {prices.map(
                ({ Valor, Id, created_at, TipoDeRecorrencia, TipoDePreco }) => (
                  <div key={Id}>
                    <li className="list-disc list-item">
                      {utils.BRLMoneyFormat(Valor)} -{' '}
                      {utils.ptBRtimeStamp(created_at)}{' '}
                      {TipoDeRecorrencia
                        ? `- ${TipoDeRecorrencia?.Comentario} `
                        : ''}
                      {TipoDePreco ? `- ${TipoDePreco?.Comentario}` : ''}
                    </li>
                  </div>
                )
              )}
            </ol>
          </>
        ) : null}
      </div>
    </form>
  )
}
