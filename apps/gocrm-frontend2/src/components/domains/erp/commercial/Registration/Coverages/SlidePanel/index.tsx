import * as blocks from '&test/components/blocks'
import * as coverages from '&test/components/domains/erp/commercial/Registration/Coverages'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = coverages.useCoverage()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar Cobertura'
          : 'Editar Cobertura'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <coverages.Create />
        ) : (
          <coverages.Update />
        )
      }
    />
  )
}
