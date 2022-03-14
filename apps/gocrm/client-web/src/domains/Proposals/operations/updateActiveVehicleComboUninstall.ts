import { useTypedClientMutation } from '&crm/graphql/generated/zeus/apollo'

type updateActiveVehicleComboUninstallProps = {
  Id: string
}

export async function updateActiveVehicleComboUninstall({
  Id
}: updateActiveVehicleComboUninstallProps) {
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
