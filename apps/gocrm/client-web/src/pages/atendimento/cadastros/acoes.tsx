import * as action from '&crm/domains/services/Registration/Actions';
import * as flowStages from '&crm/domains/services/Registration/Flows/Stage';

import * as templates from '@comigo/ui-templates';

import rotas from '&crm/domains/routes';

import mainMenuItens from '&crm/domains/MainMenuItens';

import companies from '&crm/domains/companies';

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext';

export default function Actions() {
  return (
    <action.ActionProvider>
      <flowStages.StageProvider>
        <ThemeProvider>
          {' '}
          <Page />{' '}
        </ThemeProvider>
      </flowStages.StageProvider>
    </action.ActionProvider>
  );
}

export function Page() {
  const { theme, changeTheme } = useTheme();
  const { stagesRefetch } = flowStages.useStage();
  const { actionsRefetch, actionsLoading } = action.useAction();

  function refetch() {
    stagesRefetch();
    actionsRefetch();
  }
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      theme={theme}
      mainMenuItens={mainMenuItens}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<action.InternalNavigation />}
      title="Ações"
      reload={{ action: refetch, state: actionsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Atendimento', url: rotas.atendimento.index },
        {
          title: 'Cadastros',
          url: rotas.atendimento.cadastros.index,
        },
        {
          title: 'Ações',
          url: rotas.atendimento.cadastros.acoes,
        },
      ]}
    >
      <action.List />
      <action.SlidePanel />
    </templates.InternalNavigationAndSlide>
  );
}
