import * as blocks from '&test/components/blocks'
import * as collaborators from '&test/components/domains/erp/identities/Collaborators'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } =
    collaborators.useCollaborator()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar Colaborador'
          : 'Visualizar Colaborador'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <collaborators.Create />
        ) : (
          <collaborators.Update />
        )
      }
    />
  )
}
