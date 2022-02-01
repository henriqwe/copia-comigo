import * as blocks from '&test/components/blocks'
import * as combos from '&test/components/domains/erp/commercial/Combos/Tabs/Combos'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = combos.useDependenceCombo()
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
          <combos.Create />
        ) : (
          <combos.Update />
        )
      }
    />
  )
}
