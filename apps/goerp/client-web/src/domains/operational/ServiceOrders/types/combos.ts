import { PlansType } from "./plans"
import { Products } from "./products"
import { Services } from "./services"

export type CombosType = {
  Id: string
  Combo?: {
    Id: string
    Nome: string
  }
  ComboPreco?: {
    Id: string
    ValorDeAdesao: string
    ValorDeRecorrencia: string
  }
  OSPlanos: PlansType[]
  OSServicos: Services[]
  OSProdutos: Products[]
}
