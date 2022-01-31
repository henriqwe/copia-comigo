import * as blocks from '@comigo/ui-blocks'
import * as providers from '&crm/domains/commercial/Providers'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = providers.useProvider()
  return (
    <blocks.Modal
      title={'Cadastrar Parceiro'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<providers.Create />}
    />
  )
}
