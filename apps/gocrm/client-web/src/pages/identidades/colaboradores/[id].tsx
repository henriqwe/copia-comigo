import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import MainMenuItems from '&crm/domains/MainMenuItems'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

import * as collaborator from '&crm/domains/identities/Collaborators'

export default function UpdateClient() {
  return (
    <collaborator.UpdateProvider>
      <collaborator.users.UserProvider>
        <ThemeProvider>
          {' '}
          <Page />{' '}
        </ThemeProvider>
      </collaborator.users.UserProvider>
    </collaborator.UpdateProvider>
  )
}

function Page() {
  const { theme, changeTheme } = useTheme()
  const { collaboratorRefetch, collaboratorLoading, collaboratorData } =
    collaborator.useUpdate()
  const refetch = () => {
    collaboratorRefetch()
  }

  const titulo = collaboratorData?.Pessoa.Nome || ''

  return (
    <templates.FormAndTabs
      setTheme={changeTheme}
      theme={theme}
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      Form={<collaborator.Update />}
      title={`${titulo}`}
      reload={{
        action: refetch,
        state: collaboratorLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Identidades', url: rotas.identidades.index },
        { title: 'Colaboradores', url: rotas.identidades.colaboradores }
      ]}
    >
      <collaborator.Tabs />
    </templates.FormAndTabs>
  )
}
