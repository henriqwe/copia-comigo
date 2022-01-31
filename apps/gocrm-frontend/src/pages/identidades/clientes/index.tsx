import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'
import * as clients from '&crm/domains/identities/Clients'

export default function Clients() {
  return (
    <clients.ListProvider>
      <Page />
    </clients.ListProvider>
  )
}

function Page() {
  const {theme} = useTheme()
  const { clientsRefetch, clientsLoading } = clients.useList()
  return (
    <templates.InternalNavigationAndSlide
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
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
