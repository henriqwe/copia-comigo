export type ProposalServiceType = {
  Id: string
  PropostaCombo_Id?: string
  PropostaPlano_Id?: string
  Servico: {
    Id: string
    Nome: string
    GeraOS: boolean
  }
  PrecoDeAdesao?: {
    Id: string
    Valor: string
    TipoDePreco?: { Valor: string }
  }
  PrecoDeRecorrencia?: {
    Id: string
    Valor: string
    TipoDePreco?: { Valor: string }
  }
}
