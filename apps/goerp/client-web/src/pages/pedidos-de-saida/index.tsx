import * as outgoingOrders from '&erp/domains/outgoingOrders'

import rotas from '&erp/domains/routes'

import { UserProvider } from '&erp/contexts/UserContext'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function OutgoingOrders() {
  return (
    <UserProvider>
      <outgoingOrders.ListProvider>
        <ThemeProvider>
          <Page />
        </ThemeProvider>
      </outgoingOrders.ListProvider>
    </UserProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { outGoingOrdersRefetch, outGoingOrdersLoading } =
    outgoingOrders.useList()
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
      SubMenu={<outgoingOrders.InternalNavigation />}
      title="Listagem de Pedidos de saída"
      reload={{
        action: outGoingOrdersRefetch,
        state: outGoingOrdersLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Compras', url: rotas.compras.index },
        {
          title: 'Pedidos',
          url: rotas.pedidosDeSaida.index
        }
      ]}
    >
      <outgoingOrders.List />
    </templates.InternalNavigationAndSlide>
  )
}
