import rotas from '&erp/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Identificador',
      url: rotas.erp.producao.identificaveis.identificadores.cadastrar
    }
  ]
  return actions
}
