import rotas from '&crm/domains/routes'

export const links = [
  {
    title: 'Kits de insumo',
    url: rotas.producao.kits.kitsDeInsumo.index
  },
  {
    title: 'Tipos de Kits',
    url: rotas.producao.kits.kitsDeInsumo.tipos.index
  }
]
