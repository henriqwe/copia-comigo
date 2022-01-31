import * as purchaseOrders from '&erp/domains/purchases/PurchaseOrders'
import * as products from '&erp/domains/purchases/Products'
import * as manufacturers from '&erp/domains/inventory/Registration/Manufacturers'
import { UserProvider } from '&erp/contexts/UserContext'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import mainMenuItens from '&erp/domains/MainMenuItens'
import companies from '&erp/domains/companies'
import rotas from '&erp/domains/routes'

export default function CreatePurchaseOrder() {
  return (
    <UserProvider>
      <ThemeProvider>
        <purchaseOrders.CreateProvider>
          <products.ListProvider>
            <manufacturers.ManufacturerProvider>
              <Page />
            </manufacturers.ManufacturerProvider>
          </products.ListProvider>
        </purchaseOrders.CreateProvider>
      </ThemeProvider>
    </UserProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { productsRefetch, productsLoading } = products.useList()
  const { manufacturersRefetch } = manufacturers.useManufacturer()

  const refetch = () => {
    productsRefetch()
    manufacturersRefetch()
  }
  return (
    <templates.Base
      setTheme={changeTheme}
      imageUrl='/imagens/logoRastreamento.png'
      mainMenuItens={mainMenuItens} rotas={rotas} companies={companies}
      theme={theme}
      title="Cadastro de Pedido de compras"
      reload={{ action: refetch, state: productsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Pedidos de Compra', url: rotas.compras.index },
        {
          title: 'Pedidos',
          url: rotas.compras.pedidos.index
        },
        {
          title: 'Cadastro',
          url: rotas.compras.pedidos.cadastrar
        }
      ]}
    >
      <purchaseOrders.Create />
    </templates.Base>
  )
}
