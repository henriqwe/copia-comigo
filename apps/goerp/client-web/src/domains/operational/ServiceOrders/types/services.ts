export type Services = {
  Id: string
  Servico?: {
    Id: string
    Nome: string
    GeraOS: boolean
  }
  Beneficio: boolean
  PrecoDeAdesao_Id?: string
  PrecoDeRecorrencia_Id?: string
  OrdemDeServicoCombo_Id?: string
  OrdemDeServicoPlano_Id?: string
}
