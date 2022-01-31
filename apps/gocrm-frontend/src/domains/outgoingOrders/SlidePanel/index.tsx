import * as blocks from '@comigo/ui-blocks'
import * as outgoingOrders from '&crm/domains/outgoingOrders'

export default function SlidePanel() {
  const { setSlidePanelState, slidePanelState } = outgoingOrders.useUpdate()

  let title = 'Autorizar pedido de saída'
  let content = <outgoingOrders.Authorize />
  if (slidePanelState.type === 'receive') {
    title = 'Receber pedido de saída'
    content = <outgoingOrders.Receive />
  }

  return (
    <blocks.Modal
      title={title}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={content}
    />
  )
}