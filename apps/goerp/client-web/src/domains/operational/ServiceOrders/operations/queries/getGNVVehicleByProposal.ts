import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'

export async function getGNVVehicleByProposal(Veiculo_Id: string) {
  const { data } = await useTypedClientQuery({
    propostas_Propostas_Veiculos: [
      {
        where: {
          deleted_at: { _is_null: true },
          Veiculo_Id: { _eq: Veiculo_Id }
        }
      },
      {
        PossuiGNV: true
      }
    ]
  })

  return data.propostas_Propostas_Veiculos
}
