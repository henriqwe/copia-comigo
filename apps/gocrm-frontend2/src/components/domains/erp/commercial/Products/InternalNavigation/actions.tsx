import * as products from '&test/components/domains/erp/commercial/Products'

export function Actions() {
  const { setSlidePanelState } = products.useProduct()
  const actions = [
    {
      title: 'Produto',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true })
      }
    }
  ]
  return actions
}
