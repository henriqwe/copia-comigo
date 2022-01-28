import * as moves from '@/domains/erp/inventory/Moves'

import rotas from 'domains/routes'

import InternalNavigationAndSlide from '@/templates/InternalNavigationAndSlide'

export default function Moves() {
  return (
    <moves.ListProvider>
      <Page />
    </moves.ListProvider>
  )
}

export function Page() {
  const { MovesRefetch, MovesLoading } = moves.useList()
  return (
    <InternalNavigationAndSlide
      SubMenu={<moves.InternalNavigation />}
      title="Listagem de Movimentações"
      reload={{
        action: MovesRefetch,
        state: MovesLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Estoque', url: rotas.erp.estoque.index },
        {
          title: 'Movimentações',
          url: rotas.erp.estoque.movimentacoes.index
        }
      ]}
    >
      <moves.List />
    </InternalNavigationAndSlide>
  )
}
