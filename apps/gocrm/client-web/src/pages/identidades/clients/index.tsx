import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import MainMenuItems from '&crm/domains/MainMenuItems'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'
import * as clients from '&crm/domains/identities/Clients'

export default function Clients() {
  return (
    <clients.ListProvider>
      <ThemeProvider>
        {' '}
        <Page />{' '}
      </ThemeProvider>
    </clients.ListProvider>
  )
}

function Page() {
  const { theme, changeTheme } = useTheme()
  const { clientsRefetch, clientsLoading } = clients.useList()
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      theme={theme}
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<clients.InternalNavigation />}
      title="Clientes cadastrados"
      reload={{
        action: clientsRefetch,
        state: clientsLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Identidades',
          url: ''
        },
        {
          title: 'Clientes',
          url: rotas.identidades.clientes.index
        }
      ]}
    >
      <clients.List />
    </templates.InternalNavigationAndSlide>
  )
}
