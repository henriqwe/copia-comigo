import * as purchaseOrders from '@/domains/erp/purchases/PurchaseOrders'
import * as manufacturers from '@/domains/erp/inventory/Registration/Manufacturers'

import rotas from 'domains/routes'

import { UserProvider } from 'contexts/UserContext'
import FormAndTabs from '@/templates/FormAndTabs'

export default function PurchaseOrderDetails() {
  return (
    <UserProvider>
      <purchaseOrders.UpdateProvider>
        <purchaseOrders.budgets.BudgetProvider>
          <manufacturers.ManufacturerProvider>
            <Page />
          </manufacturers.ManufacturerProvider>
        </purchaseOrders.budgets.BudgetProvider>
      </purchaseOrders.UpdateProvider>
    </UserProvider>
  )
}

export function Page() {
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
    <FormAndTabs
      Form={<purchaseOrders.Update />}
      title={`${purchaseOrderData?.Id}`}
      reload={{
        action: refetch,
        state: purchaseOrderLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Pedidos de Compra', url: rotas.erp.compras.index },
        {
          title: 'Pedidos',
          url: rotas.erp.compras.pedidos.index
        }
      ]}
    >
      <purchaseOrders.Tabs />
      <purchaseOrders.SlidePanel />
    </FormAndTabs>
  )
}
