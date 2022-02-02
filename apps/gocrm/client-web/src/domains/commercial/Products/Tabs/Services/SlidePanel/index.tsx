import * as blocks from '@comigo/ui-blocks';
import * as services from '&crm/domains/commercial/Products/Tabs/Services';

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = services.useService();
  return (
    <blocks.SlidePanel
      title={'Cadastrar Serviço'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<services.Create />}
    />
  );
}
