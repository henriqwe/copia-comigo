import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateActiveVehicleProps = {
  Id: string
  OS_Id: string
}

export async function updateActiveVehicle({
  Id,
  OS_Id
}: UpdateActiveVehicleProps) {
  return useTypedClientMutation({
    update_clientes_VeiculosAtivos_by_pk: [
      {
        pk_columns: {
          Id
        },
        _set: {
          OS_Id,
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })
}
