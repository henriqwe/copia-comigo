export type ActiveVehicleDataType = {
  Id: string
  Cliente_Id: string
  Franquia_Id?: string
  OS_Id?: string
  Situacao: {
    Valor: string
  }
  Beneficios: {
    Id: string
    Portfolio_Id: string
    PortfolioPreco_Id?: string
    TipoPortfolio: string
    PrecoDeAdesao_Id?: string
    PrecoDeRecorrencia_Id?: string
  }[]

  Produtos: {
    Id: string
    Ativo: boolean
    Produto_Id: string
    PrecoDeAdesao_Id?: string
    PrecoDeRecorrencia_Id?: string
    Identificador?: string
    TipoItem_Id?: string
  }[]

  Servicos: {
    Id: string
    Ativo: boolean
    Servico_Id: string
    PrecoDeAdesao_Id?: string
    PrecoDeRecorrencia_Id?: string
  }[]
}
