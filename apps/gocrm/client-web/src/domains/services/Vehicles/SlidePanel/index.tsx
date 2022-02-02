import * as blocks from '@comigo/ui-blocks';
import * as vehicles from '&crm/domains/services/Vehicles';

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = vehicles.useVehicle();
  return (
    <blocks.SlidePanel
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar Veículo'
          : 'Editar Veículo'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <vehicles.Create />
        ) : (
          <vehicles.Update />
        )
      }
    />
  );
}
