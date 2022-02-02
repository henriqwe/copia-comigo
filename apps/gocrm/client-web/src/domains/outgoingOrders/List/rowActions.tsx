import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as outgoingOrders from '&crm/domains/outgoingOrders';

import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';

import rotas from '&crm/domains/routes';
import * as utils from '@comigo/utils';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['pedidosDeSaida_Pedidos'];
}) {
  const { outGoingOrdersRefetch, softDeleteOutgoingOrder } =
    outgoingOrders.useList();
  const actions = [
    {
      title: 'Editar',
      url: rotas.pedidosDeSaida.index + '/' + item.Id,
      icon: <common.icons.EditIcon />,
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();
        await softDeleteOutgoingOrder({
          variables: { Id: item.Id },
        })
          .then(() => {
            outGoingOrdersRefetch();
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
