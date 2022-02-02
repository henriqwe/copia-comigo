import * as blocks from '@comigo/ui-blocks';
import * as clients from '&crm/domains/clients';

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = clients.useUpdate();
  let title = '';
  let component = <div />;
  switch (slidePanelState.type) {
    case 'ownership':
      title = 'Mudar titularidade dos veículos';
      component = <clients.ChangeOwnership />;
      break;
    case 'vehicle':
      title = 'Trocar veículos';
      component = <clients.ChangeVehicle />;
      break;
    case 'proposal':
      title = 'Criar novo veículo';
      component = <clients.CreateProposal />;
      break;
  }
  return (
    <blocks.SlidePanel
      title={title}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={component}
    />
  );
}
