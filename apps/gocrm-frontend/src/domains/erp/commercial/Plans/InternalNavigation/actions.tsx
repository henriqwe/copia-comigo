import rotas from '&crm/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Plano',
      url: rotas.erp.comercial.planos.cadastrar
    }
  ]
  return actions
}
