import * as groups from '&erp/domains/inventory/Registration/Groups';

import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext';
import * as templates from '@comigo/ui-templates';
import mainMenuItens from '&erp/domains/MainMenuItens';
import companies from '&erp/domains/companies';
import rotas from '&erp/domains/routes';

export default function Groups() {
  return (
    <groups.GroupProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </groups.GroupProvider>
  );
}

export function Page() {
  const { theme, changeTheme } = useTheme();
  const { groupsRefetch, groupsLoading } = groups.useGroup();
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      mainMenuItens={mainMenuItens}
      rotas={rotas}
      companies={companies}
      theme={theme}
      SubMenu={<groups.InternalNavigation />}
      title="Grupos de estoque"
      reload={{ action: groupsRefetch, state: groupsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Estoque', url: rotas.estoque.index },
        {
          title: 'Grupos',
          url: rotas.estoque.cadastros.grupos,
        },
      ]}
    >
      <groups.List />
      <groups.SlidePanel />
    </templates.InternalNavigationAndSlide>
  );
}
