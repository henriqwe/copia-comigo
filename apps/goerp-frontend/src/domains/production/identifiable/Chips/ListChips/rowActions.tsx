import { GraphQLTypes } from '&erp/graphql/generated/zeus'
import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as chips from '&erp/domains/production/identifiable/Chips'
import * as utils from '@comigo/utils'

export default function rowActions({
  item
}: {
  item: GraphQLTypes['producao_Chips']
}) {
  const { chipsRefetch, softDeleteChip, setSlidePanelState } = chips.useChips()
  const actions = [
    {
      title: 'Editar',
      handler: async () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, data: item, showModal: false })
      },
      icon: <common.icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteChip({
          variables: { Id: item.Id }
        })
          .then(() => {
            chipsRefetch()
            utils.notification(
              item.NumeroDaLinha + ' excluido com sucesso',
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
