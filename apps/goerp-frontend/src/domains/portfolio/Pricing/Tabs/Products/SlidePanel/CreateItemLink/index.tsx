import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'


import * as products from '&erp/domains/portfolio/Pricing/Tabs/Products'
import * as itens from '&erp/domains/inventory/Itens'

import * as utils from '@comigo/utils'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

type ProductProvider = {
  Id: string
  Precos: { Id: string; Valor: string }[]
}

export function ItemLink() {
  const [productProvider, setProductProvider] = useState<ProductProvider>()
  const [itensArray, setItensArray] = useState<
    {
      Id?: string
      Produto?: {
        Nome: string
      }
      Familia?: {
        Nome: string
      }
      Modelo?: {
        Nome: string
      }
    }[]
  >([])
  const {
    createProductItem,
    createProductItemLoading,
    setSlidePanelState,
    productsRefetch,
    slidePanelState,
    getProductProviderByProductId,
    getItemById,
    linkItemSchema
  } = products.useProduct()
  const { itensData } = itens.useList()
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(linkItemSchema)
  })
  const onSubmit = (formData: { Item_Id: { key: string } }) => {
    try {
      createProductItem({
        variables: {
          PrestadoresDeServicos_Produtos_Id: productProvider?.Id,
          Item_Id: formData.Item_Id.key
        }
      }).then(() => {
        productsRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        utils.notification('Item vinculado com sucesso', 'success')
      })
    } catch (error: any) {
      utils.showError(error)
    }
  }

  useEffect(() => {
    getProductProviderByProductId(slidePanelState.data?.Id).then(
      async (data) => {
        setProductProvider(data[0])
        if (data[0].Itens.length > 0) {
          const selectedItem = await getItemById(data[0].Itens[0].Item_Id)
          setValue('Item_Id', {
            key: selectedItem?.Id,
            title: `${selectedItem?.Produto.Nome} - ${selectedItem?.Familia.Nome} - ${selectedItem?.Modelo?.Nome}`
          })
          const itens = data[0].Itens.map(async (item) => {
            const itensInside = await getItemById(item.Item_Id)
            return {
              ...itensInside
            }
          })
            ; (async () => {
              setItensArray(await Promise.all(itens))
            })()
        }
      }
    )
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
          name={'Item_Id'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  itensData
                    ? itensData.map((item) => {
                      return {
                        key: item.Id,
                        title: `${item.Produto?.Nome} - ${item.Familia?.Nome} - ${item.Modelo?.Nome}`
                      }
                    })
                    : []
                }
                value={value}
                onChange={onChange}
                label="Item de vínculo"
                error={errors.Item_Id}
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Confirmar"
        disabled={createProductItemLoading}
        loading={createProductItemLoading}
      />
      <div className="w-full">
        {itensArray.length > 0 ? (
          <>
            <common.Separator />
            <h2 className="mb-2 text-xl">Últimos itens</h2>

            <ol>
              {itensArray.map((item) => (
                <div key={item.Id}>
                  <li className="list-disc list-item">
                    {`${item.Produto?.Nome} - ${item.Familia?.Nome} - ${item.Modelo?.Nome}`}
                  </li>
                </div>
              ))}
            </ol>
          </>
        ) : null}
      </div>
    </form>
  )
}
