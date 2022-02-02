import * as templates from '@comigo/ui-templates';

import rotas from '&crm/domains/routes';

import mainMenuItens from '&crm/domains/MainMenuItens';

import companies from '&crm/domains/companies';

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext';
import * as providers from '&crm/domains/identities/Providers';

export default function Providers() {
  return (
    <providers.ListProvider>
      <ThemeProvider>
        {' '}
        <Page />{' '}
      </ThemeProvider>
    </providers.ListProvider>
  );
}

function Page() {
  const { theme, changeTheme } = useTheme();
  const { providersRefetch, providersLoading } = providers.useList();
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      theme={theme}
      mainMenuItens={mainMenuItens}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<providers.InternalNavigation />}
      title="Listagem de Fornecedores"
      reload={{
        action: providersRefetch,
        state: providersLoading,
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Identidades', url: rotas.identidades.index },
        {
          title: 'Fornecedores',
          url: rotas.identidades.fornecedores.index,
        },
      ]}
    >
      <providers.List />
    </templates.InternalNavigationAndSlide>
  );
}
