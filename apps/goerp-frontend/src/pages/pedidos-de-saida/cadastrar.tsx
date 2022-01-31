import * as outgoingOrders from '&erp/domains/outgoingOrders'
import * as products from '&erp/domains/purchases/Products'
import * as manufacturers from '&erp/domains/inventory/Registration/Manufacturers'

import rotas from '&erp/domains/routes'

import { UserProvider } from '&erp/contexts/UserContext'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import mainMenuItens from '&erp/domains/MainMenuItens'
import companies from '&erp/domains/companies'


export default function CreateOutgoingOrder() {
  return (
    <UserProvider>
      <outgoingOrders.CreateProvider>
        <products.ListProvider>
          <manufacturers.ManufacturerProvider>
            <ThemeProvider>
              <Page />
            </ThemeProvider>
          </manufacturers.ManufacturerProvider>
        </products.ListProvider>
      </outgoingOrders.CreateProvider>
    </UserProvider>
  )
}

export function Page() {
  const { theme } = useTheme()
  const { productsRefetch, productsLoading } = products.useList()
  const { manufacturersRefetch } = manufacturers.useManufacturer()

  const refetch = () => {
    manufacturersRefetch()
    productsRefetch()
  }
  return (
    <templates.Base
      imageUrl='/imagens/logoRastreamento.png'
      mainMenuItens={mainMenuItens} rotas={rotas} companies={companies}
      theme={theme}
      title="Cadastro de Pedido de saída"
      reload={{ action: refetch, state: productsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Compras', url: rotas.compras.index },
        {
          title: 'Pedidos',
          url: rotas.pedidosDeSaida.index
        }
      ]}
    >
      <outgoingOrders.Create />
    </templates.Base>
  )
}
