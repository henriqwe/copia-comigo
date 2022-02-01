import * as blocks from '&test/components/blocks'
import * as clients from '&test/components/domains/erp/clients'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = clients.useUpdate()
  let title = ''
  let component = <div />
  switch (slidePanelState.type) {
    case 'ownership':
      title = 'Mudar titularidade dos veículos'
      component = <clients.ChangeOwnership />
      break
    case 'vehicle':
      title = 'Trocar veículos'
      component = <clients.ChangeVehicle />
      break
    case 'proposal':
      title = 'Criar novo veículo'
      component = <clients.CreateProposal />
      break
  }
  return (
    <blocks.Modal
      title={title}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={component}
    />
  )
}
