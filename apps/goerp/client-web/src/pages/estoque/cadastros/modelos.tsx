import * as models from '&erp/domains/inventory/Registration/Models'
import * as manufacturers from '&erp/domains/inventory/Registration/Manufacturers'
import * as products from '&erp/domains/purchases/Products'

import rotas from '&erp/domains/routes'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function Models() {
  return (
    <models.ModelProvider>
      <manufacturers.ManufacturerProvider>
        <products.ListProvider>
          <ThemeProvider>
            <Page />
          </ThemeProvider>
        </products.ListProvider>
      </manufacturers.ManufacturerProvider>
    </models.ModelProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { modelsRefetch, modelsLoading } = models.useModel()
  const { manufacturersRefetch } = manufacturers.useManufacturer()
  const { productsRefetch } = products.useList()

  const refetch = () => {
    manufacturersRefetch()
    productsRefetch()
    modelsRefetch()
  }
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
      SubMenu={<models.InternalNavigation />}
      title="Modelos de estoque"
      reload={{ action: refetch, state: modelsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Estoque', url: rotas.estoque.index },
        {
          title: 'Modelos',
          url: rotas.estoque.cadastros.fabricantes
        }
      ]}
    >
      <models.List />
      <models.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
