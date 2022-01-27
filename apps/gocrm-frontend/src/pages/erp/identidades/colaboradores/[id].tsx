import rotas from '@/domains/routes'

import FormAndTabs from '@/templates/FormAndTabs'

import * as collaborator from '@/domains/erp/identities/Collaborators'

export default function UpdateClient() {
  return (
    <collaborator.UpdateProvider>
      <collaborator.users.UserProvider>
        <Page />
      </collaborator.users.UserProvider>
    </collaborator.UpdateProvider>
  )
}

function Page() {
  const { collaboratorRefetch, collaboratorLoading, collaboratorData } =
    collaborator.useUpdate()
  const refetch = () => {
    collaboratorRefetch()
  }

  const titulo = collaboratorData?.Pessoa.Nome || ''

  return (
    <FormAndTabs
      Form={<collaborator.Update />}
      title={`${titulo}`}
      reload={{
        action: refetch,
        state: collaboratorLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Identidades', url: rotas.erp.identidades.index },
        { title: 'Colaboradores', url: rotas.erp.identidades.colaboradores }
      ]}
    >
      <collaborator.Tabs />
    </FormAndTabs>
  )
}
