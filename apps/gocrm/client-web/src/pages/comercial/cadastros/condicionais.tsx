import * as conditionals from '&crm/domains/commercial/Registration/Conditionals';

import * as templates from '@comigo/ui-templates';

import rotas from '&crm/domains/routes';

import mainMenuItens from '&crm/domains/MainMenuItens';

import companies from '&crm/domains/companies';

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext';

export default function Conditionals() {
  return (
    <conditionals.ConditionalProvider>
      <ThemeProvider>
        {' '}
        <Page />{' '}
      </ThemeProvider>
    </conditionals.ConditionalProvider>
  );
}

export function Page() {
  const { theme, changeTheme } = useTheme();
  const { conditionalRefetch, conditionalLoading } =
    conditionals.useConditional();
  const refetch = () => {
    conditionalRefetch();
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
      SubMenu={<conditionals.InternalNavigation />}
      title="Condicionais"
      reload={{ action: refetch, state: conditionalLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Cadastros',
          url: rotas.comercial.cadastros.index,
        },
        {
          title: 'Condicionais',
          url: rotas.comercial.cadastros.condicionais,
        },
      ]}
    >
      <conditionals.List />
      <conditionals.SlidePanel />
    </templates.InternalNavigationAndSlide>
  );
}
