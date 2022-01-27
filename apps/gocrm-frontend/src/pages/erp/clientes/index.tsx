import * as clients from '@/domains/erp/clients'

import rotas from '@/domains/routes'
import BaseTemplate from '@/templates/Base'

export default function Providers() {
  return (
    <clients.ClientProvider>
      <Page />
    </clients.ClientProvider>
  )
}

export function Page() {
  const { clientsRefetch, clientsLoading } = clients.useClient()
  const refetch = () => {
    clientsRefetch()
  }
  return (
    <BaseTemplate
      title="Clientes"
      reload={{ action: refetch, state: clientsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Clientes', url: rotas.erp.clientes }
      ]}
    >
      <clients.List />
    </BaseTemplate>
  )
}
