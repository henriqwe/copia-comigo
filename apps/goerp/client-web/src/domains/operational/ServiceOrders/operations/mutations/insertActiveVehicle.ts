import { clientes_VeiculosAtivos_Situacao_enum } from '&erp/graphql/generated/zeus'
import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'
import { ActiveVehicleProductType } from '../../types/activeVehicleProduct'
import { ActiveVehicleServiceType } from '../../types/activeVehicleService'

type InsertActiveVehicleProps = {
  Id: string
  PossuiGNV: boolean
  Veiculo_Id: string
  Cliente_Id: string
  Franquia_Id: string
  OS_Id: string
  Planos: {
    Ativo: boolean
    Plano_Id: string
    PlanoPreco_Id: string
    DataDeAtivacao: Date
    Produtos?: {
      data: ActiveVehicleProductType[]
    }
    Servicos?: { data: ActiveVehicleServiceType[] }
  }[]

  Produtos: ActiveVehicleProductType[]
  Servicos: ActiveVehicleServiceType[]

  Combos: {
    Ativo: boolean
    ComboPreco_Id: string
    Combo_Id: string
    DataDeAtivacao: Date
    Planos?: {
      data: {
        DataDeAtivacao: Date
        PlanoPreco_Id: string
        Plano_Id: string
        VeiculoAtivo_Id: string
        Ativo: boolean
        Produtos: {
          data: ActiveVehicleProductType[]
        }
        Servicos: {
          data: ActiveVehicleServiceType[]
        }
      }[]
    }
    Produtos?: { data: ActiveVehicleProductType[] }
    Servicos?: { data: ActiveVehicleServiceType[] }
  }[]
}

export async function insertActiveVehicle({
  Id,
  PossuiGNV,
  Veiculo_Id,
  Cliente_Id,
  Franquia_Id,
  OS_Id,
  Planos,
  Combos,
  Produtos,
  Servicos
}: InsertActiveVehicleProps) {
  useTypedClientMutation({
    insert_clientes_VeiculosAtivos_one: [
      {
        object: {
          Id,
          PossuiGNV,
          Situacao_Id: clientes_VeiculosAtivos_Situacao_enum.ativo,
          Veiculo_Id,
          Cliente_Id,
          Franquia_Id: Franquia_Id,
          OS_Id,
          Produtos: {
            data: Produtos
          },
          Servicos: {
            data: Servicos
          },
          Planos: {
            data: Planos
          },
          Combos: {
            data: Combos
          }
        }
      },
      {
        Id: true
      }
    ]
  })
}
