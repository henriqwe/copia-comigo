import * as purchaseOrders from '&erp/domains/purchases/PurchaseOrders'
import * as manufacturers from '&erp/domains/inventory/Registration/Manufacturers'
import { UserProvider } from '&erp/contexts/UserContext'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import rotas from '&erp/domains/routes'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function PurchaseOrderDetails() {
  return (
    <UserProvider>
      <ThemeProvider>
        <purchaseOrders.UpdateProvider>
          <purchaseOrders.budgets.BudgetProvider>
            <manufacturers.ManufacturerProvider>
              <Page />
            </manufacturers.ManufacturerProvider>
          </purchaseOrders.budgets.BudgetProvider>
        </purchaseOrders.UpdateProvider>
      </ThemeProvider>
    </UserProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const {
    purchaseOrderLoading,
    purchaseOrderRefetch,
    purchaseOrderData,
    purchaseOrderLogsRefetch,
    purchaseOrderProductsRefetch
  } = purchaseOrders.useUpdate()
  const { budgetsRefetch } = purchaseOrders.budgets.useBudget()
  const { manufacturersRefetch } = manufacturers.useManufacturer()

  const refetch = () => {
    purchaseOrderRefetch()
    purchaseOrderProductsRefetch()
    purchaseOrderLogsRefetch()
    manufacturersRefetch()
    budgetsRefetch()
  }
  return (
    <templates.FormAndTabs
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
      Form={<purchaseOrders.Update />}
      title={`${purchaseOrderData?.Id}`}
      reload={{
        action: refetch,
        state: purchaseOrderLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Pedidos de Compra', url: rotas.compras.index },
        {
          title: 'Pedidos',
          url: rotas.compras.pedidos.index
        }
      ]}
    >
      <purchaseOrders.Tabs />
      <purchaseOrders.SlidePanel />
    </templates.FormAndTabs>
  )
}
