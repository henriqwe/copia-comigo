import * as blocks from '@comigo/ui-blocks'
import * as addressingTypes from '&crm/domains/inventory/Registration/Addresses/AddressingTypes'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } =
    addressingTypes.useAddressingType()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar Tipo de Endereçamento'
          : 'Editar Tipo de Endereçamento'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <addressingTypes.Create />
        ) : (
          <addressingTypes.Update />
        )
      }
    />
  )
}