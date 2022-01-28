import * as collaborator from '&crm/domains/erp/identities/Collaborators'

import rotas from '&crm/domains/routes'
import InternalNavigationAndSlide from '@/templates/InternalNavigationAndSlide'

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
