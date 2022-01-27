import rotas from '@/domains/routes'

import * as activeVehicles from '@/domains/erp/clients'
import * as clients from '@/domains/erp/identities/Clients'
import * as tickets from '@/domains/erp/services/Tickets'
import * as proposals from '@/domains/erp/commercial/Proposals'
import BaseTemplate from '@/templates/Base'

export default function UpdateProvider() {
  return (
    <activeVehicles.UpdateProvider>
      <tickets.TicketProvider>
        <proposals.CreateProvider>
          <clients.ListProvider>
            <Page />
          </clients.ListProvider>
        </proposals.CreateProvider>
      </tickets.TicketProvider>
    </activeVehicles.UpdateProvider>
  )
}

function Page() {
  const { clientLoading, clientRefetch } = activeVehicles.useUpdate()
  const { clientsRefetch } = clients.useList()

  const refetch = () => {
    clientsRefetch()
    clientRefetch()
  }

  return (
    <BaseTemplate
      title="Visualização de cliente"
      reload={{
        action: refetch,
        state: clientLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Clientes', url: rotas.erp.clientes }
      ]}
    >
      <activeVehicles.ViewClient />
    </BaseTemplate>
  )
}
