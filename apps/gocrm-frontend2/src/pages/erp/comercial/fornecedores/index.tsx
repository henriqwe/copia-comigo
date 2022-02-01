import * as providers from '&test/components/domains/erp/commercial/Providers'

import rotas from '&test/components/domains/routes'
import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'

export default function Providers() {
  return (
    <providers.ProviderProvider>
      <Page />
    </providers.ProviderProvider>
  )
}

export function Page() {
  const { providersRefetch, providersLoading } = providers.useProvider()
  const refetch = () => {
    providersRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <InternalNavigationAndSlide
      SubMenu={<providers.InternalNavigation />}
      title="Parceiros"
      reload={{ action: refetch, state: providersLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Comercial', url: rotas.erp.comercial.index },
        {
          title: 'Parceiros',
          url: rotas.erp.comercial.fornecedores
        }
      ]}
    >
      <providers.List />
      <providers.SlidePanel />
    </InternalNavigationAndSlide>
  )
}