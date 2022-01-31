import rotas from '&erp/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Equipamento',
      url: rotas.producao.identificaveis.equipamentos.cadastrar
    }
  ]
  return actions
}
