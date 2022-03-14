import { useTypedClientQuery } from "&crm/graphql/generated/zeus/apollo"

export async function getComboById(comboId: string, priceId: string) {
  const { data } = await useTypedClientQuery({
    comercial_Combos_by_pk: [
      {
        Id: comboId
      },
      {
        Id: true,
        Nome: true,
        Planos: [
          { where: { deleted_at: { _is_null: true } } },
          {
            Plano_Id: true
          }
        ],
        Produtos: [
          { where: { deleted_at: { _is_null: true } } },
          {
            Produto_Id: true
          }
        ],
        Servicos: [
          { where: { deleted_at: { _is_null: true } } },
          {
            Servico_Id: true
          }
        ]
      }
    ],
    comercial_Combos_Precos_by_pk: [
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

  return {
    combo: data.comercial_Combos_by_pk,
    price: data.comercial_Combos_Precos_by_pk
  }
}
