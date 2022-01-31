import * as itens from '&erp/domains/inventory/Itens'
import * as exits from '&erp/domains/inventory/Moves/Exits'
import * as purchaseOrders from '&erp/domains/purchases/PurchaseOrders'

import rotas from '&erp/domains/routes'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import mainMenuItens from '&erp/domains/MainMenuItens'
import companies from '&erp/domains/companies'


export default function ValidateOutgoingOrder() {
  return (
    <exits.ValidateProvider>
      <itens.ListProvider>
        <purchaseOrders.CreateProvider>
          <ThemeProvider>
            <Page />
          </ThemeProvider>
        </purchaseOrders.CreateProvider>
      </itens.ListProvider>
    </exits.ValidateProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { outgoingOrdersRefetch, outgoingOrdersLoading } = exits.useValidate()
  const { itensRefetch } = itens.useList()
  const { purchaseOrderRefetch } = purchaseOrders.useList()

  const refetch = () => {
    itensRefetch()
    purchaseOrderRefetch()
    outgoingOrdersRefetch()
  }
  return (
    <templates.Base
      setTheme={changeTheme}
      imageUrl='/imagens/logoRastreamento.png'
      mainMenuItens={mainMenuItens} rotas={rotas} companies={companies}
      theme={theme}
      reload={{
        action: refetch,
        state: outgoingOrdersLoading
      }}
      title="Saida de pedidos de saida"
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Compras', url: rotas.compras.index },
        {
          title: 'Movimentações',
          url: rotas.estoque.movimentacoes.index
        },
        { title: 'Saídas', url: rotas.estoque.movimentacoes.saidas.index }
      ]}
    >
      <exits.Validate />
    </templates.Base>
  )
}
