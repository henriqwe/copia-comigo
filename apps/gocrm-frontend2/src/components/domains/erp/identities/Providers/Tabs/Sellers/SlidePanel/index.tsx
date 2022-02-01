import * as blocks from '&test/components/blocks'
import * as sellers from '&test/components/domains/erp/identities/Providers/Tabs/Sellers'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = sellers.useSeller()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar vendedor'
          : 'Editar vendedor'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <sellers.Create />
        ) : (
          <sellers.Update />
        )
      }
    />
  )
}
