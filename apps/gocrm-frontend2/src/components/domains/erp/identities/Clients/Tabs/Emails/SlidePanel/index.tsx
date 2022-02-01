import * as blocks from '&test/components/blocks'
import * as emails from '&test/components/domains/erp/identities/Clients/Tabs/Emails'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = emails.useEmail()
  return (
    <blocks.Modal
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
