import * as blocks from '@/blocks'
import * as serviceOrders from '@/domains/erp/operational/ServiceOrders'

export default function UpdateSlidePanel() {
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
