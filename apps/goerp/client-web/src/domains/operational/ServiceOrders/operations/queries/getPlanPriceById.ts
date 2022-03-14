import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'

export async function getPlanPriceById(priceId: string): Promise<{
  ValorDeAdesao: string
  ValorDeRecorrencia: string
  Id: string
} | undefined> {
  const { data } = await useTypedClientQuery({
    comercial_Planos_Precos_by_pk: [
      {
        Id: priceId
      },
      {
        Id: true,
        ValorDeAdesao: true,
        ValorDeRecorrencia: true
      }
    ]
  })

  return data.comercial_Planos_Precos_by_pk
}
