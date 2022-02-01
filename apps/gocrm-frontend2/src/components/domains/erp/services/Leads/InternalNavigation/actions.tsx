import * as leads from '&test/components/domains/erp/services/Leads'

export function Actions() {
  const { setSlidePanelState } = leads.useLead()
  const actions = [
    {
      title: 'Leads',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'create' })
      }
    }
  ]
  return actions
}
