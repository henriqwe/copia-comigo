import * as blocks from '@comigo/ui-blocks'
import * as products from '&crm/domains/commercial/Providers/Tabs/Products'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = products.useProduct()
  return (
    <blocks.SlidePanel
      title={'Precificar produto'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<products.Price />}
    />
  )
}
