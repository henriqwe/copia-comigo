import * as blocks from '@comigo/ui-blocks'
import * as combos from '&crm/domains/commercial/Combos'

export function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = combos.useList()
  return (
    <blocks.SlidePanel
      title={'Cadastrar Combo'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<combos.CreateCombo />}
    />
  )
}
