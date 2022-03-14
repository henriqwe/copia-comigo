import { useTypedClientMutation } from '&crm/graphql/generated/zeus/apollo'

type SoftDeleteProposalPlansProps = {
  Id: string
}

export async function softDeleteProposalPlans({
  Id
}: SoftDeleteProposalPlansProps) {
  const response = await useTypedClientMutation({
    update_propostas_Propostas_Planos_by_pk: [
      {
        pk_columns: {
          Id
        },
        _set: {
          deleted_at: new Date()
        }
      },
      {
        Id: true,
        Plano: {
          Produtos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Produto: {
                Id: true,
                RegrasETermosDeUsos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Id: true
                  }
                ]
              }
            }
          ],
          Servicos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Servico: {
                Id: true,
                RegrasETermosDeUsos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Id: true
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  })
  const data = response.data.update_propostas_Propostas_Planos_by_pk.Plano

  await Promise.all(
    data.Produtos.map(async (product) => {
      if (product.Produto.RegrasETermosDeUsos.length > 0) {
        await useTypedClientMutation({
          update_propostas_Propostas_RegrasETermosDeUso: [
            {
              where: {
                ProdutoRegrasETermosDeUso: {
                  Produto_Id: {
                    _eq: product.Produto.Id
                  }
                }
              },
              _set: {
                deleted_at: new Date()
              }
            },
            {
              affected_rows: true
            }
          ]
        })
      }
    })
  )

  await Promise.all(
    data.Servicos.map(async (service) => {
      if (service.Servico.RegrasETermosDeUsos.length > 0) {
        await useTypedClientMutation({
          update_propostas_Propostas_RegrasETermosDeUso: [
            {
              where: {
                ProdutoRegrasETermosDeUso: {
                  Produto_Id: {
                    _eq: service.Servico.Id
                  }
                }
              },
              _set: {
                deleted_at: new Date()
              }
            },
            {
              affected_rows: true
            }
          ]
        })
      }
    })
  )
}
