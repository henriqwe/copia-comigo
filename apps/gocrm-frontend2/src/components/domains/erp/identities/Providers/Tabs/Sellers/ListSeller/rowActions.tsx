import { GraphQLTypes } from '&test/graphql/generated/zeus'

import * as table from '&test/components/blocks/Table/itens'
import * as sellers from '&test/components/domains/erp/identities/Providers/Tabs/Sellers'
import * as icons from '&test/components/common/Icons'
import { notification } from '&test/utils/notification'

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
      icon: <icons.EditIcon />
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
            notification(item.Nome + ' excluido com sucesso', 'success')
          })
          .catch((err) => {
            notification(err.message, 'error')
          })
      },
      icon: <icons.DeleteIcon />
    }
  ]

  return <table.ActionsRow actions={actions} />
}
