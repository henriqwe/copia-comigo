import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as purchaseOrders from '&crm/domains/purchases/PurchaseOrders';

import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';
import rotas from '&crm/domains/routes';
import * as utils from '@comigo/utils';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['pedidosDeCompra_Pedidos'];
}) {
  const { purchaseOrderRefetch, softDeletePurchaseOrder } =
    purchaseOrders.useList();
  const actions = [
    {
      title: 'Editar',
      url: rotas.compras.pedidos.index + '/' + item.Id,
      icon: <common.icons.EditIcon />,
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();
        await softDeletePurchaseOrder({
          variables: { Id: item.Id },
        })
          .then(() => {
            purchaseOrderRefetch();
            utils.notification('Pedido excluido com sucesso', 'success');
          })
          .catch((err) => {
            utils.showError(err);
          });
      },
      icon: <common.icons.DeleteIcon />,
    },
  ];
  return (
    <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
  );
}
