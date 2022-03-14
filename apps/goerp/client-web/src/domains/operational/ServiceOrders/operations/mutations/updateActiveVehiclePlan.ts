import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateActiveVehiclePlanProps = {
  Id: string
  Ativo: boolean
  PlanoPreco_Id: string
}

export async function updateActiveVehiclePlan({
  Id,
  Ativo,
  PlanoPreco_Id,
}: UpdateActiveVehiclePlanProps) {
  useTypedClientMutation({
    update_clientes_VeiculosAtivos_Planos_by_pk: [
      {
        pk_columns: {
          Id
        },
        _set: {
          Ativo,
          updated_at: new Date(),
          PlanoPreco_Id
        }
      },
      {
        Id: true
      }
    ]
  })
}
