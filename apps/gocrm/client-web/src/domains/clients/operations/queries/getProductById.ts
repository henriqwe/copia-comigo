import { useTypedClientQuery } from "&crm/graphql/generated/zeus/apollo"
import { getProductPriceById } from "./getProductPriceById"

export async function getProductById(
  productId: string,
  priceId: string,
  secondPriceId?: string
) {
  const { data } = await useTypedClientQuery({
    comercial_Produtos_by_pk: [
      {
        Id: productId
      },
      {
        Id: true,
        Nome: true
      }
    ]
  })

  return {
    product: data.comercial_Produtos_by_pk,
    price: priceId ? await getProductPriceById(priceId) : null,
    secondPrice: secondPriceId ? await getProductPriceById(secondPriceId) : null
  }
}
