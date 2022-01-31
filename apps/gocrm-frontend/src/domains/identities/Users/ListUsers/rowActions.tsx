import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'
import * as users from '&crm/domains/identities/Users'
 import * as utils from '@comigo/utils'
 

export default function RowActions({
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
              utils.notification(
              item.Colaborador
                ? item.Colaborador.Pessoa.Nome
                : item.Cliente.Pessoa.Nome + ' excluido com sucesso',
              'success'
            )
          })
          .catch((err) => {
            utils.showError(err)
          })
      },
      icon: <common.icons.DeleteIcon />
    }
  ]
  return <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
}
