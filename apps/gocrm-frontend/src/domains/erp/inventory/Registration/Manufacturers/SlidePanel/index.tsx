import * as blocks from '@/blocks'
import * as manufacturers from '&crm/domains/erp/inventory/Registration/Manufacturers'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } =
    manufacturers.useManufacturer()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar Fabricante'
          : 'Editar Fabricante'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <manufacturers.Create />
        ) : (
          <manufacturers.Update />
        )
      }
    />
  )
}
