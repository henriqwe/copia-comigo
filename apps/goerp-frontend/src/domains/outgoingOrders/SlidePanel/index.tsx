import * as blocks from '@comigo/ui-blocks'
import * as outgoingOrders from '&erp/domains/outgoingOrders'

export function SlidePanel() {
  const { setSlidePanelState, slidePanelState } = outgoingOrders.useUpdate()

  let title = 'Autorizar pedido de saída'
  let content = <outgoingOrders.Authorize />
  if (slidePanelState.type === 'receive') {
    title = 'Receber pedido de saída'
    content = <outgoingOrders.Receive />
  }

  return (
    <blocks.SlidePanel
      title={title}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={content}
    />
  )
}
