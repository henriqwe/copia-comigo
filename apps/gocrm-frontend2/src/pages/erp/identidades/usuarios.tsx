import * as users from '&test/components/domains/erp/identities/Users'
import * as clients from '&test/components/domains/erp/identities/Clients'

import rotas from '&test/components/domains/routes'
import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'

export default function Users() {
  return (
    <users.UserProvider>
      <clients.ListProvider>
        <Page />
      </clients.ListProvider>
    </users.UserProvider>
  )
}

export function Page() {
  const { usersRefetch, usersLoading, collaboratorsRefetch } = users.useUser()
  const { clientsRefetch } = clients.useList()
  const refetch = () => {
    usersRefetch()
    collaboratorsRefetch()
    clientsRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <InternalNavigationAndSlide
      SubMenu={<users.InternalNavigation />}
      title="Usuários"
      reload={{ action: refetch, state: usersLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Identidades', url: rotas.erp.identidades.index },
        { title: 'Usuários', url: rotas.erp.identidades.usuarios }
      ]}
    >
      <users.List />
      <users.SlidePanel />
    </InternalNavigationAndSlide>
  )
}
