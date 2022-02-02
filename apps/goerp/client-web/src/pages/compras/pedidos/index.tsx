import * as purchaseOrders from '&erp/domains/purchases/PurchaseOrders';

import rotas from '&erp/domains/routes';

import { UserProvider } from '&erp/contexts/UserContext';
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext';
import * as templates from '@comigo/ui-templates';
import mainMenuItens from '&erp/domains/MainMenuItens';
import companies from '&erp/domains/companies';

export default function PurchaseOrders() {
  return (
    <UserProvider>
      <ThemeProvider>
        <purchaseOrders.ListProvider>
          <Page />
        </purchaseOrders.ListProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export function Page() {
  const { theme, changeTheme } = useTheme();
  const { purchaseOrderRefetch, purchaseOrderLoading } =
    purchaseOrders.useList();
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      mainMenuItens={mainMenuItens}
      rotas={rotas}
      companies={companies}
      theme={theme}
      SubMenu={<purchaseOrders.InternalNavigation />}
      title="Listagem de Pedidos de compra"
      reload={{
        action: purchaseOrderRefetch,
        state: purchaseOrderLoading,
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Pedidos de Compra', url: rotas.compras.index },
        {
          title: 'Pedidos',
          url: rotas.compras.pedidos.index,
        },
      ]}
    >
      <purchaseOrders.List />
    </templates.InternalNavigationAndSlide>
  );
}
