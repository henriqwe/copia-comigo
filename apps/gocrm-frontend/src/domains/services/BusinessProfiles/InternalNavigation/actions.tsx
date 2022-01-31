import rotas from '&crm/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Perfil Comercial',
      url: rotas.atendimento.perfisComerciais.cadastrar
    }
  ]
  return actions
}
