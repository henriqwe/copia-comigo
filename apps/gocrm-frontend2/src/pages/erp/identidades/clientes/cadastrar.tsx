import rotas from '&test/components/domains/routes'

import Base from '&test/components/templates/Base'

import * as clients from '&test/components/domains/erp/identities/Clients'

export default function CreateClient() {
  return (
    <clients.CreateProvider>
      <Page />
    </clients.CreateProvider>
  )
}

function Page() {
  return (
    <Base
      title="Cadastro de Cliente"
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        {
          title: 'Identidades',
          url: ''
        },
        {
          title: 'Clientes',
          url: rotas.erp.identidades.clientes.index
        },
        {
          title: 'Cadastro',
          url: rotas.erp.identidades.clientes.cadastrar
        }
      ]}
    >
      <clients.Create />
    </Base>
  )
}
