import rotas from '&crm/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Pedido de saída',
      url: rotas.pedidosDeSaida.cadastrar
    }
  ]
  return actions
}
