import rotas from '&erp/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Rastreadores',
      url: rotas.erp.producao.rastreadores.cadastrar
    }
  ]
  return actions
}
