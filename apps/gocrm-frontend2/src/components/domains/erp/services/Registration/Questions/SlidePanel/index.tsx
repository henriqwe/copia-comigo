import * as blocks from '&test/components/blocks'
import * as questions from '&test/components/domains/erp/services/Registration/Questions'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = questions.useQuestion()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar Pergunta'
          : 'Editar Pergunta'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <questions.Create />
        ) : (
          <questions.Update />
        )
      }
    />
  )
}
