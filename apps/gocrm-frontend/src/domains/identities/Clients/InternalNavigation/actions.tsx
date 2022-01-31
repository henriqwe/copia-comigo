import rotas from '&crm/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Cliente',
      url: rotas.identidades.clientes.cadastrar
    }
  ]
  return actions
}
