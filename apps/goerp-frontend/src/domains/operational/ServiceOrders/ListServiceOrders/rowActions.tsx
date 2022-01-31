import { GraphQLTypes } from '&erp/graphql/generated/zeus'
import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as serviceOrders from '&erp/domains/operational/ServiceOrders'
import * as utils from '@comigo/utils'
import rotas from '&erp/domains/routes'

export function RowActions({
  item
}: {
  item: GraphQLTypes['operacional_OrdemDeServico']
}) {
  const { serviceOrdersRefetch, softDeleteServiceOrder } =
    serviceOrders.useServiceOrder()
  const actions = [
    {
      title: 'Editar',
      url: rotas.operacional.ordensDeServico + '/' + item.Id,
      icon: <common.icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteServiceOrder({
          variables: { Id: item.Id }
        })
          .then(() => {
            serviceOrdersRefetch()
            utils.notification('Ordem de serviço excluida com sucesso', 'success')
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
