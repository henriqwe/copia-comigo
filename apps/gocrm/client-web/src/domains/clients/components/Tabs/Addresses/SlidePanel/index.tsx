import * as blocks from '@comigo/ui-blocks'
import * as addresses from '&crm/domains/clients/components/Tabs/Addresses'

export function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = addresses.useAddress()
  return (
    <blocks.SlidePanel
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar endereço'
          : 'Editar endereço'
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
