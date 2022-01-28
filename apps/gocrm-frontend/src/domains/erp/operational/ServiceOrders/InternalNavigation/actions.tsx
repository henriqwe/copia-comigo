import * as serviceOrders from '&crm/domains/erp/operational/ServiceOrders'

export function Actions() {
  const { setSlidePanelState } = serviceOrders.useServiceOrder()
  const actions = [
    {
      title: 'Ordem de Serviço',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true })
      }
    }
  ]
  return actions
}
