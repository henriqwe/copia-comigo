import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import MainMenuItems from '&crm/domains/MainMenuItems'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

export default function Home() {
  const { theme, changeTheme } = useTheme()
  return (
    <templates.Base
      setTheme={changeTheme}
      theme={theme}
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Estoque', url: rotas.identidades.index },
        {
          title: 'Dashboard',
          url: rotas.identidades.index
        }
      ]}
    >
      <div>Dashboard</div>
    </templates.Base>
  )
}
