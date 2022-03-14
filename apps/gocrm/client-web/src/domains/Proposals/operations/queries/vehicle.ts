import { useTypedClientQuery } from '&crm/graphql/generated/zeus/apollo'

export async function getVehicleById(Id: string) {
  const { data } = await useTypedClientQuery(
    {
      clientes_Veiculos_by_pk: [
        { Id },
        {
          Id: true,
          Apelido: true,
          Placa: true,
          NumeroDoChassi: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )
  return data.clientes_Veiculos_by_pk
}
