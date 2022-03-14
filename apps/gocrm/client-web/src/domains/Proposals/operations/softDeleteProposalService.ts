import { useTypedClientMutation } from '&crm/graphql/generated/zeus/apollo'

type SoftDeleteProposalServiceProps = {
  Id: string
}

export async function softDeleteProposalService({
  Id
}: SoftDeleteProposalServiceProps) {
  const response = await useTypedClientMutation({
    update_propostas_Propostas_Servicos_by_pk: [
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
        Servico_Id: true
      }
    ]
  })

  await useTypedClientMutation({
    update_propostas_Propostas_RegrasETermosDeUso: [
      {
        where: {
          ServicoRegrasETermosDeUso: {
            Servico_Id: {
              _eq: response.data.update_propostas_Propostas_Servicos_by_pk
                .Servico_Id
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
