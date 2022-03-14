import * as activeVehicles from '&crm/domains/clients'
import * as proposals from '&crm/domains/commercial/Proposals'
import * as vehicles from '&crm/domains/services/Vehicles'
import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import MainMenuItems from '&crm/domains/MainMenuItems'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

export default function UpdateProvider() {
  return (
    <activeVehicles.UpdateProvider>
      <proposals.CreateProvider>
        <activeVehicles.ClientProvider>
          <vehicles.VehicleProvider>
            <activeVehicles.Addresses.AddressProvider>
              <activeVehicles.Emails.EmailProvider>
                <activeVehicles.Phones.PhoneProvider>
                  <activeVehicles.UpdateProvider>
                    <activeVehicles.Representative.RepresentativeProvider>
                      <activeVehicles.Doucments.DocumentProvider>
                        <activeVehicles.users.UserProvider>
                          <ThemeProvider>
                            <Page />
                          </ThemeProvider>
                        </activeVehicles.users.UserProvider>
                      </activeVehicles.Doucments.DocumentProvider>
                    </activeVehicles.Representative.RepresentativeProvider>
                  </activeVehicles.UpdateProvider>
                </activeVehicles.Phones.PhoneProvider>
              </activeVehicles.Emails.EmailProvider>
            </activeVehicles.Addresses.AddressProvider>
          </vehicles.VehicleProvider>
        </activeVehicles.ClientProvider>
      </proposals.CreateProvider>
    </activeVehicles.UpdateProvider>
  )
}

function Page() {
  const { theme, changeTheme } = useTheme()
  const { clientLoading, clientRefetch } = activeVehicles.useUpdate()
  const { clientsRefetch } = activeVehicles.useClient()

  const refetch = () => {
    clientsRefetch()
    clientRefetch()
  }

  return (
    <templates.Base
      setTheme={changeTheme}
      theme={theme}
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      title="Visualização de cliente"
      reload={{
        action: refetch,
        state: clientLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Clientes', url: rotas.clientes }
      ]}
    >
      <activeVehicles.ViewClient />
    </templates.Base>
  )
}
