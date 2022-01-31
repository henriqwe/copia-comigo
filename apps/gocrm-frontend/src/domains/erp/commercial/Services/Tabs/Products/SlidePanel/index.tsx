import * as blocks from '@/blocks'
import * as products from '&crm/domains/erp/commercial/Services/Tabs/Products'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = products.useProduct()
  return (
    <blocks.Modal
      title={'Cadastrar Produto'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<products.Create />}
    />
  )
}