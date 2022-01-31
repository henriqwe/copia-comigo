import * as tickets from '&crm/domains/services/Tickets'
import * as flows from '&crm/domains/services/Registration/Flows'
import * as users from '&crm/domains/identities/Users'
import * as leads from '&crm/domains/services/Leads'
import * as clients from '&crm/domains/identities/Clients'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

export default function Tickets() {
  return (
    <tickets.TicketProvider>
      <flows.FlowProvider>
        <users.UserProvider>
          <leads.LeadProvider>
            <clients.ListProvider>
              <ThemeProvider>
               <Page />
             </ThemeProvider>
            </clients.ListProvider>
          </leads.LeadProvider>
        </users.UserProvider>
      </flows.FlowProvider>
    </tickets.TicketProvider>
  )
}

export function Page() {
  const {theme, changeTheme} = useTheme()
  const { ticketsRefetch, ticketsLoading } = tickets.useTicket()
  const { flowsRefetch } = flows.useFlow()
  const { usersRefetch } = users.useUser()
  const { leadsRefetch } = leads.useLead()
  const { clientsRefetch } = clients.useList()
  const refetch = () => {
    flowsRefetch()
    usersRefetch()
    leadsRefetch()
    ticketsRefetch()
    clientsRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide setTheme={changeTheme}
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<tickets.InternalNavigation />}
      title="Tickets"
      reload={{ action: refetch, state: ticketsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Atendimento', url: rotas.atendimento.index },
        {
          title: 'Tickets',
          url: rotas.atendimento.tickets
        }
      ]}
    >
      <tickets.List />
      <tickets.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
