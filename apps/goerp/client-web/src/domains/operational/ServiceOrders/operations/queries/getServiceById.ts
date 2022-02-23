import { useTypedClientQuery } from "&erp/graphql/generated/zeus/apollo"
import { getServicePriceById } from "./getServicePriceById"

export async function getServiceById(
  serviceId: string,
  priceId: string,
  secondPriceId?: string
) {
  const { data } = await useTypedClientQuery({
    comercial_Servicos_by_pk: [
      {
        Id: serviceId
      },
      {
        Id: true,
        Nome: true,
        GeraOS: true
      }
    ]
  })

  return {
    service: data.comercial_Servicos_by_pk,
    price: await getServicePriceById(priceId),
    secondPrice: secondPriceId
      ? await getServicePriceById(secondPriceId)
      : undefined
  }
}
