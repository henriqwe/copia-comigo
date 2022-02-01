import * as blocks from '@comigo/ui-blocks'
import * as representatives from '&crm/domains/identities/Clients/Tabs/Representative'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } =
    representatives.useRepresentative()
  return (
    <blocks.SlidePanel
      title={
        slidePanelState.type === 'create'
          ? 'Cadastro de representante'
          : 'Documentos do representante'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <representatives.Create />
        ) : (
          <representatives.Update />
        )
      }
    />
  )
}
