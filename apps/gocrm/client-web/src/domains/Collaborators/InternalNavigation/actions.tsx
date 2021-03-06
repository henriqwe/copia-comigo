import * as collaborators from '&crm/domains/Collaborators'

export function Actions() {
  const { setSlidePanelState } = collaborators.useCollaborator()
  const actions = [
    {
      title: 'Colaborador',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'create' })
      }
    }
  ]
  return actions
}
