import * as blocks from '@comigo/ui-blocks'
import * as addressingTypes from '&erp/domains/inventory/Registration/Addresses/AddressingTypes'

export function SlidePanel() {
  const { slidePanelState, setSlidePanelState } =
    addressingTypes.useAddressingType()
  return (
    <blocks.SlidePanel
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
