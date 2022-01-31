import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'

export default function Home() {
  const {theme} = useTheme()
  return (
    <templates.Base
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
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
