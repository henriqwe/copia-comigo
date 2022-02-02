import * as blocks from '@comigo/ui-blocks';
import * as tariffs from '&crm/domains/commercial/Services/Tabs/Tariffs';

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = tariffs.useTariff();
  return (
    <blocks.SlidePanel
      title={'Cadastrar Tarifa'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<tariffs.Create />}
    />
  );
}
