import * as blocks from '&test/components/blocks'
import * as services from '&test/components/domains/erp/commercial/Services/Tabs/Services'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = services.useService()
  return (
    <blocks.Modal
      title={'Cadastrar Serviço'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<services.Create />}
    />
  )
}
