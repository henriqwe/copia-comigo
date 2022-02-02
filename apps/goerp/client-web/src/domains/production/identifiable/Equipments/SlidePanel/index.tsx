import * as blocks from '@comigo/ui-blocks';
import * as equipments from '&erp/domains/production/identifiable/Equipments';

export function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = equipments.useEquipment();
  return (
    <blocks.SlidePanel
      title={'Editar Equipamento'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<equipments.Update />}
    />
  );
}
