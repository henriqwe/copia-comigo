import * as collaborator from '&test/components/domains/erp/identities/Collaborators'

import rotas from '&test/components/domains/routes'
import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'

export default function Collaborator() {
  return (
    <collaborator.CollaboratorProvider>
      <Page />
    </collaborator.CollaboratorProvider>
  )
}

export function Page() {
  const { collaboratorsRefetch, collaboratorsLoading } =
    collaborator.useCollaborator()
  const refetch = () => {
    collaboratorsRefetch()
  }

  return (
    <InternalNavigationAndSlide
      SubMenu={<collaborator.InternalNavigation />}
      title="Colaboradores"
      reload={{ action: refetch, state: collaboratorsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Identidades', url: rotas.erp.identidades.index },
        { title: 'Colaboradores', url: rotas.erp.identidades.colaboradores }
      ]}
    >
      <collaborator.List />
      <collaborator.SlidePanel />
    </InternalNavigationAndSlide>
  )
}
