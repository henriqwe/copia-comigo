import * as manufacturers from '&crm/domains/inventory/Registration/Manufacturers'

export function Actions() {
  const { setSlidePanelState } = manufacturers.useManufacturer()
  const actions = [
    {
      title: 'Fabricante',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'create' })
      }
    }
  ]
  return actions
}
