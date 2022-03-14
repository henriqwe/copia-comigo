import * as serviceOrders from '&erp/domains/operational/ServiceOrders'
import { ThemeProvider } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'

export default function UpdateServiceOrder() {
  return (
    <serviceOrders.UpdateProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </serviceOrders.UpdateProvider>
  )
}

export function Page() {
  return (
    <templates.ToPrint noGrid>
      <serviceOrders.Invoice />
    </templates.ToPrint>
  )
}
