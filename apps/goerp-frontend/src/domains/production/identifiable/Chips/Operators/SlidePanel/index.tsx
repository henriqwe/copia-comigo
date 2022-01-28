import * as blocks from '@comigo/ui-blocks'
import * as operators from '&erp/domains/production/identifiable/Chips/Operators'

export function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = operators.useOperator()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar Operadora'
          : 'Editar Operadora'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <operators.Create />
        ) : (
          <operators.Update />
        )
      }
    />
  )
}
