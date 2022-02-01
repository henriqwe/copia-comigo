import * as blocks from '&test/components/blocks'
import * as leads from '&test/components/domains/erp/services/Leads'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = leads.useLead()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'create' ? 'Cadastrar Lead' : 'Editar Lead'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? <leads.Create /> : <leads.Update />
      }
    />
  )
}
