import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateActiveVehicleServiceProps = {
  Id: string
}

export async function updateActiveVehicleServiceUninstall({
  Id
}: UpdateActiveVehicleServiceProps) {
  useTypedClientMutation({
    update_clientes_VeiculosAtivos_Servicos_by_pk: [
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
