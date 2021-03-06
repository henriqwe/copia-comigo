import * as blocks from '@comigo/ui-blocks'
import * as collaborators from '&crm/domains/Collaborators'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } =
    collaborators.useCollaborator()
  return (
    <blocks.SlidePanel
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
