import * as blocks from '@comigo/ui-blocks'
import * as serviceOrders from '&erp/domains/operational/ServiceOrders'

export function UpdateSlidePanel() {
  const { slidePanelState, setSlidePanelState } = serviceOrders.useUpdate()

  let title = ''
  let component = <div />
  switch (slidePanelState.type) {
    case 'activities':
      title = 'Atividades da OS'
      component = <serviceOrders.Activities />
      break
    case 'giveBack':
      title = 'Devolução de itens'
      component = <serviceOrders.GiveBack />
      break
    case 'schedule':
      title = 'Agendar OS'
      component = <serviceOrders.Schedule />
      break
  }
  return (
    <blocks.SlidePanel
      title={title}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={component}
    />
  )
}
