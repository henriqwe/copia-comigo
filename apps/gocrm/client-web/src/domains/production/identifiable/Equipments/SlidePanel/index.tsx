import * as blocks from '@comigo/ui-blocks';
import * as equipments from '&crm/domains/production/identifiable/Equipments';

export default function SlideLateral() {
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
