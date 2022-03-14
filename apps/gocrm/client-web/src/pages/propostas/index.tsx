import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

import * as templates from '@comigo/ui-templates'
import * as proposals from '&crm/domains/Proposals'

import * as tickets from '&crm/domains/services/Tickets'
import * as leads from '&crm/domains/services/Leads'
import * as clients from '&crm/domains/clients'

import MainMenuItems from '&crm/domains/MainMenuItems'
import rotas from '&crm/domains/routes'
import companies from '&crm/domains/companies'
import { Card, buttons } from '@comigo/ui-common'
import { useState } from 'react'
import SlidePanel from '&crm/domains/Proposals/components/SlidePanel'

function CreateProposalPage() {
  return (
    <proposals.ListProvider>
      <clients.ClientProvider>
        <leads.LeadProvider>
          <tickets.TicketProvider>
            <ThemeProvider>
              <Page />
            </ThemeProvider>
          </tickets.TicketProvider>
        </leads.LeadProvider>
      </clients.ClientProvider>
    </proposals.ListProvider>
  )
}

function Page() {
  const [slidePanelState, setSlidePanelState] = useState({
    open: false
  })
  const { theme, changeTheme } = useTheme()
  const { proposalsRefetch, proposalsLoading} = proposals.useList()
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      theme={theme}
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={
        <Card>
          <buttons.SecondaryButton
            handler={() => {
              setSlidePanelState({ open: true })
            }}
          />
        </Card>
      }
      title="Propostas"
      reload={{ action: proposalsRefetch, state: proposalsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Propostas',
          url: rotas.comercial.propostas.index
        }
      ]}
    >
      <proposals.ListProposals />
      <SlidePanel
        setSlidePanelState={setSlidePanelState}
        slidePanelState={slidePanelState}
      />
    </templates.InternalNavigationAndSlide>
  )
}

export default CreateProposalPage
