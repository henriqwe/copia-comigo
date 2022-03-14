export type ActiveVehicleProductType = {
  PrecoDeAdesao_Id?: string
  PrecoDeRecorrencia_Id?: string
  Produto_Id: string
  Identificador?: string
  TipoItem_Id?: string
  DataDeAtivacao: Date
  DataDeDesativacao?: Date
  Quantidade: number
  VeiculoAtivoCombo_Id?: string
  VeiculoAtivoPlano_Id?: string
  Ativo?: boolean
}
