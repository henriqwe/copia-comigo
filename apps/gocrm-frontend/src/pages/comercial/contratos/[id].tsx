import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

import * as contracts from '&crm/domains/commercial/Contracts'
import * as partners from '&crm/domains/commercial/Providers'

export default function UpdateProduct() {
  return (
    <contracts.UpdateProvider>
      <partners.ProviderProvider>
        <contracts.versions.ContractVersionsProvider>
          <ThemeProvider>       <Page />     </ThemeProvider>
        </contracts.versions.ContractVersionsProvider>
      </partners.ProviderProvider>
    </contracts.UpdateProvider>
  )
}

function Page() {
  const {theme, changeTheme} = useTheme()
  const { baseContractsRefetch, baseContractsLoading } = contracts.useContract()
  const { contractVersionsRefetch } = contracts.versions.useContractVersions()
  const { providersRefetch } = partners.useProvider()

  const refetch = () => {
    providersRefetch()
    contractVersionsRefetch()
    baseContractsRefetch()
  }

  return (
    <templates.FormAndTabs setTheme={changeTheme}
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      Form={<contracts.Update />}
      title="Contratos"
      reload={{
        action: refetch,
        state: baseContractsLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Contratos',
          url: rotas.comercial.contratos
        }
      ]}
    >
      <contracts.Tabs />
    </templates.FormAndTabs>
  )
}
