import * as groups from '@/domains/erp/inventory/Registration/Groups'

import InternalNavigationAndSlide from '@/templates/InternalNavigationAndSlide'
import rotas from '@/domains/routes'

export default function Groups() {
  return (
    <groups.GroupProvider>
      <Page />
    </groups.GroupProvider>
  )
}

export function Page() {
  const { groupsRefetch, groupsLoading } = groups.useGroup()
  return (
    <InternalNavigationAndSlide
      SubMenu={<groups.InternalNavigation />}
      title="Grupos de estoque"
      reload={{ action: groupsRefetch, state: groupsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Estoque', url: rotas.erp.estoque.index },
        {
          title: 'Grupos',
          url: rotas.erp.estoque.cadastros.grupos
        }
      ]}
    >
      <groups.List />
      <groups.SlidePanel />
    </InternalNavigationAndSlide>
  )
}
