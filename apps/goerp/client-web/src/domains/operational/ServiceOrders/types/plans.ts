import { Products } from './products'
import { Services } from './services'

export type PlansType = {
  Id: string
  PlanoPreco_Id?: string
  Plano?: {
    Id: string
    Nome: string
  }
  OrdemDeServicoCombo_Id?: string
  OSServicos: Services[]
  OSProdutos: Products[]
}
