export type ActiveVehicleDataType = {
  Id: string
  Cliente_Id: string
  Franquia_Id?: string
  OS_Id?: string
  Situacao: {
    Valor: string
  }
  Combos: {
    Id: string
    Ativo: boolean
    ComboPreco_Id: string
    Combo_Id: string
  }[]

  Planos: {
    Id: string
    Ativo: boolean
    PlanoPreco_Id?: string
    Plano_Id: string
    VeiculoAtivoCombo_Id?: string
  }[]

  Produtos: {
    Id: string
    Ativo: boolean
    Produto_Id: string
    PrecoDeAdesao_Id?: string
    PrecoDeRecorrencia_Id?: string
    Identificador?: string
    TipoItem_Id?: string
    VeiculoAtivoCombo_Id?: string
    VeiculoAtivoPlano_Id?: string
  }[]

  Servicos: {
    Id: string
    Ativo: boolean
    Servico_Id: string
    PrecoDeAdesao_Id?: string
    PrecoDeRecorrencia_Id?: string
    Beneficio: boolean
    VeiculoAtivoCombo_Id?: string
    VeiculoAtivoPlano_Id?: string
  }[]
}
