import rotas from '&crm/domains/routes'


import { GraphQLTypes } from '&crm/graphql/generated/zeus'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['pedidosDeCompra_Pedidos']
}) {
  const actions = [
    {
      title: 'Dar entrada',
      url: rotas.estoque.movimentacoes.entradas.index + '/' + item.Id,
      icon: <common.icons.MoveIcon />
    }
  ]
  return <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
}
