export type ProposalProductType = {
  Id: string
  Quantidade: number
  PropostaCombo_Id?: string
  PropostaPlano_Id?: string
  Produto: { Id: string; Nome: string }
  PrecoAdesao?: {
    Id: string
    Valor: string
    TipoDePreco?: { Valor: string }
  }
  PrecoRecorrencia?: {
    Id: string
    Valor: string
    TipoDePreco?: { Valor: string }
  }
}
