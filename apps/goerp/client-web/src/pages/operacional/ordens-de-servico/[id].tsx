import rotas from '&erp/domains/routes'

import * as serviceOrders from '&erp/domains/operational/ServiceOrders'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

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
  const { theme, changeTheme } = useTheme()
  const {
    serviceOrderLoading,
    serviceOrderRefetch,
    serviceOrderData,
    serviceOrderActivitiesRefetch
  } = serviceOrders.useUpdate()

  const refetch = () => {
    serviceOrderActivitiesRefetch()
    serviceOrderRefetch()
  }

  return (
    <templates.Base
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
      title={`OS: ${serviceOrderData?.CodigoIdentificador}`}
      reload={{
        action: refetch,
        state: serviceOrderLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Operacional', url: rotas.operacional.index },
        {
          title: 'Ordens de serviço',
          url: rotas.operacional.ordensDeServico
        }
      ]}
    >
      <div />
      <serviceOrders.Update />
    </templates.Base>
  )
}
