import rotas from 'domains/routes'

import * as serviceOrders from '@/domains/erp/operational/ServiceOrders'
import BaseTemplate from '@/templates/Base'

export default function UpdateServiceOrder() {
  return (
    <serviceOrders.UpdateProvider>
      <Page />
    </serviceOrders.UpdateProvider>
  )
}

function Page() {
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
    <BaseTemplate
      title={`OS: ${serviceOrderData?.CodigoIdentificador}`}
      reload={{
        action: refetch,
        state: serviceOrderLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Operacional', url: rotas.erp.operacional.index },
        {
          title: 'Ordens de serviço',
          url: rotas.erp.operacional.ordensDeServico
        }
      ]}
    >
      <serviceOrders.Update />
    </BaseTemplate>
  )
}
