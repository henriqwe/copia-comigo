import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'

export async function getClientById(Id: string) {
  const { data } = await useTypedClientQuery(
    {
      identidades_Clientes_by_pk: [
        { Id },
        {
          Id: true,
          Pessoa: {
            DadosDaApi: [{}, true],
            Nome: true
          }
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )
  return data.identidades_Clientes_by_pk
}
