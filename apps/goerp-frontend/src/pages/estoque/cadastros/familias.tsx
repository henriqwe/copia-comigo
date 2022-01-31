import * as families from '&erp/domains/inventory/Registration/Families'

import rotas from '&erp/domains/routes'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import mainMenuItens from '&erp/domains/MainMenuItens'
import companies from '&erp/domains/companies'

export default function Families() {
  return (
    <families.FamilyProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </families.FamilyProvider>
  )
}

export function Page() {
  const { theme } = useTheme()
  const { familiesRefetch, familiesLoading, parentsFamiliesRefetch } =
    families.useFamily()
  const refetch = () => {
    familiesRefetch()
    parentsFamiliesRefetch()
  }
  //const {usuario} = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
      imageUrl='/imagens/logoRastreamento.png'
      mainMenuItens={mainMenuItens} rotas={rotas} companies={companies}
      theme={theme}
      SubMenu={<families.InternalNavigation />}
      title="Famílias de estoque"
      reload={{ action: refetch, state: familiesLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Estoque', url: rotas.estoque.index },
        {
          title: 'Famílias',
          url: rotas.estoque.cadastros.familias
        }
      ]}
    >
      <families.List />
      <families.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
