import * as blocks from '&test/components/blocks'
import * as upSelling from '&test/components/domains/erp/commercial/Products/Tabs/UpSelling'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = upSelling.useUpSelling()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar Oportunidade'
          : 'Editar Oportunidade'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <upSelling.Create />
        ) : (
          <upSelling.Update />
        )
      }
    />
  )
}