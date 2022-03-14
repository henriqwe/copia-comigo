import { useTypedClientMutation } from '&crm/graphql/generated/zeus/apollo'

type updateActiveVehiclePlanUninstallProps = {
  Id: string
}

export async function updateActiveVehiclePlanUninstall({
  Id
}: updateActiveVehiclePlanUninstallProps) {
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
