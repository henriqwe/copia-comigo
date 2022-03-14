import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as utils from '@comigo/utils'
import * as alerts from '&crm/domains/commercial/Services/Tabs/Alerts'

export function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Servicos_RegrasETermosDeUso']
}) {
  const { softDeleteAlert, alertsRefetch } = alerts.useAlerts()
  const actions = [
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteAlert({
          variables: { Id: item.Id }
        })
          .then(() => {
            alertsRefetch()
            utils.notification('Regra e termo de uso excluido com sucesso', 'success')
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
