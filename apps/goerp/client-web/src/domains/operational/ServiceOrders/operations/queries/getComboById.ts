import { order_by } from "&erp/graphql/generated/zeus"
import { useTypedClientQuery } from "&erp/graphql/generated/zeus/apollo"

export async function getComboById(comboId: string, priceId: string) {
  const { data } = await useTypedClientQuery({
    comercial_Combos_by_pk: [
      {
        Id: comboId
      },
      {
        Nome: true,
        Precos: [
          {
            order_by: [{ created_at: order_by.desc }],
            where: { deleted_at: { _is_null: true } }
          },
          {
            ValorDeAdesao: true,
            ValorDeRecorrencia: true
          }
        ]
      }
    ],
    comercial_Combos_Precos_by_pk: [
      {
        Id: priceId
      },
      {
        ValorDeAdesao: true,
        ValorDeRecorrencia: true
      }
    ]
  })

  return {
    combo: data.comercial_Combos_by_pk,
    price: data.comercial_Combos_Precos_by_pk
  }
}
