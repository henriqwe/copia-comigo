import * as templates from '@comigo/ui-templates'
import rotas from '&crm/domains/routes'
import MainMenuItems from '&crm/domains/MainMenuItems'
import companies from '&crm/domains/companies'
import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

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
      theme={theme}
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
    >
      <a
        target="_blank"
        href="http://localhost:3001/api/getPageToPrint"
        rel="noreferrer"
      >
        gerar pdf
      </a>
    </templates.Base>
  )
}
