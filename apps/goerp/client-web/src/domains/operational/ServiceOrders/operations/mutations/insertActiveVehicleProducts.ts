import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type InsertActiveVehicleProductsProps = {
  PrecoDeAdesao_Id: string
  PrecoDeRecorrencia_Id: string
  Produto_Id: string
  VeiculoAtivo_Id: string
  TipoItem_Id: string
  Identificador: string
  Quantidade: number
}

export async function insertActiveVehicleProducts({
  PrecoDeAdesao_Id,
  PrecoDeRecorrencia_Id,
  Produto_Id,
  VeiculoAtivo_Id,
  TipoItem_Id,
  Identificador,
  Quantidade = 1
}: InsertActiveVehicleProductsProps) {
  useTypedClientMutation({
    insert_clientes_VeiculosAtivos_Produtos_one: [
      {
        object: {
          PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id,
          Produto_Id,
          VeiculoAtivo_Id,
          TipoItem_Id,
          Identificador,
          DataDeAtivacao: new Date(),
          Quantidade,
          Ativo: true
        }
      },
      {
        Id: true
      }
    ]
  })
}
