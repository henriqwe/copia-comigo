import * as leads from '&crm/domains/services/Leads'
import * as clients from '&crm/domains/identities/Clients'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'
export default function Leads() {
  return (
    <leads.LeadProvider>
      <clients.ListProvider>
        <Page />
      </clients.ListProvider>
    </leads.LeadProvider>
  )
}

export function Page() {
  const {theme} = useTheme()
  const { leadsRefetch, leadsLoading } = leads.useLead()
  const { clientsRefetch } = clients.useList()
  const refetch = () => {
    clientsRefetch()
    leadsRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
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
