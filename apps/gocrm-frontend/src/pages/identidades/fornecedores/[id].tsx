import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

import * as providers from '&crm/domains/identities/Providers'

export default function UpdateProvider() {
  return (
    <providers.Addresses.AddressProvider>
      <providers.Sellers.SellerProvider>
        <providers.UpdateProvider>
          <ThemeProvider>       <Page />     </ThemeProvider>
        </providers.UpdateProvider>
      </providers.Sellers.SellerProvider>
    </providers.Addresses.AddressProvider>
  )
}

function Page() {
  const {theme, changeTheme} = useTheme()
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
    <templates.FormAndTabs setTheme={changeTheme}
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      Form={<providers.Update />}
      title={`${titulo}`}
      reload={{
        action: refetch,
        state: providerLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Identidades', url: rotas.identidades.index },
        {
          title: 'Fornecedores',
          url: rotas.identidades.fornecedores.cadastrar
        }
      ]}
    >
      <providers.Tabs />
    </templates.FormAndTabs>
  )
}
