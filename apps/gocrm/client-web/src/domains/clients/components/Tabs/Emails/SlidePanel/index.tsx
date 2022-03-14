import * as blocks from '@comigo/ui-blocks'
import * as emails from '&crm/domains/clients/components/Tabs/Emails'

export function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = emails.useEmail()
  return (
    <blocks.SlidePanel
      title={
        slidePanelState.type === 'create' ? 'Cadastrar email' : 'Editar email'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <emails.Create />
        ) : (
          <emails.Update />
        )
      }
    />
  )
}
