import * as blocks from '@comigo/ui-blocks'
import * as combos from '../'

export function UpdateSlidePanel() {
  const { slidePanelState, setSlidePanelState } = combos.useView()

  let title = ''
  let component = <div />
  switch (slidePanelState.type) {
    case 'service':
      title = 'Adicionar Serviço'
      component = <combos.CreateComboService />
      break
    case 'product':
      title = 'Adicionar Produto'
      component = <combos.CreateComboProduct />
      break
    case 'plan':
      title = 'Adicionar Plano'
      component = <combos.CreateComboPlan />
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
