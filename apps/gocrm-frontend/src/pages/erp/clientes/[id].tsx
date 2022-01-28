import rotas from '&crm/domains/routes'

import * as activeVehicles from '&crm/domains/erp/clients'
import * as clients from '&crm/domains/erp/identities/Clients'
import * as tickets from '&crm/domains/erp/services/Tickets'
import * as proposals from '&crm/domains/erp/commercial/Proposals'
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
