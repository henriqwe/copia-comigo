import * as blocks from '&test/components/blocks'
import * as conditionals from '&test/components/domains/erp/commercial/Registration/Conditionals'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = conditionals.useConditional()
  return (
    <blocks.Modal
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
