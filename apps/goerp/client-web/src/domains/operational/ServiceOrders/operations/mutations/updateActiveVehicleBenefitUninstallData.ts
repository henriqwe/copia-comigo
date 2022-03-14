import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type updateActiveVehicleBenefitUninstallDataProps = {
  Id: string
}

export async function updateActiveVehicleBenefitUninstallData({
  Id
}: updateActiveVehicleBenefitUninstallDataProps) {
  useTypedClientMutation({
    update_clientes_VeiculosAtivos_Beneficios_by_pk: [
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
