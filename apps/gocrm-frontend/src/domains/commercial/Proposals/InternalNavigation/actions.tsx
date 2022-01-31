import rotas from '&crm/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Proposta',
      url: rotas.comercial.propostas.cadastrar
    }
  ]
  return actions
}
