import rotas from '&erp/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Produto',
      url: rotas.compras.produtos.cadastrar
    }
  ]
  return actions
}
