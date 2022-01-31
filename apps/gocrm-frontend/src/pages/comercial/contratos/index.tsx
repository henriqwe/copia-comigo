import * as contracts from '&crm/domains/commercial/Contracts'
import * as partners from '&crm/domains/commercial/Providers'
import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'
export default function Contracts() {
  return (
    <contracts.ContractProvider>
      <partners.ProviderProvider>
        <Page />
      </partners.ProviderProvider>
    </contracts.ContractProvider>
  )
}

export function Page() {
  const {theme} = useTheme()
  const { baseContractsRefetch, baseContractsLoading } = contracts.useContract()
  const { providersRefetch } = partners.useProvider()
  const refetch = () => {
    providersRefetch()
    baseContractsRefetch()
  }
  return (
    <templates.InternalNavigationAndSlide
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<contracts.InternalNavigation />}
      title="Contratos"
      reload={{ action: refetch, state: baseContractsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Contratos',
          url: rotas.comercial.contratos
        }
      ]}
    >
      <contracts.List />
      <contracts.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
