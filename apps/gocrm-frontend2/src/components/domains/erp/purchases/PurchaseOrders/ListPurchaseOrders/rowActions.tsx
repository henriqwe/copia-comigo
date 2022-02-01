import { GraphQLTypes } from '&test/graphql/generated/zeus'

import * as purchaseOrders from '&test/components/domains/erp/purchases/PurchaseOrders'
import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'

import rotas from '&test/components/domains/routes'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['pedidosDeCompra_Pedidos']
}) {
  const { purchaseOrderRefetch, softDeletePurchaseOrder } =
    purchaseOrders.useList()
  const actions = [
    {
      title: 'Editar',
      url: rotas.erp.compras.pedidos.index + '/' + item.Id,
      icon: <icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeletePurchaseOrder({
          variables: { Id: item.Id }
        })
          .then(() => {
            purchaseOrderRefetch()
            notification('Pedido excluido com sucesso', 'success')
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
