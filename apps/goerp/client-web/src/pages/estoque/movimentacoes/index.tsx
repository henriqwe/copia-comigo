import * as moves from '&erp/domains/inventory/Moves';

import rotas from '&erp/domains/routes';

import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext';
import * as templates from '@comigo/ui-templates';
import mainMenuItens from '&erp/domains/MainMenuItens';
import companies from '&erp/domains/companies';

export default function Moves() {
  return (
    <moves.ListProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </moves.ListProvider>
  );
}

export function Page() {
  const { theme, changeTheme } = useTheme();
  const { MovesRefetch, MovesLoading } = moves.useList();
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      mainMenuItens={mainMenuItens}
      rotas={rotas}
      companies={companies}
      theme={theme}
      SubMenu={<moves.InternalNavigation />}
      title="Listagem de Movimentações"
      reload={{
        action: MovesRefetch,
        state: MovesLoading,
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Estoque', url: rotas.estoque.index },
        {
          title: 'Movimentações',
          url: rotas.estoque.movimentacoes.index,
        },
      ]}
    >
      <moves.List />
    </templates.InternalNavigationAndSlide>
  );
}
