import rotas from '&crm/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Pedido',
      url: rotas.erp.compras.pedidos.cadastrar
    }
  ]
  return actions
}