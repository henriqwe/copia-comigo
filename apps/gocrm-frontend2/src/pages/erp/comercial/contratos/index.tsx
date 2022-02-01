import * as contracts from '&test/components/domains/erp/commercial/Contracts'
import * as partners from '&test/components/domains/erp/commercial/Providers'

import rotas from '&test/components/domains/routes'
import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'

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
  const { baseContractsRefetch, baseContractsLoading } = contracts.useContract()
  const { providersRefetch } = partners.useProvider()
  const refetch = () => {
    providersRefetch()
    baseContractsRefetch()
  }
  return (
    <InternalNavigationAndSlide
      SubMenu={<contracts.InternalNavigation />}
      title="Contratos"
      reload={{ action: refetch, state: baseContractsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Comercial', url: rotas.erp.comercial.index },
        {
          title: 'Contratos',
          url: rotas.erp.comercial.contratos
        }
      ]}
    >
      <contracts.List />
      <contracts.SlidePanel />
    </InternalNavigationAndSlide>
  )
}
