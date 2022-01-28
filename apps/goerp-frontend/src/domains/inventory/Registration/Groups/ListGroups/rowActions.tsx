import { GraphQLTypes } from '&erp/graphql/generated/zeus'
import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as utils from '@comigo/utils'

import * as groups from '&erp/domains/inventory/Registration/Groups'

export function RowActions({
  item
}: {
  item: GraphQLTypes['estoque_Grupos']
}) {
  const { groupsRefetch, softDeleteGroup, setSlidePanelState } =
    groups.useGroup()
  const actions = [
    {
      title: 'Editar',
      handler: async () => {
        event?.preventDefault()
        setSlidePanelState({
          open: true,
          type: 'update',
          data: item
        })
      },
      icon: <common.icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteGroup({
          variables: { Id: item.Id }
        })
          .then(() => {
            groupsRefetch()
            utils.notification(item.Nome + ' excluido com sucesso', 'success')
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
