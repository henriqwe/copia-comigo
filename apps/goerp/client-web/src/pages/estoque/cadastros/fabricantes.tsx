import * as manufacturers from '&erp/domains/inventory/Registration/Manufacturers'

import rotas from '&erp/domains/routes'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function Manufacturers() {
  return (
    <manufacturers.ManufacturerProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </manufacturers.ManufacturerProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { manufacturersRefetch, manufacturersLoading } =
    manufacturers.useManufacturer()
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
      SubMenu={<manufacturers.InternalNavigation />}
      title="Fabricantes de estoque"
      reload={{ action: manufacturersRefetch, state: manufacturersLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Estoque', url: rotas.estoque.index },
        {
          title: 'Fabricantes',
          url: rotas.estoque.cadastros.fabricantes
        }
      ]}
    >
      <manufacturers.List />
      <manufacturers.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
