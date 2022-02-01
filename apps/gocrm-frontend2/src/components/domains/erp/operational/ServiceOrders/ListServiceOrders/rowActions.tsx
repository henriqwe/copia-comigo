import { GraphQLTypes } from '&test/graphql/generated/zeus'
import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'
import * as serviceOrders from '&test/components/domains/erp/operational/ServiceOrders'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'
import rotas from '&test/components/domains/routes'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['operacional_OrdemDeServico']
}) {
  const { serviceOrdersRefetch, softDeleteServiceOrder } =
    serviceOrders.useServiceOrder()
  const actions = [
    {
      title: 'Editar',
      url: rotas.erp.operacional.ordensDeServico + '/' + item.Id,
      icon: <icons.EditIcon />
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
            notification('Ordem de serviço excluida com sucesso', 'success')
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
