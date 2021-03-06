import * as blocks from '@comigo/ui-blocks';
import * as actions from '&crm/domains/services/Registration/Actions';

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = actions.useAction();
  return (
    <blocks.SlidePanel
      title={
        slidePanelState.type === 'create' ? 'Cadastrar Ação' : 'Editar Ação'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <actions.Create />
        ) : (
          <actions.Update />
        )
      }
    />
  );
}
