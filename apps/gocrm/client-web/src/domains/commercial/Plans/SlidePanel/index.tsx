import * as blocks from '@comigo/ui-blocks';
import * as plans from '&crm/domains/commercial/Plans'

export function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = plans.useList();
  return (
    <blocks.SlidePanel
      title={'Cadastrar Plano'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<plans.CreatePlan />}
    />
  );
}
