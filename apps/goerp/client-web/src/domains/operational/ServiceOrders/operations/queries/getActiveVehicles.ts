import { useTypedClientQuery } from "&erp/graphql/generated/zeus/apollo"

export async function getActiveVehicles(Cliente_Id: string, Veiculo_Id: string) {
  const { data } = await useTypedClientQuery({
    clientes_VeiculosAtivos: [
      {
        where: {
          deleted_at: { _is_null: true },
          Cliente_Id: { _eq: Cliente_Id },
          Veiculo_Id: { _eq: Veiculo_Id }
        }
      },
      {
        Id: true,
        Situacao: { Valor: true },
        Beneficios: [
          { where: { deleted_at: { _is_null: true } } },
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
          { where: { deleted_at: { _is_null: true } } },
          {
            Id: true,
            Identificador: true,
            TipoItem_Id: true
          }
        ]
      }
    ]
  })

  return data.clientes_VeiculosAtivos
}