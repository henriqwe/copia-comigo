import * as vehicles from '&crm/domains/services/Vehicles';
import * as clients from '&crm/domains/identities/Clients';

import * as templates from '@comigo/ui-templates';
import rotas from '&crm/domains/routes';
import mainMenuItens from '&crm/domains/MainMenuItens';
import companies from '&crm/domains/companies';
import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext';

export default function Vehicles() {
  return (
    <vehicles.VehicleProvider>
      <clients.ListProvider>
        <ThemeProvider>
          {' '}
          <Page />{' '}
        </ThemeProvider>
      </clients.ListProvider>
    </vehicles.VehicleProvider>
  );
}

export function Page() {
  const { vehiclesRefetch, vehiclesLoading } = vehicles.useVehicle();
  const { clientsRefetch } = clients.useList();
  const refetch = () => {
    clientsRefetch();
    vehiclesRefetch();
  };
  const { theme, changeTheme } = useTheme();

  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      theme={theme}
      mainMenuItens={mainMenuItens}
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
          url: rotas.atendimento.vehicles,
        },
      ]}
    >
      <vehicles.List />
      <vehicles.SlidePanel />
    </templates.InternalNavigationAndSlide>
  );
}
