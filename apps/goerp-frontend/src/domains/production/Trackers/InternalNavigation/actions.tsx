import rotas from '&erp/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Rastreadores',
      url: rotas.producao.rastreadores.cadastrar
    }
  ]
  return actions
}
