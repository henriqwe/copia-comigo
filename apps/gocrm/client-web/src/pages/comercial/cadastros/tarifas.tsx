import * as tariffs from '&crm/domains/commercial/Registration/Tariffs';

import * as templates from '@comigo/ui-templates';

import rotas from '&crm/domains/routes';

import mainMenuItens from '&crm/domains/MainMenuItens';

import companies from '&crm/domains/companies';

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext';
export default function Tariffs() {
  return (
    <tariffs.TariffsProvider>
      <ThemeProvider>
        {' '}
        <Page />{' '}
      </ThemeProvider>
    </tariffs.TariffsProvider>
  );
}

export function Page() {
  const { theme, changeTheme } = useTheme();
  const { tariffsRefetch, tariffsLoading } = tariffs.useTariffs();
  const refetch = () => {
    tariffsRefetch();
  };
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      theme={theme}
      mainMenuItens={mainMenuItens}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<tariffs.InternalNavigation />}
      title="Tarifas"
      reload={{ action: refetch, state: tariffsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Cadastros',
          url: rotas.comercial.cadastros.index,
        },
        {
          title: 'Tarifas',
          url: rotas.comercial.cadastros.tarifas,
        },
      ]}
    >
      <tariffs.List />
      <tariffs.SlidePanel />
    </templates.InternalNavigationAndSlide>
  );
}
