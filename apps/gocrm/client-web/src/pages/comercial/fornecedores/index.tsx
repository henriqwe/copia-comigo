import * as providers from '&crm/domains/commercial/Providers';

import * as templates from '@comigo/ui-templates';

import rotas from '&crm/domains/routes';

import mainMenuItens from '&crm/domains/MainMenuItens';

import companies from '&crm/domains/companies';

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext';
export default function Providers() {
  return (
    <providers.ProviderProvider>
      <ThemeProvider>
        {' '}
        <Page />{' '}
      </ThemeProvider>
    </providers.ProviderProvider>
  );
}

export function Page() {
  const { theme, changeTheme } = useTheme();
  const { providersRefetch, providersLoading } = providers.useProvider();
  const refetch = () => {
    providersRefetch();
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
      SubMenu={<providers.InternalNavigation />}
      title="Parceiros"
      reload={{ action: refetch, state: providersLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Parceiros',
          url: rotas.comercial.fornecedores,
        },
      ]}
    >
      <providers.List />
      <providers.SlidePanel />
    </templates.InternalNavigationAndSlide>
  );
}
