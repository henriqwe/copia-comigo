import rotas from '&crm/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Identificador',
      url: rotas.erp.producao.identificaveis.identificadores.cadastrar
    }
  ]
  return actions
}
