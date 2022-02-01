import * as blocks from '@comigo/ui-blocks'
import * as serivceOrders from '&crm/domains/operational/ServiceOrders'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } =
    serivceOrders.useServiceOrder()
  return (
    <blocks.SlidePanel
      title={'Cadastrar Ordem de Serviço'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<serivceOrders.Create />}
    />
  )
}
