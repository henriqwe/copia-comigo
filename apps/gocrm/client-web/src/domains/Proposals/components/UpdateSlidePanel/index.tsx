import * as blocks from '@comigo/ui-blocks'
import * as proposals from '../../'

export function UpdateSlidePanel() {
  const { slidePanelState, setSlidePanelState } = proposals.useUpdate()

  let title = ''
  let component = <div />
  switch (slidePanelState.type) {
    case 'proposalService':
      title = 'Adicionar Serviço'
      component = <proposals.CreateProposalService />
      break
    case 'proposalProduct':
      title = 'Adicionar Produto'
      component = <proposals.CreateProposalProducts />
      break
    case 'proposalPlan':
      title = 'Adicionar Plano'
      component = <proposals.CreateProposalPlans />
      break
    case 'proposalCombo':
      title = 'Adicionar Combo'
      component = <proposals.CreateProposalCombos />
      break
    case 'proposalVehicle':
      title = 'Vincular veículo'
      component = <proposals.CreateProposalVehicle />
      break
    case 'createVehicle':
      title = 'Cadastrar veículo'
      component = <proposals.CreateVehicle />
      break
    case 'paymentType':
    case 'clientPaymentType':
      title = 'Trocar tipo de pagamento'
      component = <proposals.SelectPaymentType />
      break
    case 'linkClient':
      title = 'Víncular cliente existente'
      component = <proposals.LinkCliente />
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
