import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'

import * as providers from '&crm/domains/commercial/Providers'

export default function UpdateProvider() {
  return (
    <providers.UpdateProvider>
      <providers.Products.ProductProvider>
        <providers.Services.ServiceProvider>
          <Page />
        </providers.Services.ServiceProvider>
      </providers.Products.ProductProvider>
    </providers.UpdateProvider>
  )
}

function Page() {
  const {theme} = useTheme()
  const { providerLoading, providerRefetch } = providers.useUpdate()
  const { productsRefetch } = providers.Products.useProduct()
  const { servicesRefetch } = providers.Services.useService()

  const refetch = () => {
    providerRefetch()
    productsRefetch()
    servicesRefetch()
  }

  return (
    <templates.FormAndTabs
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      Form={<providers.Update />}
      title="Parceiro"
      reload={{
        action: refetch,
        state: providerLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Parceiros',
          url: rotas.comercial.fornecedores
        }
      ]}
    >
      <providers.Tabs />
    </templates.FormAndTabs>
  )
}
