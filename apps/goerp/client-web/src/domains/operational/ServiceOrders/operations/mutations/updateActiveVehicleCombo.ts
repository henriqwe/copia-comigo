import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateActiveVehicleComboProps = {
  Id: string
  Ativo: boolean
  ComboPreco_Id: string
}

export async function updateActiveVehicleCombo({
  Id,
  Ativo,
  ComboPreco_Id,
}: UpdateActiveVehicleComboProps) {
  useTypedClientMutation({
    update_clientes_VeiculosAtivos_Combos_by_pk: [
      {
        pk_columns: {
          Id
        },
        _set: {
          Ativo,
          ComboPreco_Id,
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })
}
