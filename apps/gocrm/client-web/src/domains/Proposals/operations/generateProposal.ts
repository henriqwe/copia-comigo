import { useTypedClientMutation } from '&crm/graphql/generated/zeus/apollo'

type GenerateProposalProps = {
  Id: string
}

export async function generateProposal({
  Id
}: GenerateProposalProps) {
  useTypedClientMutation({
    update_propostas_Propostas_by_pk: [
      {
        pk_columns: {
          Id
        },
        _set: {
          PropostaGerada: true,
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })
}
