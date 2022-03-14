import * as blocks from '@comigo/ui-blocks'
import * as clients from '&crm/domains/clients'

export function UpdateSlidePanel() {
  const { slidePanelState, setSlidePanelState } = clients.useUpdate()
  let title = ''
  let component = <div />
  switch (slidePanelState.type) {
    case 'ownership':
    case 'ownershipSingle':
      title =
        slidePanelState.type === 'ownership'
          ? 'Mudar titularidade dos veículos'
          : 'Mudar titularidade do veículo'
      component = <clients.ChangeOwnership />
      break
    case 'vehicle':
      title = 'Trocar veículos'
      component = <clients.ChangeVehicle />
      break
    case 'proposal':
      title = 'Criar proposta para o novo veículo'
      component = <clients.CreateProposal />
      break
    case 'createVehicle':
      title = 'Criar novo veículo'
      component = <clients.CreateVehicle />
      break
  }
  return (
    <blocks.SlidePanel
      title={title}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={component}
    />
  )
}
