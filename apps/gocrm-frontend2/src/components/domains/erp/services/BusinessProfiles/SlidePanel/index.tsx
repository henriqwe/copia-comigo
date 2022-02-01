import * as blocks from '&test/components/blocks'
import * as businessProfiles from '&test/components/domains/erp/services/BusinessProfiles'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } =
    businessProfiles.useBusinessProfile()
  return (
    <blocks.Modal
      title={'Editar Perfil comercial'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<businessProfiles.Update />}
    />
  )
}
