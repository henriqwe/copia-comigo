import * as blocks from '@comigo/ui-blocks'
import * as products from '&crm/domains/commercial/Products'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = products.useProduct()
  return (
    <blocks.SlidePanel
      title={'Cadastrar Produto'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<products.Create />}
    />
  )
}
