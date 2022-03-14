import { useTypedClientQuery } from '&crm/graphql/generated/zeus/apollo'

export async function getUserByClientId(Id: string) {
  const { data } = await useTypedClientQuery(
    {
      autenticacao_Usuarios: [
        {
          where: { deleted_at: { _is_null: true }, Cliente_Id: { _eq: Id } }
        },
        {
          Id: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )
  return data.autenticacao_Usuarios
}
