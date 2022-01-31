import * as clients from '&crm/domains/clients'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

export default function Providers() {
  return (
    <clients.ClientProvider>
      <ThemeProvider>       <Page />     </ThemeProvider>
    </clients.ClientProvider>
  )
}

export function Page() {
  const {theme, changeTheme} = useTheme()
  const { clientsRefetch, clientsLoading } = clients.useClient()
  const refetch = () => {
    clientsRefetch()
  }
  return (
    <templates.Base setTheme={changeTheme}
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      title="Clientes"
      reload={{ action: refetch, state: clientsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Clientes', url: rotas.clientes }
      ]}
    >
      <clients.List />
    </templates.Base>
  )
}
