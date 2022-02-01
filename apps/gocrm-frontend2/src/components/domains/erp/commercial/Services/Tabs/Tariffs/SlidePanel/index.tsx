import * as blocks from '&test/components/blocks'
import * as tariffs from '&test/components/domains/erp/commercial/Services/Tabs/Tariffs'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = tariffs.useTariff()
  return (
    <blocks.Modal
      title={'Cadastrar Tarifa'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<tariffs.Create />}
    />
  )
}
