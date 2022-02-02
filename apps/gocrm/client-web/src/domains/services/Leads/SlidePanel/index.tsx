import * as blocks from '@comigo/ui-blocks';
import * as leads from '&crm/domains/services/Leads';

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = leads.useLead();
  return (
    <blocks.SlidePanel
      title={
        slidePanelState.type === 'create' ? 'Cadastrar Lead' : 'Editar Lead'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? <leads.Create /> : <leads.Update />
      }
    />
  );
}
