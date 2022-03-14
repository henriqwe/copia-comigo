import { ProposalProductType } from './proposalProduct'
import { ProposalServiceType } from './proposalService'

export type ProposalPlanType = {
  Id: string
  PropostaCombo_Id?: string
  Plano: {
    Id: string
    Nome: string
  }
  PlanoPreco?: {
    Id: string
    ValorDeAdesao: string
    ValorDeRecorrencia: string
  }
  PropostasServicos: ProposalServiceType[]
  PropostasProdutos: ProposalProductType[]
}
