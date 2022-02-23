import { clientes_VeiculosAtivos_Situacao_enum } from "&erp/graphql/generated/zeus"
import { useTypedClientQuery } from "&erp/graphql/generated/zeus/apollo"

export async function getClientByVehicle(Id: string) {
  const { data } = await useTypedClientQuery({
    clientes_Veiculos_by_pk: [
      {
        Id
      },
      {
        Id: true,
        VeiculosAtivos: [
          {
            where: {
              Situacao_Id: {
                _eq: clientes_VeiculosAtivos_Situacao_enum.ativo
              }
            }
          },
          {
            Cliente: {
              Id: true,
              Pessoa: {
                Nome: true,
                PessoaJuridica: true,
                Identificador: true,
                DadosDaApi: [{}, true]
              }
            }
          }
        ]
      }
    ]
  })

  return data.clientes_Veiculos_by_pk
}
