import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateActiveVehiclePlanProps = {
  Id: string
}

export async function updateActiveVehiclePlanUninstall({
  Id
}: UpdateActiveVehiclePlanProps) {
  useTypedClientMutation({
    update_clientes_VeiculosAtivos_Planos_by_pk: [
      {
        pk_columns: {
          Id
        },
        _set: {
          Ativo: false,
          DataDeDesativacao: new Date(),
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })
}
