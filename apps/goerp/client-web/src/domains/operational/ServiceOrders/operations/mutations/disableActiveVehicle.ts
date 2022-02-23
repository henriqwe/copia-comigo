import { clientes_VeiculosAtivos_Situacao_enum } from '&erp/graphql/generated/zeus'
import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type DisableActiveVehicleProps = {
  Id: string
}

export async function disableActiveVehicle({ Id }: DisableActiveVehicleProps) {
  useTypedClientMutation({
    update_clientes_VeiculosAtivos_by_pk: [
      {
        pk_columns: {
          Id
        },
        _set: {
          Situacao_Id: clientes_VeiculosAtivos_Situacao_enum.inativo
        }
      },
      {
        Id: true
      }
    ]
  })
}
