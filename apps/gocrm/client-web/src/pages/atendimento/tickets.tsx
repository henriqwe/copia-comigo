import * as tickets from '&crm/domains/services/Tickets'
import * as flows from '&crm/domains/services/Registration/Flows'
import * as leads from '&crm/domains/services/Leads'
import * as clients from '&crm/domains/clients'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import MainMenuItems from '&crm/domains/MainMenuItems'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

export default function Tickets() {
  return (
    <tickets.TicketProvider>
      <flows.FlowProvider>
          <leads.LeadProvider>
            <clients.ClientProvider>
              <ThemeProvider>
                <Page />
              </ThemeProvider>
            </clients.ClientProvider>
          </leads.LeadProvider>
      </flows.FlowProvider>
    </tickets.TicketProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { ticketsRefetch, ticketsLoading } = tickets.useTicket()
  const { flowsRefetch } = flows.useFlow()
  const { leadsRefetch } = leads.useLead()
  const { clientsRefetch } = clients.useClient()
  const refetch = () => {
    flowsRefetch()
    leadsRefetch()
    ticketsRefetch()
    clientsRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      theme={theme}
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
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
