import { ProposalPlanType } from './proposalPlan'
import { ProposalProductType } from './proposalProduct'
import { ProposalServiceType } from './proposalService'
import { ProposalsVehicleDataType } from './proposalVehicle'

export type ProposalsDataType = {
  Lead_Id?: string
  Situacao: {
    Comentario: string
  }
  FormaDePagamentoDaAdesao_Id?: string
  Cliente_Id?: string
  PropostaGerada: boolean
  RegrasETermosDeUsos: {
    Id: string
    Informado: boolean
    ProdutoRegrasETermosDeUso?: {
      Produto_Id: string
      Mensagem: string
    }
    ServicoRegrasETermosDeUso?: {
      Servico_Id: string
      Mensagem: string
    }
  }[]

  Planos: ProposalPlanType[]

  Servicos: ProposalServiceType[]

  Produtos: ProposalProductType[]

  Combos: {
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

  Veiculos: ProposalsVehicleDataType[]
}
