import * as manufacturers from '&erp/domains/inventory/Registration/Manufacturers'

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
