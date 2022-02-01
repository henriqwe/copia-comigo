import * as blocks from '@comigo/ui-blocks'
import * as tariffs from '&crm/domains/commercial/Registration/Tariffs'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = tariffs.useTariffs()
  return (
    <blocks.SlidePanel
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
