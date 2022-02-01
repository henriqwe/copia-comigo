import * as services from '&test/components/domains/erp/commercial/Services'

export function Actions() {
  const { setSlidePanelState } = services.useService()
  const actions = [
    {
      title: 'Serviço',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'create' })
      }
    }
  ]
  return actions
}