import { useTypedClientMutation } from "&crm/graphql/generated/zeus/apollo";

export async function disableActiveVehicleService(Id: string){
  await useTypedClientMutation({
    update_clientes_VeiculosAtivos_Servicos_by_pk: [
      {
        pk_columns: { Id: Id },
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