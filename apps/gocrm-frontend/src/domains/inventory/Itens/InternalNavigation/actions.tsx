import rotas from '&crm/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Cadastrar item',
      url: rotas.estoque.itens.cadastrar
    }
  ]
  return actions
}
