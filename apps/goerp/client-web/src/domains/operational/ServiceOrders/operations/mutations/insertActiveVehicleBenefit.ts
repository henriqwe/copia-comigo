import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type InsertActiveVehicleBenefitProps = {
  Portfolio_Id: string
  TipoPortfolio: string
  PortfolioPreco_Id: string
  VeiculoAtivo_Id: string
  PrecoDeAdesao_Id: string
  PrecoDeRecorrencia_Id: string
}

export async function insertActiveVehicleBenefit({
  Portfolio_Id,
  TipoPortfolio,
  PortfolioPreco_Id,
  VeiculoAtivo_Id,
  PrecoDeAdesao_Id,
  PrecoDeRecorrencia_Id
}: InsertActiveVehicleBenefitProps) {
  useTypedClientMutation({
    insert_clientes_VeiculosAtivos_Beneficios_one: [
      {
        object: {
          Portfolio_Id,
          TipoPortfolio,
          PortfolioPreco_Id,
          VeiculoAtivo_Id,
          PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id,
          Ativo: true
        }
      },
      {
        Id: true
      }
    ]
  })
}
