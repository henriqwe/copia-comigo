import * as blocks from '@comigo/ui-blocks'
import * as questions from '&crm/domains/services/Registration/Questions'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = questions.useQuestion()
  return (
    <blocks.SlidePanel
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
