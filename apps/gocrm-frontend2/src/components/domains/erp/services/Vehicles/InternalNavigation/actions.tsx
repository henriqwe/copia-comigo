import * as vehicles from '&test/components/domains/erp/services/Vehicles'

export function Actions() {
  const { setSlidePanelState } = vehicles.useVehicle()
  const actions = [
    {
      title: 'Veículo',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'create' })
      }
    }
  ]
  return actions
}
