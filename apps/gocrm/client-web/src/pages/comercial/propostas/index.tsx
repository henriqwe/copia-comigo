import * as propostas from '&crm/domains/commercial/Proposals';

import * as templates from '@comigo/ui-templates';

import rotas from '&crm/domains/routes';

import mainMenuItens from '&crm/domains/MainMenuItens';

import companies from '&crm/domains/companies';

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext';

export default function Propostas() {
  return (
    <propostas.ListProvider>
      <ThemeProvider>
        {' '}
        <Page />{' '}
      </ThemeProvider>
    </propostas.ListProvider>
  );
}

export function Page() {
  const { theme, changeTheme } = useTheme();
  const { proposalsRefetch, proposalsLoading } = propostas.useList();
  const refetch = () => {
    proposalsRefetch();
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
      SubMenu={<propostas.InternalNavigation />}
      title="Propostas"
      reload={{ action: refetch, state: proposalsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Propostas',
          url: rotas.comercial.propostas.index,
        },
      ]}
    >
      <propostas.List />
    </templates.InternalNavigationAndSlide>
  );
}
