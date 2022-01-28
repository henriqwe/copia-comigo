import rotas from '&crm/domains/routes'

import InternalNavigationAndSlide from '@/templates/InternalNavigationAndSlide'
import * as clients from '&crm/domains/erp/identities/Clients'

export default function Clients() {
  return (
    <clients.ListProvider>
      <Page />
    </clients.ListProvider>
  )
}

function Page() {
  const { clientsRefetch, clientsLoading } = clients.useList()
  return (
    <InternalNavigationAndSlide
      SubMenu={<clients.InternalNavigation />}
      title="Clientes cadastrados"
      reload={{
        action: clientsRefetch,
        state: clientsLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        {
          title: 'Identidades',
          url: ''
        },
        {
          title: 'Clientes',
          url: rotas.erp.identidades.clientes.index
        }
      ]}
    >
      <clients.List />
    </InternalNavigationAndSlide>
  )
}
