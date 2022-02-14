import rotas from '&crm/domains/routes'
import companies from '&crm/domains/companies'
import mainMenuItems from '&crm/domains/MainMenuItems'

import * as proposals from '&crm/domains/Proposals'
import * as vehicles from '&crm/domains/services/Vehicles'
import * as templates from '@comigo/ui-templates'

import { Base as BaseTemplate } from '@comigo/ui-templates'
import { useTheme, ThemeProvider } from '&crm/contexts/ThemeContext'

function CreateProposalPage() {
  return (
    <vehicles.VehicleProvider>
      <proposals.UpdateProvider>
        <ThemeProvider>
          <Page />
        </ThemeProvider>
      </proposals.UpdateProvider>
    </vehicles.VehicleProvider>
  )
}

function Page() {
  const { theme, changeTheme } = useTheme()
  return (
    <templates.Base
      noGrid
      title={`Propostas`}
      imageUrl={`/imagens/logoAssistencia.png`}
      rotas={rotas}
      companies={companies}
      theme={theme}
      setTheme={changeTheme}
      MainMenuItems={mainMenuItems}
    >
      <proposals.ViewProposal />
    </templates.Base>
  )
}

export default CreateProposalPage
