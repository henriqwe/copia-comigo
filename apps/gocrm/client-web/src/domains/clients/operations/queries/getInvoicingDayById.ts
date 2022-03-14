import { useTypedClientQuery } from '&crm/graphql/generated/zeus/apollo'

export async function getInvoicingDayById(Valor: string) {
  const { data } = await useTypedClientQuery(
    {
      vendas_DiasDeFaturamento_by_pk: [
        { Valor },
        {
          Valor: true,
          Comentario: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )
  return data.vendas_DiasDeFaturamento_by_pk
}
