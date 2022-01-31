import * as action from '&crm/domains/services/Registration/Actions'

export function Actions() {
  const { setSlidePanelState } = action.useAction()
  const actions = [
    {
      title: 'Ação',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'create' })
      }
    }
  ]
  return actions
}
