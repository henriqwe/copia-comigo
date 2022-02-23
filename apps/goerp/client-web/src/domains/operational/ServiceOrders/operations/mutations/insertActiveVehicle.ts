import { clientes_VeiculosAtivos_Situacao_enum } from '&erp/graphql/generated/zeus'
import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'
import { Benefits } from '../../types/benefits'
import { Products } from '../../types/products'
import { Services } from '../../types/services'

type InsertActiveVehicleProps = {
  Veiculo_Id: string
  Cliente_Id: string
  Franquia_Id: string
  OS_Id: string
  Beneficios: Omit<Benefits, 'Id'>[]
  Produtos: Omit<Products, 'Id'>[]
  Servicos: Omit<Services, 'Id'>[]
}

export async function insertActiveVehicle({
  Veiculo_Id,
  Cliente_Id,
  Franquia_Id,
  OS_Id,
  Beneficios,
  Produtos,
  Servicos
}: InsertActiveVehicleProps) {
  useTypedClientMutation({
    insert_clientes_VeiculosAtivos_one: [
      {
        object: {
          Situacao_Id: clientes_VeiculosAtivos_Situacao_enum.ativo,
          Veiculo_Id,
          Cliente_Id,
          Franquia_Id: Franquia_Id,
          OS_Id,
          Beneficios: {
            data: Beneficios
          },
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
