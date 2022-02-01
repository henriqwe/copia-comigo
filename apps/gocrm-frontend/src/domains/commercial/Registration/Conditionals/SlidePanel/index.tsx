import * as blocks from '@comigo/ui-blocks'
import * as conditionals from '&crm/domains/commercial/Registration/Conditionals'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = conditionals.useConditional()
  return (
    <blocks.SlidePanel
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar Condicional'
          : 'Editar Condicional'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <conditionals.Create />
        ) : (
          <conditionals.Update />
        )
      }
    />
  )
}
