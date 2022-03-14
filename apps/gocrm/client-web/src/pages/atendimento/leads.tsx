import * as leads from '&crm/domains/services/Leads'
import * as clients from '&crm/domains/clients'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import MainMenuItems from '&crm/domains/MainMenuItems'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'
export default function Leads() {
  return (
    <leads.LeadProvider>
      <clients.ClientProvider>
        <ThemeProvider>
          <Page />
        </ThemeProvider>
      </clients.ClientProvider>
    </leads.LeadProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { leadsRefetch, leadsLoading } = leads.useLead()
  const { clientsRefetch } = clients.useClient()
  const refetch = () => {
    clientsRefetch()
    leadsRefetch()
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
      SubMenu={<leads.InternalNavigation />}
      title="Leads"
      reload={{ action: refetch, state: leadsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Atendimento', url: rotas.atendimento.index },
        {
          title: 'Leads',
          url: rotas.atendimento.leads
        }
      ]}
    >
      <leads.List />
      <leads.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
