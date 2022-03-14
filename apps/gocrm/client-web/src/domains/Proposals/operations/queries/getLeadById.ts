import { useTypedClientQuery } from '&crm/graphql/generated/zeus/apollo'

export async function getLeadById(Id: string) {
  const { data } = await useTypedClientQuery(
    {
      clientes_Leads_by_pk: [
        { Id },
        {
          Id: true,
          Nome: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )
  return data.clientes_Leads_by_pk
}
