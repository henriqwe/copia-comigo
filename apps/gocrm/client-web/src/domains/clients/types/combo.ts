import * as types from './'

export type ComboType = {
  Proposta_Id?: string
  Combo_Id: string
  Veiculo_Id?: string
  ComboPreco_Id: string
  PropostasProdutos?: { data: types.ProductType[] }
  PropostasServicos?: { data: types.ServiceType[] }
  PropostasPlanos?: { data: types.PlanType[] }
}
