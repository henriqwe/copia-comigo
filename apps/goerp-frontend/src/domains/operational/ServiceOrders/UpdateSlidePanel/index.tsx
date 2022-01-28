import * as blocks from '@comigo/ui-blocks'
import * as serviceOrders from '&erp/domains/operational/ServiceOrders'

export function UpdateSlidePanel() {
  const { slidePanelState, setSlidePanelState } = serviceOrders.useUpdate()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'schedule' ? 'Agendar OS' : 'Atividades da OS'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'schedule' ? (
          <serviceOrders.Schedule />
        ) : (
          <serviceOrders.Activities />
        )
      }
    />
  )
}
