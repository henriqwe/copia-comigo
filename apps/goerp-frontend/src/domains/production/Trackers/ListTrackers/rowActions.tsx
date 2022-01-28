import { GraphQLTypes } from '&erp/graphql/generated/zeus'
import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as trackers from '&erp/domains/production/Trackers'
import * as utils from '@comigo/utils'

export function RowActions({
  item
}: {
  item: GraphQLTypes['producao_Rastreadores']
}) {
  const { trackersRefetch, softDeleteTracker } = trackers.useList()
  const actions = [
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteTracker({
          variables: {
            Id: item.Id,
            Item_Id: item.Item.Id,
            ItemChip_Id: item.Chip.Item?.Id,
            ItemEquipamento_Id: item.Equipamento.Item.Id
          }
        })
          .then(() => {
            trackersRefetch()
            utils.notification(
              item.CodigoReferencia + ' excluido com sucesso',
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
