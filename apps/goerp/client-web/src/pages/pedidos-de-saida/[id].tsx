import * as outgoingOrders from '&erp/domains/outgoingOrders';

import rotas from '&erp/domains/routes';

import { UserProvider } from '&erp/contexts/UserContext';
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext';
import * as templates from '@comigo/ui-templates';
import mainMenuItens from '&erp/domains/MainMenuItens';
import companies from '&erp/domains/companies';

export default function OutgoingOrderDetails() {
  return (
    <UserProvider>
      <outgoingOrders.UpdateProvider>
        <ThemeProvider>
          <Page />
        </ThemeProvider>
      </outgoingOrders.UpdateProvider>
    </UserProvider>
  );
}

export function Page() {
  const { theme, changeTheme } = useTheme();
  const {
    outgoingOrderLoading,
    outgoingOrderRefetch,
    outgoingOrderLogsRefetch,
    outgoingOrderProductsRefetch,
    outgoingOrderData,
  } = outgoingOrders.useUpdate();
  const refetch = () => {
    outgoingOrderRefetch();
    outgoingOrderLogsRefetch();
    outgoingOrderProductsRefetch();
  };
  return (
    <templates.FormAndTabs
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      mainMenuItens={mainMenuItens}
      rotas={rotas}
      companies={companies}
      theme={theme}
      Form={<outgoingOrders.Update />}
      title={`${outgoingOrderData?.Id}`}
      reload={{
        action: refetch,
        state: outgoingOrderLoading,
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Compras', url: rotas.compras.index },
        {
          title: 'Pedidos',
          url: rotas.pedidosDeSaida.index,
        },
      ]}
    >
      <outgoingOrders.Tabs />
      <outgoingOrders.SlidePanel />
    </templates.FormAndTabs>
  );
}
