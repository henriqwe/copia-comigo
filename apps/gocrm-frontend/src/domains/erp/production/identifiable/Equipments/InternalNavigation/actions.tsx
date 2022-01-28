import rotas from '&crm/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Equipamento',
      url: rotas.erp.producao.identificaveis.equipamentos.cadastrar
    }
  ]
  return actions
}
