import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as flowStages from '&crm/domains/services/Registration/Flows/Stage'
 import * as utils from '@comigo/utils'
 

export default function RowActions({
  item
}: {
  item: GraphQLTypes['atendimentos_EtapasDosFluxos']
}) {
  const { stagesRefetch, softDeleteFlowStages, setSlidePanelState } =
    flowStages.useStage()
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
        await softDeleteFlowStages({
          variables: { Id: item.Id }
        })
          .then(() => {
            stagesRefetch()
              utils.notification(item.Fluxo.Nome + ' excluido com sucesso', 'success')
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
