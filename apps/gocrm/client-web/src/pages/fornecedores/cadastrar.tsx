import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import MainMenuItems from '&crm/domains/MainMenuItems'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

import * as providers from '&crm/domains/Providers'

export default function CreateProvider() {
  return (
    <providers.CreateProvider>
      <ThemeProvider>
        {' '}
        <Page />{' '}
      </ThemeProvider>
    </providers.CreateProvider>
  )
}

function Page() {
  const { theme, changeTheme } = useTheme()
  return (
    <templates.Base
      setTheme={changeTheme}
      theme={theme}
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      title="Cadastro de Fornecedor"
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Identidades', url: rotas.index },
        {
          title: 'Fornecedores',
          url: rotas.fornecedores.index
        },
        {
          title: 'Cadastro',
          url: rotas.fornecedores.cadastrar
        }
      ]}
    >
      <providers.Create />
    </templates.Base>
  )
}
