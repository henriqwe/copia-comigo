import { useTypedClientMutation } from '&crm/graphql/generated/zeus/apollo'

export async function disableActiveVehiclePlan(Id: string) {
  await useTypedClientMutation({
    update_clientes_VeiculosAtivos_Planos_by_pk: [
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

  // await useTypedClientMutation({
  //   update_clientes_VeiculosAtivos_Produtos: [
  //     {
  //       where: {
  //         VeiculoAtivoPlano_Id: { _eq: Id },
  //         Ativo: { _eq: true }
  //       },
  //       _set: {
  //         Ativo: false,
  //         DataDeDesativacao: new Date(),
  //         updated_at: new Date()
  //       }
  //     },
  //     {
  //       affected_rows: true
  //     }
  //   ]
  // })

  // await useTypedClientMutation({
  //   update_clientes_VeiculosAtivos_Servicos: [
  //     {
  //       where: {
  //         VeiculoAtivoPlano_Id: { _eq: Id },
  //         Ativo: { _eq: true }
  //       },
  //       _set: {
  //         Ativo: false,
  //         DataDeDesativacao: new Date(),
  //         updated_at: new Date()
  //       }
  //     },
  //     {
  //       affected_rows: true
  //     }
  //   ]
  // })
}
