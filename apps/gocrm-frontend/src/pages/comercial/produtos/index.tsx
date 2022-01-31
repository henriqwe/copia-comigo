import * as products from '&crm/domains/commercial/Products'
import * as services from '&crm/domains/commercial/Services'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'

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
  const {theme} = useTheme()
  const { productsRefetch, productsLoading } = products.useProduct()
  const { servicesRefetch } = services.useService()
  const refetch = () => {
    servicesRefetch()
    productsRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<products.InternalNavigation />}
      title="Produtos"
      reload={{ action: refetch, state: productsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Produtos',
          url: rotas.comercial.produtos
        }
      ]}
    >
      <products.List />
      <products.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
