import * as contracts from '&test/components/domains/erp/commercial/Contracts'

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
