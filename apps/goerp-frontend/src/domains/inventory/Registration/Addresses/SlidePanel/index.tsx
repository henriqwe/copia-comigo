import * as blocks from '@comigo/ui-blocks'
import * as addresses from '&erp/domains/inventory/Registration/Addresses'

export function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = addresses.useAddressing()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar Endereçamento'
          : 'Editar Endereçamento'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <addresses.Create />
        ) : (
          <addresses.Update />
        )
      }
    />
  )
}
