import { clientes_VeiculosAtivos_Situacao_enum } from '&crm/graphql/generated/zeus'
import { ActiveVehicleProductType } from './activeVehicleProduct'
import { ActiveVehicleServiceType } from './activeVehicleService'

export type ActiveVehicleType = {
  Id: string
  OS_Id?: string
  Situacao_Id: clientes_VeiculosAtivos_Situacao_enum
  PossuiGNV: boolean

  Planos: {
    Plano_Id: string
    PlanoPreco_Id?: string
    DataDeAtivacao: Date
    DataDeDesativacao?: Date
    VeiculoAtivoCombo_Id?: string
    Produtos: ActiveVehicleProductType[]
    Servicos: ActiveVehicleServiceType[]
    Ativo: boolean
  }[]

  Combos: {
    Combo_Id: string
    ComboPreco_Id: string
    DataDeAtivacao: Date
    DataDeDesativacao?: Date
    Ativo: boolean
    Planos: {
      Plano_Id: string
      PlanoPreco_Id?: string
      DataDeAtivacao: string
      DataDeDesativacao?: string
      VeiculoAtivoCombo_Id?: string
      Produtos: ActiveVehicleProductType[]
      Servicos: ActiveVehicleServiceType[]
    }[]

    Produtos: ActiveVehicleProductType[]
    Servicos: ActiveVehicleServiceType[]
  }[]

  Produtos: ActiveVehicleProductType[]
  Servicos: ActiveVehicleServiceType[]
  Situacao: {
    Comentario: string
    Valor: string
  }
  Franquia_Id?: string
  Veiculo: {
    Id: string
    Apelido?: string
    Placa?: string
    NumeroDoChassi?: string
  }
}
