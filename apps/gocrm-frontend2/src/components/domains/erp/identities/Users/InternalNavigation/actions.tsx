import * as users from '&test/components/domains/erp/identities/Users'

export function Actions() {
  const { setSlidePanelState } = users.useUser()
  const actions = [
    {
      title: 'Usuário',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'create' })
      }
    }
  ]
  return actions
}
