import { ProposalsVehicleDataType } from "./proposalVehicle"

export type ProposalsDataType = {
  Situacao: {
    Comentario: string
  }
  FormaDePagamentoDaAdesao_Id?: string
  Cliente_Id?: string
  Planos: {
    Plano: {
      Id: string
      Nome: string
    }
    PlanoPreco: {
      Id: string
      ValorDeAdesao: string
      ValorDeRecorrencia: string
    }
  }[]

  Servicos: {
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
  }[]

  Produtos: {
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
  }[]

  Combos: {
    Combo: {
      Id: string
      Nome: string
    }
    ComboPreco: {
      Id: string
      ValorDeAdesao: string
      ValorDeRecorrencia: string
    }
  }[]

  Veiculos: ProposalsVehicleDataType[]
}
