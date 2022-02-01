import { GraphQLTypes } from '&test/graphql/generated/zeus'

import * as table from '&test/components/blocks/Table/itens'
import * as adresses from '&test/components/domains/erp/identities/Providers/Tabs/Addresses'
import * as icons from '&test/components/common/Icons'
import { notification } from '&test/utils/notification'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['contatos_Enderecos']
}) {
  const { softDeleteAdress, addressesRefetch, setSlidePanelState } =
    adresses.useAdress()
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
        await softDeleteAdress({
          variables: {
            Id: item.Id
          }
        })
          .then(() => {
            addressesRefetch()
            notification('Endereço excluido com sucesso', 'success')
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
