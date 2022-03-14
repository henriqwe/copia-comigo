import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateActiveVehicleComboProps = {
  Id: string
}

export async function updateActiveVehicleComboUninstall({
  Id
}: UpdateActiveVehicleComboProps) {
  useTypedClientMutation({
    update_clientes_VeiculosAtivos_Combos_by_pk: [
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
