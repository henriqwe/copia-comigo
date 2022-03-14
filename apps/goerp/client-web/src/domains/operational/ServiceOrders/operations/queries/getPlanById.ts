import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'

export async function getPlanById(planId: string, priceId: string) {
  const { data } = await useTypedClientQuery({
    comercial_Planos_by_pk: [
      {
        Id: planId
      },
      {
        Nome: true,
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
    comercial_Planos_Precos_by_pk: [
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
    plan: data.comercial_Planos_by_pk,
    price: data.comercial_Planos_Precos_by_pk
  }
}
