import { useTypedClientMutation } from '&crm/graphql/generated/zeus/apollo'

type SoftDeleteProposalProductProps = {
  Id: string
}

export async function softDeleteProposalProduct({
  Id
}: SoftDeleteProposalProductProps) {
  const response = await useTypedClientMutation({
    update_propostas_Propostas_Produtos_by_pk: [
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
        Produto_Id: true
      }
    ]
  })
  await useTypedClientMutation({
    update_propostas_Propostas_RegrasETermosDeUso: [
      {
        where: {
          ProdutoRegrasETermosDeUso: {
            Produto_Id: {
              _eq: response.data.update_propostas_Propostas_Produtos_by_pk
                .Produto_Id
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
