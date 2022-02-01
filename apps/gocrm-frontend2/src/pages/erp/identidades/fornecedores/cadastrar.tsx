import rotas from '&test/components/domains/routes'

import Base from '&test/components/templates/Base'

import * as providers from '&test/components/domains/erp/identities/Providers'

export default function CreateProvider() {
  return (
    <providers.CreateProvider>
      <Page />
    </providers.CreateProvider>
  )
}

function Page() {
  return (
    <Base
      title="Cadastro de Fornecedor"
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Identidades', url: rotas.erp.identidades.index },
        {
          title: 'Fornecedores',
          url: rotas.erp.identidades.fornecedores.index
        },
        {
          title: 'Cadastro',
          url: rotas.erp.identidades.fornecedores.cadastrar
        }
      ]}
    >
      <providers.Create />
    </Base>
  )
}