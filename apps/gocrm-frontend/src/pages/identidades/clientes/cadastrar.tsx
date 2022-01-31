import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'

import * as clients from '&crm/domains/identities/Clients'

export default function CreateClient() {
  return (
    <clients.CreateProvider>
      <Page />
    </clients.CreateProvider>
  )
}

function Page() {
  const {theme} = useTheme()
  return (
    <templates.Base
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      title="Cadastro de Cliente"
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Identidades',
          url: ''
        },
        {
          title: 'Clientes',
          url: rotas.identidades.clientes.index
        },
        {
          title: 'Cadastro',
          url: rotas.identidades.clientes.cadastrar
        }
      ]}
    >
      <clients.Create />
    </templates.Base>
  )
}
