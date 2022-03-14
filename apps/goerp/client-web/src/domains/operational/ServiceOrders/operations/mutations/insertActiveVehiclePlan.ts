import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'
import { ActiveVehicleProductType } from '../../types/activeVehicleProduct'
import { ActiveVehicleServiceType } from '../../types/activeVehicleService'

type InsertActiveVehiclePlanProps = {
  PlanoPreco_Id: string
  Plano_Id: string
  VeiculoAtivo_Id: string
  Produtos?: ActiveVehicleProductType[]
  Servicos?: ActiveVehicleServiceType[]
}

export async function insertActiveVehiclePlan({
  VeiculoAtivo_Id,
  PlanoPreco_Id,
  Plano_Id,
  Produtos = [],
  Servicos = []
}: InsertActiveVehiclePlanProps) {
  useTypedClientMutation({
    insert_clientes_VeiculosAtivos_Planos_one: [
      {
        object: {
          VeiculoAtivo_Id,
          DataDeAtivacao: new Date(),
          PlanoPreco_Id,
          Plano_Id,
          Ativo: true,
          Produtos: {
            data: Produtos
          },
          Servicos: {
            data: Servicos
          }
        }
      },
      {
        Id: true
      }
    ]
  })
}
