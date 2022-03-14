import { useTypedClientMutation } from '&crm/graphql/generated/zeus/apollo'

type ActivateActiveVehicleProductProps = {
  Id: string
  Ativo: boolean
}

export async function ActivateActiveVehicleProduct({
  Id,
  Ativo
}: ActivateActiveVehicleProductProps) {
  useTypedClientMutation({
    update_clientes_VeiculosAtivos_Produtos_by_pk: [
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
