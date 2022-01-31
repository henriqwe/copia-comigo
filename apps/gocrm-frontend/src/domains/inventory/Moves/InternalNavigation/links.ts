import rotas from '&crm/domains/routes'

export const links = [
  {
    title: 'Movimentações',
    url: rotas.estoque.movimentacoes.index
  },
  {
    title: 'Entradas pendentes',
    url: rotas.estoque.movimentacoes.entradas.index
  },
  {
    title: 'Saídas pendentes',
    url: rotas.estoque.movimentacoes.saidas.index
  }
]
