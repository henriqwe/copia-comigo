import * as clients from '&crm/domains/clients'

export function Actions() {
  const { setSlidePanelState } = clients.useClient()
  const actions = [
    {
      title: 'Cliente',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true })
      }
    }
  ]
  return actions
}
