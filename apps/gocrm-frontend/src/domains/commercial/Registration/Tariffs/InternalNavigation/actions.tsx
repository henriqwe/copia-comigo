import * as tariffs from '&crm/domains/commercial/Registration/Tariffs'

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
