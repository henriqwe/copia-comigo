import { GraphQLTypes } from '&test/graphql/generated/zeus'
import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'
import * as flowStages from '&test/components/domains/erp/services/Registration/Flows/Stage'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

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
      icon: <icons.EditIcon />
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
            notification(item.Fluxo.Nome + ' excluido com sucesso', 'success')
          })
          .catch((err) => {
            showError(err)
          })
      },
      icon: <icons.DeleteIcon />
    }
  ]
  return <table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
}
