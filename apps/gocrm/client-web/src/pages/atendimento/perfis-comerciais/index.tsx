import * as businessProfiles from '&crm/domains/services/BusinessProfiles';

import * as templates from '@comigo/ui-templates';

import rotas from '&crm/domains/routes';

import mainMenuItens from '&crm/domains/MainMenuItens';

import companies from '&crm/domains/companies';

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext';

export default function BusinessProfiles() {
  return (
    <businessProfiles.BusinessProfileProvider>
      <ThemeProvider>
        {' '}
        <Page />{' '}
      </ThemeProvider>
    </businessProfiles.BusinessProfileProvider>
  );
}

export function Page() {
  const { theme, changeTheme } = useTheme();
  const { businessProfilesRefetch, businessProfilesLoading } =
    businessProfiles.useBusinessProfile();
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      theme={theme}
      mainMenuItens={mainMenuItens}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<businessProfiles.InternalNavigation />}
      title="Perfis Comerciais"
      reload={{
        action: businessProfilesRefetch,
        state: businessProfilesLoading,
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Atendimento', url: rotas.atendimento.index },
        {
          title: 'Perfis Comerciais',
          url: rotas.atendimento.perfisComerciais.index,
        },
      ]}
    >
      <businessProfiles.List />
      <businessProfiles.SlidePanel />
    </templates.InternalNavigationAndSlide>
  );
}
