import * as services from '&test/components/domains/erp/commercial/Services'

import rotas from '&test/components/domains/routes'
import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'

export default function Products() {
  return (
    <services.ServiceProvider>
      <Page />
    </services.ServiceProvider>
  )
}

export function Page() {
  const { servicesRefetch, servicesLoading } = services.useService()
  const refetch = () => {
    servicesRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <InternalNavigationAndSlide
      SubMenu={<services.InternalNavigation />}
      title="Serviços"
      reload={{ action: refetch, state: servicesLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Comercial', url: rotas.erp.comercial.index },
        {
          title: 'Serviços',
          url: rotas.erp.comercial.servicos
        }
      ]}
    >
      <services.List />
      <services.SlidePanel />
    </InternalNavigationAndSlide>
  )
}