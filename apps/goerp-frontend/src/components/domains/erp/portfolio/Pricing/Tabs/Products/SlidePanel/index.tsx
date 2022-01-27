import * as blocks from '@/blocks'
import * as products from '@/domains/erp/portfolio/Pricing/Tabs/Products'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = products.useProduct()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'pricing'
          ? 'Precificar produto'
          : 'Vincular item'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'pricing' ? (
          <products.Price />
        ) : (
          <products.ItemLink />
        )
      }
    />
  )
}
