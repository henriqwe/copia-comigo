import { v4 as uuid } from 'uuid'
import * as utils from '@comigo/utils'
import * as mutations from '&crm/domains/clients/operations/mutations'
import * as types from '&crm/domains/clients/types'
import { NextRouter } from 'next/router'
import routes from '&crm/domains/routes'

type CreateVehicleProposalProps = {
  clientData: types.ClientType
  selectedCategory: {
    title: string
    type: string
    id?: number
  }
  userAndTicketData: {
    atendimentos_Tickets?: {
      Id: string
    }[]
    autenticacao_Usuarios?: {
      Id: string
    }[]
  }
  router: NextRouter
}

export async function createVehicleProposal({
  clientData,
  router,
  selectedCategory,
  userAndTicketData
}: CreateVehicleProposalProps) {
  try {
    const vehicle = clientData.VeiculosAtivos.filter(
      (activeVehicle) => activeVehicle.Id === selectedCategory.id.toString()
    )[0]
    const proposalUUID = uuid()
    await mutations
      .createProposal({
        variables: {
          Id: proposalUUID,
          Lead_Id: null,
          Ticket_Id: null,
          Usuario_Id: userAndTicketData?.autenticacao_Usuarios?.[0].Id,
          Cliente_Id: router.query.id as string,
          veiculosData: [
            {
              Veiculo_Id: vehicle.Veiculo.Id
            }
          ]
          // oportunidadesData: []
        }
      })
      .then((response) => {
        router.push(
          routes.propostas +
            '/' +
            response?.data.insert_propostas_Propostas_one.Id +
            '?origin=activeVehicleProposal'
        )
        utils.notification('Proposta criada com sucesso', 'success')
      })
  } catch (err: any) {
    utils.showError(err)
  }
  return
}
