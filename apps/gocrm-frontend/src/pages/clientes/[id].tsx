
import * as activeVehicles from '&crm/domains/clients'
import * as clients from '&crm/domains/identities/Clients'
import * as tickets from '&crm/domains/services/Tickets'
import * as proposals from '&crm/domains/commercial/Proposals'
import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

export default function UpdateProvider() {
  return (
    <activeVehicles.UpdateProvider>
      <tickets.TicketProvider>
        <proposals.CreateProvider>
          <clients.ListProvider>
            <ThemeProvider>       <Page />     </ThemeProvider>
          </clients.ListProvider>
        </proposals.CreateProvider>
      </tickets.TicketProvider>
    </activeVehicles.UpdateProvider>
  )
}

function Page() {
  const {theme, changeTheme} = useTheme()
  const { clientLoading, clientRefetch } = activeVehicles.useUpdate()
  const { clientsRefetch } = clients.useList()

  const refetch = () => {
    clientsRefetch()
    clientRefetch()
  }

  return (
    <templates.Base setTheme={changeTheme}
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      title="Visualização de cliente"
      reload={{
        action: refetch,
        state: clientLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Clientes', url: rotas.clientes }
      ]}
    >
      <activeVehicles.ViewClient />
    </templates.Base>
  )
}
