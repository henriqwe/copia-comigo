import rotas from '&crm/domains/routes'


import { GraphQLTypes } from '&crm/graphql/generated/zeus'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['pedidosDeSaida_Pedidos']
}) {
  const actions = [
    {
      title: 'Registrar saida',
      url: rotas.estoque.movimentacoes.saidas.index + '/' + item.Id,
      icon: <common.icons.MoveIcon />
    }
  ]
  return <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
}
