import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as users from '&crm/domains/clients/components/Tabs/Users'
import * as utils from '@comigo/utils'
import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'

export function RowActions({
  item
}: {
  item: GraphQLTypes['autenticacao_Usuarios']
}) {
  const { usersRefetch, softDeleteUser, setSlidePanelState } = users.useUser()
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
        await softDeleteUser({
          variables: { Id: item.Id }
        })
          .then(() => {
            usersRefetch()
            utils.notification('Usuário excluido com sucesso', 'success')
          })
          .catch((err) => {
            utils.showError(err)
          })
      },
      icon: <common.icons.DeleteIcon />
    }
  ]
  return (
    <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
  )
}
