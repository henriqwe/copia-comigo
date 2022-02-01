import * as blocks from '&test/components/blocks'
import * as serivceOrders from '&test/components/domains/erp/operational/ServiceOrders'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } =
    serivceOrders.useServiceOrder()
  return (
    <blocks.Modal
      title={'Cadastrar Ordem de Serviço'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<serivceOrders.Create />}
    />
  )
}
