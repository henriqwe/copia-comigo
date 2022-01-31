import * as clients from '&crm/domains/clients'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'

export default function Providers() {
  return (
    <clients.ClientProvider>
      <Page />
    </clients.ClientProvider>
  )
}

export function Page() {
  const {theme} = useTheme()
  const { clientsRefetch, clientsLoading } = clients.useClient()
  const refetch = () => {
    clientsRefetch()
  }
  return (
    <templates.Base
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
