import { useTypedClientQuery } from "&crm/graphql/generated/zeus/apollo"

export async function getFormatPaymentById(Valor: string) {
  const { data } = await useTypedClientQuery(
    {
      vendas_TiposDePagamento_by_pk: [
        { Valor },
        {
          Valor: true,
          Comentario: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )
  return data.vendas_TiposDePagamento_by_pk
}