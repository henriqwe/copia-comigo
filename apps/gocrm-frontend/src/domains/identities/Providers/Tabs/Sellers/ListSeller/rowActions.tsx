import { GraphQLTypes } from '&crm/graphql/generated/zeus'


import * as sellers from '&crm/domains/identities/Providers/Tabs/Sellers'

 import * as utils from '@comigo/utils'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['identidades_Vendedores']
}) {
  const { softDeleteSeller, sellersRefetch, setSlidePanelState } =
    sellers.useSeller()
  const actions = [
    {
      title: 'Editar',
      handler: async () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'update', data: item })
      },
      icon: <common.icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteSeller({
          variables: {
            Id: item.Id
          }
        })
          .then(() => {
            sellersRefetch()
              utils.notification(item.Nome + ' excluido com sucesso', 'success')
          })
          .catch((err) => {
              utils.notification(err.message, 'error')
          })
      },
      icon: <common.icons.DeleteIcon />
    }
  ]

  return <blocks.table.ActionsRow actions={actions} />
}
