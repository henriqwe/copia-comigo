import * as vehicles from '&crm/domains/services/Vehicles'
import * as clients from '&crm/domains/clients'

import * as templates from '@comigo/ui-templates'
import rotas from '&crm/domains/routes'
import MainMenuItems from '&crm/domains/MainMenuItems'
import companies from '&crm/domains/companies'
import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

export default function Vehicles() {
  return (
    <vehicles.VehicleProvider>
      <clients.ClientProvider>
        <ThemeProvider>
          {' '}
          <Page />{' '}
        </ThemeProvider>
      </clients.ClientProvider>
    </vehicles.VehicleProvider>
  )
}

export function Page() {
  const { vehiclesRefetch, vehiclesLoading } = vehicles.useVehicle()
  const { clientsRefetch } = clients.useClient()
  const refetch = () => {
    clientsRefetch()
    vehiclesRefetch()
  }
  const { theme, changeTheme } = useTheme()

  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      theme={theme}
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<vehicles.InternalNavigation />}
      title="Veículos"
      reload={{ action: refetch, state: vehiclesLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Atendimento', url: rotas.atendimento.index },
        {
          title: 'Veículos',
          url: rotas.atendimento.vehicles
        }
      ]}
    >
      <vehicles.List />
      <vehicles.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
