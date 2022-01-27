import { GraphQLTypes } from 'graphql/generated/zeus'
import * as table from '@/blocks/Table/itens'
import * as form from '@/common/Form'
import * as icons from '@/common/Icons'
import * as products from '@/domains/erp/portfolio/Pricing/Tabs/Products'
import * as providers from '@/domains/erp/portfolio/Pricing'
import { useEffect, useState } from 'react'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Produtos']
}) {
  const { configData } = providers.useUpdate()
  const provider = item.Fornecedores.filter((provider) => {
    return (
      provider.Produto_Id === item.Id &&
      configData?.Valor[0] === provider.Fornecedor_Id
    )
  })
  const [active, setActive] = useState(false)
  const {
    activeProduct,
    removeProduct,
    productsRefetch,
    setSlidePanelState,
    reactivateProduct
  } = products.useProduct()
  const actions = [
    {
      title: 'Ativar',
      handler: async () => {
        event?.preventDefault()
      },
      icon: (
        <form.Switch
          onChange={async () => {
            if (active) {
              await removeProduct({
                variables: {
                  Id: item.Fornecedores[0].Id
                }
              }).then(() => {
                setActive(false)
                productsRefetch()
              })
              return
            }

            if (provider.length > 0) {
              if (provider[0].deleted_at === null) {
                await activeProduct({
                  variables: {
                    Produto_Id: item.Id
                  }
                }).then(() => {
                  setActive(true)
                  productsRefetch()
                })
                return
              }

              await reactivateProduct({
                variables: {
                  Id: item.Fornecedores[0].Id
                }
              }).then(() => {
                setActive(true)
                productsRefetch()
              })
              return
            }

            await activeProduct({
              variables: {
                Produto_Id: item.Id
              }
            }).then(() => {
              setActive(true)
              productsRefetch()
            })
          }}
          value={active}
          size="small"
        />
      )
    }
  ]

  if (active) {
    actions.push(
      {
        title: 'Precificar',
        handler: async () => {
          event?.preventDefault()
          setSlidePanelState({
            open: true,
            data: item,
            type: 'pricing'
          })
        },
        icon: <icons.DollarIcon />
      },
      {
        title: 'Vincular item',
        handler: async () => {
          event?.preventDefault()
          setSlidePanelState({
            open: true,
            data: item,
            type: 'item'
          })
        },
        icon: <icons.BurguerIcon />
      }
    )
  }

  useEffect(() => {
    setActive(provider.length > 0 && provider[0].deleted_at === null)
  }, [provider])

  return <table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
}
