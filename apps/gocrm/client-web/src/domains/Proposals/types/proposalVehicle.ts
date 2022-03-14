import { ProposalPlanType } from './proposalPlan'
import { ProposalProductType } from './proposalProduct'
import { ProposalServiceType } from './proposalService'

export type ProposalsVehicleDataType = {
  Id: string
  Veiculo_Id?: string
  PossuiGNV: boolean

  PropostasServicos: ProposalServiceType[]

  PropostasProdutos: ProposalProductType[]

  PropostasPlanos: ProposalPlanType[]

  PropostasCombos: {
    Id: string
    Combo: {
      Id: string
      Nome: string
    }
    ComboPreco: {
      Id: string
      ValorDeAdesao: string
      ValorDeRecorrencia: string
    }
    PropostasPlanos: ProposalPlanType[]
    PropostasServicos: ProposalServiceType[]
    PropostasProdutos: ProposalProductType[]
  }[]
}
