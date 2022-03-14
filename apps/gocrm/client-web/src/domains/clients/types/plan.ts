import * as types from './'

export type PlanType = {
  Proposta_Id?: string
  Plano_Id: string
  Veiculo_Id?: string
  PlanoPreco_Id: string
  PropostasProdutos?: { data: types.ProductType[]}
  PropostasServicos?: { data: types.ServiceType[]}
}
