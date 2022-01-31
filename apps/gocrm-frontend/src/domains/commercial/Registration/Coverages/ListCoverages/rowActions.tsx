import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as coverages from '&crm/domains/commercial/Registration/Coverages'
 import * as utils from '@comigo/utils'
  

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Coberturas']
}) {
  const { coveragesRefetch, softDeleteCoverage, setSlidePanelState } =
    coverages.useCoverage()
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
        await softDeleteCoverage({
          variables: { Id: item.Id }
        })
          .then(() => {
            coveragesRefetch()
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
