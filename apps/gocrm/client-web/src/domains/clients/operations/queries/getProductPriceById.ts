import { useTypedClientQuery } from "&crm/graphql/generated/zeus/apollo"

export async function getProductPriceById(priceId: string) {
  const { data } = await useTypedClientQuery({
    comercial_PrestadoresDeServicos_Produtos_Precos_by_pk: [
      {
        Id: priceId
      },
      {
        Id: true,
        Valor: true,
        TipoDePreco: { Valor: true }
      }
    ]
  })

  return data.comercial_PrestadoresDeServicos_Produtos_Precos_by_pk
}