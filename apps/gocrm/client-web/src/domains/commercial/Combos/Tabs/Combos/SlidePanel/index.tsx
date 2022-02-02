import * as blocks from '@comigo/ui-blocks';
import * as combos from '&crm/domains/commercial/Combos/Tabs/Combos';

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = combos.useDependenceCombo();
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
          <combos.Create />
        ) : (
          <combos.Update />
        )
      }
    />
  );
}
