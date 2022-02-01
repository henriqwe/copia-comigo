import * as blocks from '&test/components/blocks'
import * as actions from '&test/components/domains/erp/services/Registration/Actions'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = actions.useAction()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'create' ? 'Cadastrar Ação' : 'Editar Ação'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <actions.Create />
        ) : (
          <actions.Update />
        )
      }
    />
  )
}
