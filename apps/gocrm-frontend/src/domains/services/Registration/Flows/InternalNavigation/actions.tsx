import * as flows from '&crm/domains/services/Registration/Flows'

export function Actions() {
  const { setSlidePanelState } = flows.useFlow()
  const actions = [
    {
      title: 'Fluxo',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'create' })
      }
    }
  ]
  return actions
}
