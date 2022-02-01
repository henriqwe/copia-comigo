import * as blocks from '@comigo/ui-blocks'
import * as identifiers from '&erp/domains/production/identifiable/Identifiers'

export function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = identifiers.useIdentifier()
  return (
    <blocks.SlidePanel
      title={'Editar Identificador'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<identifiers.Update />}
    />
  )
}
