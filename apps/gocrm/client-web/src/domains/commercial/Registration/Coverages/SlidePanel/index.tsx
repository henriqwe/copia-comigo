import * as blocks from '@comigo/ui-blocks';
import * as coverages from '&crm/domains/commercial/Registration/Coverages';

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = coverages.useCoverage();
  return (
    <blocks.SlidePanel
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
  );
}
