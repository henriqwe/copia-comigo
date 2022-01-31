import * as contracts from '&crm/domains/commercial/Contracts'

export function Actions() {
  const { setSlidePanelState } = contracts.useContract()
  const actions = [
    {
      title: 'Contrato',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true })
      }
    }
  ]
  return actions
}
