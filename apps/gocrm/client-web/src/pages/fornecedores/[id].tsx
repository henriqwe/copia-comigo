import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import MainMenuItems from '&crm/domains/MainMenuItems'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

import * as providers from '&crm/domains/Providers'

export default function UpdateProvider() {
  return (
    <providers.Addresses.AddressProvider>
      <providers.Sellers.SellerProvider>
        <providers.UpdateProvider>
          <ThemeProvider>
            {' '}
            <Page />{' '}
          </ThemeProvider>
        </providers.UpdateProvider>
      </providers.Sellers.SellerProvider>
    </providers.Addresses.AddressProvider>
  )
}

function Page() {
  const { theme, changeTheme } = useTheme()
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
    <templates.FormAndTabs
      setTheme={changeTheme}
      theme={theme}
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      Form={<providers.Update />}
      title={`${titulo}`}
      reload={{
        action: refetch,
        state: providerLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Identidades', url: rotas.index },
        {
          title: 'Fornecedores',
          url: rotas.fornecedores.cadastrar
        }
      ]}
    >
      <providers.Tabs />
    </templates.FormAndTabs>
  )
}
