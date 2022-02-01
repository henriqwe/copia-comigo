import * as blocks from '@comigo/ui-blocks'
import * as chips from '&crm/domains/production/identifiable/Chips'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = chips.useChips()
  return (
    <blocks.SlidePanel
      title={'Editar Chip'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<chips.Update />}
    />
  )
}
