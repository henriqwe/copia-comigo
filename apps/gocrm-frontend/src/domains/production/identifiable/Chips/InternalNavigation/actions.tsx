import rotas from '&crm/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Chips',
      url: rotas.producao.identificaveis.chips.cadastrar
    }
  ]
  return actions
}
