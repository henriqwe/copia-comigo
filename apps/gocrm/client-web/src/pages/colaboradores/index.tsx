import * as collaborator from '&crm/domains/Collaborators'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import MainMenuItems from '&crm/domains/MainMenuItems'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'
export default function Collaborator() {
  return (
    <collaborator.CollaboratorProvider>
      <ThemeProvider>
        {' '}
        <Page />{' '}
      </ThemeProvider>
    </collaborator.CollaboratorProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { collaboratorsRefetch, collaboratorsLoading } =
    collaborator.useCollaborator()
  const refetch = () => {
    collaboratorsRefetch()
  }

  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      theme={theme}
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<collaborator.InternalNavigation />}
      title="Colaboradores"
      reload={{ action: refetch, state: collaboratorsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Identidades', url: rotas.index },
        { title: 'Colaboradores', url: rotas.colaboradores }
      ]}
    >
      <collaborator.List />
      <collaborator.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
