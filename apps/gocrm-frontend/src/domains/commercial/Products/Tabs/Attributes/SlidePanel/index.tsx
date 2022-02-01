import * as blocks from '@comigo/ui-blocks'
import * as attributes from '&crm/domains/commercial/Products/Tabs/Attributes'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = attributes.useAttribute()
  return (
    <blocks.SlidePanel
      title={'Cadastrar Atributo'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<attributes.Create />}
    />
  )
}
