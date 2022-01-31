import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'

import * as leads from '&crm/domains/services/Leads'
 import * as utils from '@comigo/utils'
 

export default function RowActions({
  item
}: {
  item: GraphQLTypes['clientes_Leads']
}) {
  const { leadsRefetch, softDeleteLead, setSlidePanelState } = leads.useLead()
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
        await softDeleteLead({
          variables: { Id: item.Id }
        })
          .then(() => {
            leadsRefetch()
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
