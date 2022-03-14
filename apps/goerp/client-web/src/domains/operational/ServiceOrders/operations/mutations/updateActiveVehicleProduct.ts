import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateActiveVehicleProductProps = {
  Id: string
  Ativo: boolean
}

export async function updateActiveVehicleProduct({
  Id,
  Ativo
}: UpdateActiveVehicleProductProps) {
  useTypedClientMutation({
    update_clientes_VeiculosAtivos_Produtos_by_pk: [
      {
        pk_columns: {
          Id
        },
        _set: {
          Ativo,
          updated_at: new Date(),
          DataDeDesativacao: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })
}
