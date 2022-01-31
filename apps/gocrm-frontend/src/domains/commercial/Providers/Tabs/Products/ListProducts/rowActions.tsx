import { GraphQLTypes } from '&crm/graphql/generated/zeus'

 

import * as products from '&crm/domains/commercial/Providers/Tabs/Products'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Produtos']
}) {
  const router = useRouter()
  const provider = item.Fornecedores.filter(
    (provider) =>
      provider.Produto_Id === item.Id &&
      router.query.id === provider.Fornecedor_Id
  )
  const [active, setActive] = useState(
    provider.length > 0 && provider[0].deleted_at === null
  )
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
        <common.form.Switch
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
    actions.push({
      title: 'Precificar',
      handler: async () => {
        event?.preventDefault()
        setSlidePanelState({
          open: true,
          data: item
        })
      },
      icon: <common.icons.DollarIcon />
    })
  }

  return <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
}
