import * as tariffs from '&test/components/domains/erp/commercial/Registration/Tariffs'

export function Actions() {
  const { setSlidePanelState } = tariffs.useTariffs()
  const actions = [
    {
      title: 'Tarifa',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'create' })
      }
    }
  ]
  return actions
}
