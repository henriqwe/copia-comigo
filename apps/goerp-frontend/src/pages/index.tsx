import rotas from '&erp/domains/routes'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import mainMenuItens from '&erp/domains/MainMenuItens'
import companies from '&erp/domains/companies'

export default function Home() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  return (
    <templates.Base
      setTheme={changeTheme}
      imageUrl='/imagens/logoRastreamento.png'
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Estoque', url: rotas.estoque.index },
        {
          title: 'Dashboard',
          url: rotas.estoque.index
        }
      ]}
      mainMenuItens={mainMenuItens} rotas={rotas} companies={companies}
      theme={theme}
    >
    </templates.Base>
  )
}
