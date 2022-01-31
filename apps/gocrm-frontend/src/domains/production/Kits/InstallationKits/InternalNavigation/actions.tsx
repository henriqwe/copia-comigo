import rotas from '&crm/domains/routes'

export function Actions() {
  const actions = [
    {
      title: 'Kit de instalação',
      url: rotas.producao.kits.kitsDeInstalacao.cadastrar
    }
  ]
  return actions
}
