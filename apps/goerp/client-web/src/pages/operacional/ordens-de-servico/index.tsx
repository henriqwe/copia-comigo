import * as serviceOrders from '&erp/domains/operational/ServiceOrders'

import rotas from '&erp/domains/routes'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function ServiceOrders() {
  return (
    <serviceOrders.ServiceOrderProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </serviceOrders.ServiceOrderProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { serviceOrdersRefetch, serviceOrdersLoading } =
    serviceOrders.useServiceOrder()
  const refetch = () => {
    serviceOrdersRefetch()
  }
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
      SubMenu={<serviceOrders.InternalNavigation />}
      title="Ordens de Serviço"
      reload={{ action: refetch, state: serviceOrdersLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Operacional', url: rotas.operacional.index },
        {
          title: 'Ordens de serviço',
          url: rotas.operacional.ordensDeServico
        }
      ]}
    >
      <serviceOrders.List />
      <serviceOrders.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
