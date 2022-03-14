import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'

export async function getPlanByIdOnlyId(planId: string) {
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
    ]
  })

  return {
    plan: data.comercial_Planos_by_pk
  }
}
