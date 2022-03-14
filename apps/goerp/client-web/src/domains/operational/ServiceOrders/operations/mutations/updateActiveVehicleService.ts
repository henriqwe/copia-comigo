import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateActiveVehicleServiceProps = {
  Id: string
  Ativo: boolean
  PrecoDeRecorrencia_Id: string
  PrecoDeAdesao_Id: string
}

export async function updateActiveVehicleService({
  Id,
  Ativo,
  PrecoDeRecorrencia_Id,
  PrecoDeAdesao_Id
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
          PrecoDeRecorrencia_Id,
          PrecoDeAdesao_Id
        }
      },
      {
        Id: true
      }
    ]
  })
}
