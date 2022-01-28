import * as operators from '&erp/domains/production/identifiable/Chips/Operators'

export function Actions() {
  const { setSlidePanelState } = operators.useOperator()
  const actions = [
    {
      title: 'Operadoras',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'create' })
      }
    }
  ]
  return actions
}
