export type Products = {
  Id: string
  Quantidade: number
  Produto?: {
    Id: string
    Nome: string
  }
  PrecoDeAdesao_Id?: string
  PrecoDeRecorrencia_Id?: string
  Identificavel_Id?: string
  TipoDeIdentificavel_Id?: string
  OrdemDeServicoCombo_Id?: string
  OrdemDeServicoPlano_Id?: string
}