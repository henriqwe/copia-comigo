import { useTypedClientQuery } from '&crm/graphql/generated/zeus/apollo'

export async function getPlanById(planId: string, priceId: string) {
  let price: {
    comercial_Planos_Precos_by_pk?: {
      ValorDeAdesao: string
      ValorDeRecorrencia: string
      Id: string
    }
  } = {
    comercial_Planos_Precos_by_pk: null
  }
  const { data } = await useTypedClientQuery({
    comercial_Planos_by_pk: [
      {
        Id: planId
      },
      {
        Id: true,
        Nome: true
      }
    ]
  })

  if (priceId) {
    const { data: priceData } = await useTypedClientQuery({
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
    price = priceData
  }

  return {
    plan: data.comercial_Planos_by_pk,
    price: price?.comercial_Planos_Precos_by_pk
  }
}
