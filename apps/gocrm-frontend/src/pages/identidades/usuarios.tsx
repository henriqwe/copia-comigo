import * as users from '&crm/domains/identities/Users'
import * as clients from '&crm/domains/identities/Clients'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'
export default function Users() {
  return (
    <users.UserProvider>
      <clients.ListProvider>
        <ThemeProvider>       <Page />     </ThemeProvider>
      </clients.ListProvider>
    </users.UserProvider>
  )
}

export function Page() {
  const {theme, changeTheme} = useTheme()
  const { usersRefetch, usersLoading, collaboratorsRefetch } = users.useUser()
  const { clientsRefetch } = clients.useList()
  const refetch = () => {
    usersRefetch()
    collaboratorsRefetch()
    clientsRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide setTheme={changeTheme}
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<users.InternalNavigation />}
      title="Usuários"
      reload={{ action: refetch, state: usersLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Identidades', url: rotas.identidades.index },
        { title: 'Usuários', url: rotas.identidades.usuarios }
      ]}
    >
      <users.List />
      <users.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
