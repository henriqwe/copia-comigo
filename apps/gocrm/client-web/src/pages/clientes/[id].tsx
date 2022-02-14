import * as activeVehicles from '&crm/domains/clients'
import * as clients from '&crm/domains/identities/Clients'
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
          <clients.ListProvider>
            <vehicles.VehicleProvider>
              <ThemeProvider>
                <Page />
              </ThemeProvider>
            </vehicles.VehicleProvider>
          </clients.ListProvider>
        </proposals.CreateProvider>
    </activeVehicles.UpdateProvider>
  )
}

function Page() {
  const { theme, changeTheme } = useTheme()
  const { clientLoading, clientRefetch } = activeVehicles.useUpdate()
  const { clientsRefetch } = clients.useList()

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
