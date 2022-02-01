import * as blocks from '@comigo/ui-blocks'
import * as operators from '&crm/domains/production/identifiable/Chips/Operators'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = operators.useOperator()
  return (
    <blocks.SlidePanel
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
