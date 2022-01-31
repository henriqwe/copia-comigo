import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as action from '&crm/domains/services/Registration/Actions'
 import * as utils from '@comigo/utils'
 

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Acoes']
}) {
  const { actionsRefetch, softDeleteAction, setSlidePanelState } =
    action.useAction()
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
        await softDeleteAction({
          variables: { Id: item.Id }
        })
          .then(() => {
            actionsRefetch()
              utils.notification('Ação excluida com sucesso', 'success')
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
