import { useTypedClientQuery } from '&crm/graphql/generated/zeus/apollo'
import { ActiveVehicleDataType } from '../types/activeVehicle'

export const getActiveVehicleById: (
  Veiculo_Id: string
) => Promise<ActiveVehicleDataType[]> = async (Veiculo_Id: string) => {
  const { data } = await useTypedClientQuery({
    clientes_VeiculosAtivos: [
      {
        where: {
          deleted_at: { _is_null: true },
          Veiculo_Id: { _eq: Veiculo_Id }
          // Situacao: { Valor: { _eq: 'ativo' } }
        }
      },
      {
        Id: true,
        Cliente_Id: true,
        Franquia_Id: true,
        OS_Id: true,
        Situacao: {
          Valor: true
        },
        Beneficios: [
          { where: { deleted_at: { _is_null: true }, Ativo: { _eq: true } } },
          {
            Id: true,
            Portfolio_Id: true,
            PortfolioPreco_Id: true,
            TipoPortfolio: true,
            PrecoDeAdesao_Id: true,
            PrecoDeRecorrencia_Id: true
          }
        ],
        Produtos: [
          { where: { deleted_at: { _is_null: true }, Ativo: { _eq: true } } },
          {
            Id: true,
            Ativo: true,
            Produto_Id: true,
            PrecoDeAdesao_Id: true,
            PrecoDeRecorrencia_Id: true,
            Identificador: true,
            TipoItem_Id: true
          }
        ],
        Servicos: [
          { where: { deleted_at: { _is_null: true }, Ativo: { _eq: true } } },
          {
            Id: true,
            Ativo: true,
            Servico_Id: true,
            PrecoDeAdesao_Id: true,
            PrecoDeRecorrencia_Id: true
          }
        ]
      }
    ]
  })
  return data.clientes_VeiculosAtivos
}
