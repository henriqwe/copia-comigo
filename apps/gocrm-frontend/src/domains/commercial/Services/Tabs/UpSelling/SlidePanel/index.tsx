import * as blocks from '@comigo/ui-blocks'
import * as upSelling from '&crm/domains/commercial/Services/Tabs/UpSelling'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = upSelling.useUpSelling()
  return (
    <blocks.SlidePanel
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
