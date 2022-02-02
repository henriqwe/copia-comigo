import rotas from '&erp/domains/routes';
import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';
import { GraphQLTypes } from '&erp/graphql/generated/zeus';

export function RowActions({
  item,
}: {
  item: GraphQLTypes['pedidosDeCompra_Pedidos'];
}) {
  const actions = [
    {
      title: 'Dar entrada',
      url: rotas.estoque.movimentacoes.entradas.index + '/' + item.Id,
      icon: <common.icons.MoveIcon />,
    },
  ];
  return (
    <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
  );
}
