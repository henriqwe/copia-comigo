import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

import * as providers from '&crm/domains/identities/Providers'

export default function CreateProvider() {
  return (
    <providers.CreateProvider>
      <ThemeProvider>       <Page />     </ThemeProvider>
    </providers.CreateProvider>
  )
}

function Page() {
  const {theme, changeTheme} = useTheme()
  return (
    <templates.Base setTheme={changeTheme}
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      title="Cadastro de Fornecedor"
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Identidades', url: rotas.identidades.index },
        {
          title: 'Fornecedores',
          url: rotas.identidades.fornecedores.index
        },
        {
          title: 'Cadastro',
          url: rotas.identidades.fornecedores.cadastrar
        }
      ]}
    >
      <providers.Create />
    </templates.Base>
  )
}
