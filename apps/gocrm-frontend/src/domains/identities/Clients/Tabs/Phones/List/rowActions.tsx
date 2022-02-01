import { GraphQLTypes } from '&crm/graphql/generated/zeus'

 import * as utils from '@comigo/utils'
 
import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'




import * as phones from '&crm/domains/identities/Clients/Tabs/Phones'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['contatos_Telefones']
}) {
  const { softDeletePhone, phonesRefetch, setSlidePanelState } =
    phones.usePhone()
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
        await softDeletePhone({
          variables: {
            Id: item.Id
          }
        })
          .then(() => {
            phonesRefetch()
              utils.notification('Telefone excluido com sucesso', 'success')
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
