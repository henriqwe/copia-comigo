import * as products from '@/domains/erp/commercial/Products'
import * as services from '@/domains/erp/commercial/Services'

import rotas from '@/domains/routes'
import InternalNavigationAndSlide from '@/templates/InternalNavigationAndSlide'

export default function Products() {
  return (
    <products.ProductProvider>
      <services.ServiceProvider>
        <Page />
      </services.ServiceProvider>
    </products.ProductProvider>
  )
}

export function Page() {
  const { productsRefetch, productsLoading } = products.useProduct()
  const { servicesRefetch } = services.useService()
  const refetch = () => {
    servicesRefetch()
    productsRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <InternalNavigationAndSlide
      SubMenu={<products.InternalNavigation />}
      title="Produtos"
      reload={{ action: refetch, state: productsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Comercial', url: rotas.erp.comercial.index },
        {
          title: 'Produtos',
          url: rotas.erp.comercial.produtos
        }
      ]}
    >
      <products.List />
      <products.SlidePanel />
    </InternalNavigationAndSlide>
  )
}
