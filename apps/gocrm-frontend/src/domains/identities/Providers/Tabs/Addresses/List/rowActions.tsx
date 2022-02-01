import { GraphQLTypes } from '&crm/graphql/generated/zeus'


import * as adresses from '&crm/domains/identities/Providers/Tabs/Addresses'

 import * as utils from '@comigo/utils'
 import * as common from '@comigo/ui-common'
 import * as blocks from '@comigo/ui-blocks'
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
      icon: <common.icons.EditIcon />
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
              utils.notification('Endereço excluido com sucesso', 'success')
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
