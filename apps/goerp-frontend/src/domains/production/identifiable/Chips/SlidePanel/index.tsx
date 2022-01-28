import * as blocks from '@comigo/ui-blocks'
import * as chips from '&erp/domains/production/identifiable/Chips'

export function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = chips.useChips()
  return (
    <blocks.Modal
      title={'Editar Chip'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<chips.Update />}
    />
  )
}
