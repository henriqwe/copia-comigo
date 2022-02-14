import * as identifiers from '&erp/domains/production/identifiable/Identifiers'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'

import rotas from '&erp/domains/routes'
import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function Identifiers() {
  return (
    <identifiers.IdentifierProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </identifiers.IdentifierProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { identifiersRefetch, identifiersLoading } = identifiers.useIdentifier()
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
      SubMenu={<identifiers.InternalNavigation />}
      title="Identificadores de estoque"
      reload={{
        action: identifiersRefetch,
        state: identifiersLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Produção',
          url: rotas.producao.identificaveis.chips.index
        },
        {
          title: 'Identificadores',
          url: rotas.producao.identificaveis.identificadores.index
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <identifiers.List />
      <identifiers.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
