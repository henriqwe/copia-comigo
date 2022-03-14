import * as blocks from '@comigo/ui-blocks'
import * as clients from '&crm/domains/clients'

export function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = clients.useClient()

  return (
    <blocks.SlidePanel
      title={'Cadastrar novo cliente'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<clients.CreateClient />}
    />
  )
}
