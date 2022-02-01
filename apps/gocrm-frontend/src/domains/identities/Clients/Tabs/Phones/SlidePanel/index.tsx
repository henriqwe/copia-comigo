import * as blocks from '@comigo/ui-blocks'
import * as phones from '&crm/domains/identities/Clients/Tabs/Phones'

export default function SlideLateral() {
  const { slidePanelState, setSlidePanelState } = phones.usePhone()
  return (
    <blocks.SlidePanel
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar telefone'
          : 'Editar telefone'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <phones.Create />
        ) : (
          <phones.Update />
        )
      }
    />
  )
}
