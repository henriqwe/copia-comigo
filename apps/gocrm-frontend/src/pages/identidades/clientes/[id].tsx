import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

import * as clients from '&crm/domains/identities/Clients'

export default function UpdateClient() {
  return (
    <clients.Addresses.AddressProvider>
      <clients.Emails.EmailProvider>
        <clients.Phones.PhoneProvider>
          <clients.UpdateProvider>
            <clients.Representative.RepresentativeProvider>
              <clients.Doucments.DocumentProvider>
                <clients.users.UserProvider>
                  <ThemeProvider>       <Page />     </ThemeProvider>
                </clients.users.UserProvider>
              </clients.Doucments.DocumentProvider>
            </clients.Representative.RepresentativeProvider>
          </clients.UpdateProvider>
        </clients.Phones.PhoneProvider>
      </clients.Emails.EmailProvider>
    </clients.Addresses.AddressProvider>
  )
}

function Page() {
  const {theme, changeTheme} = useTheme()
  const { clientData, clientLoading, clientRefetch } = clients.useUpdate()
  const { addressesRefetch } = clients.Addresses.useAddress()
  const { emailsRefetch } = clients.Emails.useEmail()
  const { phonesRefetch } = clients.Phones.usePhone()
  const { representativesDataRefetch } =
    clients.Representative.useRepresentative()

  const refetch = () => {
    representativesDataRefetch()
    addressesRefetch()
    emailsRefetch()
    phonesRefetch()
    clientRefetch()
  }
  let titulo = clientData?.Pessoa.Nome || ''
  if (clientData?.Pessoa.PessoaJuridica)
    titulo = clientData?.Pessoa.DadosDaApi.alias

  return (
    <templates.FormAndTabs setTheme={changeTheme}
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      Form={<clients.Update />}
      title={`${titulo}`}
      reload={{
        action: refetch,
        state: clientLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Identidades',
          url: rotas.identidades.index
        },
        {
          title: 'Clientes',
          url: rotas.identidades.clientes.index
        }
      ]}
    >
      <clients.Tabs />
    </templates.FormAndTabs>
  )
}
