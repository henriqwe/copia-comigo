import rotas from '&crm/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Grupo de perguntas',
      url: rotas.atendimento.cadastros.perguntas.grupos.cadastrar
    }
  ]
  return actions
}
