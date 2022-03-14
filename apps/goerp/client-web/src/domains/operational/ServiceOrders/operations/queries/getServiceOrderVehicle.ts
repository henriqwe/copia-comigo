import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'

export async function getServiceOrderVehicle(Id: string) {
  const { data } = await useTypedClientQuery({
    clientes_Veiculos_by_pk: [
      {
        Id
      },
      {
        Id: true,
        Placa: true,
        NumeroDoChassi: true,
        Apelido: true,
        DadosDaApi: [{}, true],
        VeiculosAtivos: [
          {
            where: {
              deleted_at: { _is_null: true }
            }
          },
          { PossuiGNV: true }
        ]
      }
    ]
  })

  return data.clientes_Veiculos_by_pk
}
