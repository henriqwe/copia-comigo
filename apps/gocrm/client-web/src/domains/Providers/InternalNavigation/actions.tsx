import rotas from '&crm/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Fornecedor',
      url: rotas.fornecedores.cadastrar
    }
  ]
  return actions
}
