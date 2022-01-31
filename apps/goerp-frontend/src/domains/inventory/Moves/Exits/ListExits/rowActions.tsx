import rotas from '&erp/domains/routes'
import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'
import { GraphQLTypes } from '&erp/graphql/generated/zeus'

export function RowActions({
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
