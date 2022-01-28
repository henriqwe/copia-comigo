import * as blocks from '@comigo/ui-blocks'
import * as services from '&erp/domains/portfolio/Pricing/Tabs/Services'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = services.useService()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'tariff'
          ? 'Vincular tarifa para o serviço'
          : 'Precificar serviço'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'tariff' ? (
          <services.Tariff />
        ) : (
          <services.Price />
        )
      }
    />
  )
}
