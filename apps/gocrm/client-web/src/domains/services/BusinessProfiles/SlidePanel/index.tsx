import * as blocks from '@comigo/ui-blocks';
import * as businessProfiles from '&crm/domains/services/BusinessProfiles';

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } =
    businessProfiles.useBusinessProfile();
  return (
    <blocks.SlidePanel
      title={'Editar Perfil comercial'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<businessProfiles.Update />}
    />
  );
}
