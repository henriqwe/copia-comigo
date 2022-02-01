import rotas from '&test/components/domains/routes'

import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'
import * as providers from '&test/components/domains/erp/identities/Providers'

export default function Providers() {
  return (
    <providers.ListProvider>
      <Page />
    </providers.ListProvider>
  )
}

function Page() {
  const { providersRefetch, providersLoading } = providers.useList()
  return (
    <InternalNavigationAndSlide
      SubMenu={<providers.InternalNavigation />}
      title="Listagem de Fornecedores"
      reload={{
        action: providersRefetch,
        state: providersLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Identidades', url: rotas.erp.identidades.index },
        {
          title: 'Fornecedores',
          url: rotas.erp.identidades.fornecedores.index
        }
      ]}
    >
      <providers.List />
    </InternalNavigationAndSlide>
  )
}
