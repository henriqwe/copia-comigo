import { GraphQLTypes } from '&crm/graphql/generated/zeus'


import * as addresses from '&crm/domains/identities/Clients/Tabs/Addresses'

 import * as utils from '@comigo/utils'
 

export default function RowActions({
  item
}: {
  item: GraphQLTypes['contatos_Enderecos']
}) {
  const { softDeleteAddress, addressesRefetch, setSlidePanelState } =
    addresses.useAddress()
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
        await softDeleteAddress({
          variables: {
            Id: item.Id
          }
        })
          .then(() => {
            addressesRefetch()
              utils.notification('Endereço excluido com sucesso', 'success')
          })
          .catch((err) => {
            utils.showError(err)
          })
      },
      icon: <common.icons.DeleteIcon />
    }
  ]

  return <blocks.table.ActionsRow actions={actions} />
}
