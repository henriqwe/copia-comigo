import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'
import { ActiveVehicleProductType } from '../../types/activeVehicleProduct'
import { ActiveVehicleServiceType } from '../../types/activeVehicleService'

type InsertActiveVehicleComboProps = {
  ComboPreco_Id: string
  Combo_Id: string
  VeiculoAtivo_Id: string
  Planos?: {
    DataDeAtivacao: Date
    PlanoPreco_Id: string
    Plano_Id: string
    Ativo: boolean
    Produtos: {
      data: ActiveVehicleProductType[]
    }
    Servicos: {
      data: ActiveVehicleServiceType[]
    }
  }[]
  Produtos?: ActiveVehicleProductType[]
  Servicos?: ActiveVehicleServiceType[]
}

export async function insertActiveVehicleCombo({
  VeiculoAtivo_Id,
  ComboPreco_Id,
  Combo_Id,
  Produtos = [],
  Servicos = [],
  Planos = []
}: InsertActiveVehicleComboProps) {
  useTypedClientMutation({
    insert_clientes_VeiculosAtivos_Combos_one: [
      {
        object: {
          VeiculoAtivo_Id,
          DataDeAtivacao: new Date(),
          ComboPreco_Id,
          Combo_Id,
          Ativo: true,
          Produtos: {
            data: Produtos
          },
          Servicos: {
            data: Servicos
          },
          Planos: {
            data: Planos
          }
        }
      },
      {
        Id: true
      }
    ]
  })
}
