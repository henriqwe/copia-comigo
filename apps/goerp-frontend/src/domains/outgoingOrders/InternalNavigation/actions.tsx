import rotas from '&erp/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Pedido de saída',
      url: rotas.erp.pedidosDeSaida.cadastrar
    }
  ]
  return actions
}
