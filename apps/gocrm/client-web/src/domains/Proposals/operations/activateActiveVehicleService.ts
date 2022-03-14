import { useTypedClientMutation } from '&crm/graphql/generated/zeus/apollo'

type ActivateActiveVehicleServiceProps = {
  Id: string
  Ativo: boolean
}

export async function ActivateActiveVehicleService({
  Id,
  Ativo
}: ActivateActiveVehicleServiceProps) {
  useTypedClientMutation({
    update_clientes_VeiculosAtivos_Servicos_by_pk: [
      {
        pk_columns: {
          Id
        },
        _set: {
          Ativo,
          updated_at: new Date(),
          DataDeAtivacao: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })
}
