import { useTypedClientMutation } from '&crm/graphql/generated/zeus/apollo'

type DeleteProposalVehicleProps = {
  Id: string
}

export async function deleteProposalVehicle({
  Id
}: DeleteProposalVehicleProps) {

  await useTypedClientMutation({
    delete_propostas_Propostas_Produtos: [
      {
        where: { PropostaVeiculo_Id: { _eq: Id } }
      },
      {
        affected_rows: true
      }
    ]
  })
  await useTypedClientMutation({
    delete_propostas_Propostas_Servicos: [
      {
        where: { PropostaVeiculo_Id: { _eq: Id } }
      },
      {
        affected_rows: true
      }
    ]
  })

  await useTypedClientMutation({
    delete_propostas_Propostas_Planos: [
      {
        where: { PropostaVeiculo_Id: { _eq: Id } }
      },
      {
        affected_rows: true
      }
    ]
  })

  await useTypedClientMutation({
    delete_propostas_Propostas_Combos: [
      {
        where: { PropostaVeiculo_Id: { _eq: Id } }
      },
      {
        affected_rows: true
      }
    ]
  })

  await useTypedClientMutation({
    delete_propostas_Propostas_Veiculos_by_pk: [
      {
        Id
      },
      {
        Id: true
      }
    ]
  })
}
