import rotas from '&erp/domains/routes'

import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

import * as providers from '&erp/domains/portfolio/Pricing'
import * as itens from '&erp/domains/inventory/Itens'

export default function UpdateProvider() {
  return (
    <providers.UpdateProvider>
      <providers.Products.ProductProvider>
        <providers.Services.ServiceProvider>
          <itens.ListProvider>
            <ThemeProvider>
              <Page />
            </ThemeProvider>
          </itens.ListProvider>
        </providers.Services.ServiceProvider>
      </providers.Products.ProductProvider>
    </providers.UpdateProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { providerLoading, providerRefetch } = providers.useUpdate()
  const { productsRefetch } = providers.Products.useProduct()
  const { servicesRefetch } = providers.Services.useService()
  const { itensRefetch } = itens.useList()

  const refetch = () => {
    itensRefetch()
    productsRefetch()
    servicesRefetch()
    providerRefetch()
  }

  return (
    <templates.FormAndTabs
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
      Form={<providers.Update />}
      title="Parceiro"
      reload={{
        action: refetch,
        state: providerLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Portfolio', url: rotas.portfolio.index },
        {
          title: 'Precificação',
          url: rotas.portfolio.precificacao
        }
      ]}
    >
      <providers.Tabs />
    </templates.FormAndTabs>
  )
}
