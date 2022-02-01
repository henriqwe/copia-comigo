import * as blocks from '&test/components/blocks'
import * as tariffs from '&test/components/domains/erp/commercial/Registration/Tariffs'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = tariffs.useTariffs()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'create' ? 'Cadastrar Tarifa' : 'Editar Tarifa'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <tariffs.Create />
        ) : (
          <tariffs.Update />
        )
      }
    />
  )
}