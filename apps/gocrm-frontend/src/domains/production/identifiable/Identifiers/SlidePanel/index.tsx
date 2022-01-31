import * as blocks from '@comigo/ui-blocks'
import * as identifiers from '&crm/domains/production/identifiable/Identifiers'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = identifiers.useIdentifier()
  return (
    <blocks.Modal
      title={'Editar Identificador'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<identifiers.Update />}
    />
  )
}
