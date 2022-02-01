import rotas from '&test/components/domains/routes'

import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'
import * as clients from '&test/components/domains/erp/identities/Clients'

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
