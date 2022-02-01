import * as blocks from '@comigo/ui-blocks'
import * as flows from '&crm/domains/services/Registration/Flows'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = flows.useFlow()
  return (
    <blocks.SlidePanel
      title={
        slidePanelState.type === 'create' ? 'Cadastrar Fluxo' : 'Editar Fluxo'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? <flows.Create /> : <flows.Update />
      }
    />
  )
}
