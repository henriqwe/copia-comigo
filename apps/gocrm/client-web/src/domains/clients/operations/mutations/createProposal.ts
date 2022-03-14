import { propostas_Propostas_Situacoes_enum } from '&crm/graphql/generated/zeus'
import { useTypedClientMutation, $ } from '&crm/graphql/generated/zeus/apollo'

type CreateProposalProps = {
  variables: {
    Id: string
    veiculosData: unknown
    Lead_Id: string
    Ticket_Id: string
    Usuario_Id: string
    Cliente_Id: string
    combosData?: unknown[]
    planosData?: unknown[]
    produtosData?: unknown[]
    servicosData?: unknown[]
  }
}

export async function createProposal({ variables }: CreateProposalProps) {
  return await useTypedClientMutation(
    {
      insert_propostas_Propostas_one: [
        {
          object: {
            Id: variables.Id,
            Veiculos: {
              data: $`veiculosData`
            },
            Lead_Id: variables.Lead_Id,
            Ticket_Id: variables.Ticket_Id,
            Usuario_Id: variables.Usuario_Id,
            Situacao_Id: propostas_Propostas_Situacoes_enum.criado,
            Cliente_Id: variables.Cliente_Id,
            Combos: {
              data: variables.combosData || []
            },
            Planos: {
              data: variables.planosData || []
            },
            Produtos: {
              data: variables.produtosData || []
            },
            Servicos: {
              data: variables.servicosData || []
            }
          }
        },
        { Id: true }
      ]
    },
    {
      veiculosData: variables.veiculosData
    }
  )
}
