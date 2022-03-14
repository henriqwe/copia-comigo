import { useTypedClientMutation } from '&crm/graphql/generated/zeus/apollo'

type UpdateActiveVehicleServiceProps = {
  Id: string
  Ativo: boolean
}

export async function updateActiveVehicleService({
  Id,
  Ativo
}: UpdateActiveVehicleServiceProps) {
  useTypedClientMutation({
    update_clientes_VeiculosAtivos_Servicos_by_pk: [
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
