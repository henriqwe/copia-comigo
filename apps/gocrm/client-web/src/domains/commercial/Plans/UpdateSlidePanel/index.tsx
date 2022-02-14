import * as blocks from '@comigo/ui-blocks';
import * as plans from '../'

export function UpdateSlidePanel() {
  const { slidePanelState, setSlidePanelState } = plans.useUpdate()

  let title = ''
  let component = <div />
  switch (slidePanelState.type) {
    case 'service':
      title = 'Adicionar Serviço'
      component = <plans.CreatePlanService />
      break
    case 'product':
      title = 'Adicionar Produto'
      component = <plans.CreatePlanProducts />
      break
  }

  return (
    <blocks.SlidePanel
      title={title}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={component}
    />
  );
}
