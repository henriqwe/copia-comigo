import * as entries from '&erp/domains/inventory/Moves/Entries';

import rotas from '&erp/domains/routes';

import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext';
import * as templates from '@comigo/ui-templates';
import mainMenuItens from '&erp/domains/MainMenuItens';
import companies from '&erp/domains/companies';

export default function Entries() {
  return (
    <entries.ListProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </entries.ListProvider>
  );
}

export function Page() {
  const { theme, changeTheme } = useTheme();
  const { purchaseOrdersRefetch, purchaseOrdersLoading } = entries.useList();
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      mainMenuItens={mainMenuItens}
      rotas={rotas}
      companies={companies}
      theme={theme}
      SubMenu={<entries.InternalNavigation />}
      title="Listagem de Entradas"
      reload={{
        action: purchaseOrdersRefetch,
        state: purchaseOrdersLoading,
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Estoque', url: rotas.estoque.index },
        {
          title: 'Movimentações',
          url: rotas.estoque.movimentacoes.index,
        },
        {
          title: 'Entradas',
          url: rotas.estoque.movimentacoes.entradas.index,
        },
      ]}
    >
      <entries.List />
    </templates.InternalNavigationAndSlide>
  );
}
