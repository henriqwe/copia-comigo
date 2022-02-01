import * as blocks from '&test/components/blocks'
import * as attributes from '&test/components/domains/erp/commercial/Products/Tabs/Attributes'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = attributes.useAttribute()
  return (
    <blocks.Modal
      title={'Cadastrar Atributo'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<attributes.Create />}
    />
  )
}
