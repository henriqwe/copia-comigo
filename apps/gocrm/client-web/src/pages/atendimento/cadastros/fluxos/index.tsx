import * as flows from '&crm/domains/services/Registration/Flows';

import * as templates from '@comigo/ui-templates';

import rotas from '&crm/domains/routes';

import mainMenuItens from '&crm/domains/MainMenuItens';

import companies from '&crm/domains/companies';

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext';

export default function Flows() {
  return (
    <flows.FlowProvider>
      <ThemeProvider>
        {' '}
        <Page />{' '}
      </ThemeProvider>
    </flows.FlowProvider>
  );
}

export function Page() {
  const { theme, changeTheme } = useTheme();
  const { flowsRefetch, flowsLoading } = flows.useFlow();
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      theme={theme}
      mainMenuItens={mainMenuItens}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<flows.InternalNavigation />}
      title="Fluxos"
      reload={{ action: flowsRefetch, state: flowsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Atendimento', url: rotas.atendimento.index },
        {
          title: 'Cadastros',
          url: rotas.atendimento.cadastros.index,
        },
        {
          title: 'Fluxos',
          url: rotas.atendimento.cadastros.fluxos.index,
        },
      ]}
    >
      <flows.List />
      <flows.SlidePanel />
    </templates.InternalNavigationAndSlide>
  );
}
