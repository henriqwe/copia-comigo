import { useTypedClientQuery } from "&crm/graphql/generated/zeus/apollo"
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
    price: priceId ? await getServicePriceById(priceId) : null,
    secondPrice: secondPriceId ? await getServicePriceById(secondPriceId) : null
  }
}
