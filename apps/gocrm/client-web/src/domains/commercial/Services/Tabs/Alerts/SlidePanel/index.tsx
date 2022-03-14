import * as blocks from '@comigo/ui-blocks'
import * as alerts from '&crm/domains/commercial/Services/Tabs/Alerts'

export function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = alerts.useAlerts()
  return (
    <blocks.SlidePanel
      title={'Cadastrar Regra e termo de uso'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<alerts.Create />}
    />
  )
}
