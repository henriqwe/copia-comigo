import * as blocks from '@comigo/ui-blocks';
import * as contracts from '&crm/domains/commercial/Contracts';

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = contracts.useContract();
  return (
    <blocks.SlidePanel
      title={'Cadastrar Contrato'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<contracts.Create />}
    />
  );
}
