import * as collaborator from '&crm/domains/identities/Collaborators'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'
export default function Collaborator() {
  return (
    <collaborator.CollaboratorProvider>
      <Page />
    </collaborator.CollaboratorProvider>
  )
}

export function Page() {
  const {theme} = useTheme()
  const { collaboratorsRefetch, collaboratorsLoading } =
    collaborator.useCollaborator()
  const refetch = () => {
    collaboratorsRefetch()
  }

  return (
    <templates.InternalNavigationAndSlide
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<collaborator.InternalNavigation />}
      title="Colaboradores"
      reload={{ action: refetch, state: collaboratorsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Identidades', url: rotas.identidades.index },
        { title: 'Colaboradores', url: rotas.identidades.colaboradores }
      ]}
    >
      <collaborator.List />
      <collaborator.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
