import * as combos from '&crm/domains/commercial/Combos'

export function Actions() {
  const { setSlidePanelState } = combos.useList()
  const actions = [
    {
      title: 'Combo',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true })
      }
    }
  ]
  return actions
}
