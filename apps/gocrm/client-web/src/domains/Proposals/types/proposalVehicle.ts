export type ProposalsVehicleDataType = {
  Id: string
  Veiculo_Id?: string
  PropostasServicos: {
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

  PropostasProdutos: {
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

  PropostasPlanos: {
    Plano: {
      Id: string
      Nome: string
      Produtos: {
        Produto: { Id: string; Nome: string }
      }[]
      Servicos: {
        Servico: { Id: string; Nome: string; GeraOS: boolean }
      }[]
    }
    PlanoPreco: {
      Id: string
      ValorDeAdesao: string
      ValorDeRecorrencia: string
    }
  }[]

  PropostasCombos: {
    Combo: {
      Id: string
      Nome: string
      Planos: {
        Plano: {
          Id: string
          Nome: string
          Produtos: {
            Produto: { Id: string; Nome: string }
          }[]

          Servicos: {
            Servico: { Id: string; Nome: string; GeraOS: boolean }
          }[]
        }
      }[]

      Produtos: {
        Produto: {
          Id: string
          Nome: string
          Fornecedores: {
            Precos: {
              Id: string
              TipoDePreco?: { Valor: string }
            }[]
          }[]
        }
      }[]

      Servicos: {
        Servico: {
          Id: string
          Nome: string
          GeraOS: boolean
          PrestadoresDeServicos: {
            Precos: {
              Id: string
              TipoDePreco?: { Valor: string }
            }[]
          }[]
        }
      }[]
    }
    ComboPreco: {
      Id: string
      ValorDeAdesao: string
      ValorDeRecorrencia: string
    }
  }[]
}
