import rotas from '&test/components/domains/routes'

import FormAndTabs from '&test/components/templates/FormAndTabs'

import * as providers from '&test/components/domains/erp/identities/Providers'

export default function UpdateProvider() {
  return (
    <providers.Addresses.AddressProvider>
      <providers.Sellers.SellerProvider>
        <providers.UpdateProvider>
          <Page />
        </providers.UpdateProvider>
      </providers.Sellers.SellerProvider>
    </providers.Addresses.AddressProvider>
  )
}

function Page() {
  const { providerData, providerLoading, providerRefetch } =
    providers.useUpdate()
  const { addressesRefetch } = providers.Addresses.useAdress()
  const { sellersRefetch } = providers.Sellers.useSeller()
  let titulo = providerData?.Pessoa.Nome || ''
  if (providerData?.Pessoa.PessoaJuridica) {
    titulo = providerData?.Pessoa.DadosDaApi.razaoSocial
  }

  const refetch = () => {
    addressesRefetch()
    sellersRefetch()
    providerRefetch()
  }
  return (
    <FormAndTabs
      Form={<providers.Update />}
      title={`${titulo}`}
      reload={{
        action: refetch,
        state: providerLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Identidades', url: rotas.erp.identidades.index },
        {
          title: 'Fornecedores',
          url: rotas.erp.identidades.fornecedores.cadastrar
        }
      ]}
    >
      <providers.Tabs />
    </FormAndTabs>
  )
}