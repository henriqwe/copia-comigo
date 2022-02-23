import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateActiveVehicleBenefitProps = {
  Id: string
  PortfolioPreco_Id: string
  PrecoDeAdesao_Id: string,
  PrecoDeRecorrencia_Id: string
}

export async function updateActiveVehicleBenefit({
  Id,
  PortfolioPreco_Id,
  PrecoDeAdesao_Id,
  PrecoDeRecorrencia_Id
}: UpdateActiveVehicleBenefitProps) {
  useTypedClientMutation({
    update_clientes_VeiculosAtivos_Beneficios_by_pk: [
      {
        pk_columns: {
          Id
        },
        _set: {
          PortfolioPreco_Id,
          PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id,
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })
}
