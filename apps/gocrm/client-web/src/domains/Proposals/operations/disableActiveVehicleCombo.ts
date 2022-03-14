import { useTypedClientMutation } from '&crm/graphql/generated/zeus/apollo'

export async function disableActiveVehicleCombo(Id: string) {
  await useTypedClientMutation({
    update_clientes_VeiculosAtivos_Combos_by_pk: [
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
  //   update_clientes_VeiculosAtivos_Planos: [
  //     {
  //       where: { VeiculoAtivoCombo_Id: { _eq: Id }, Ativo: { _eq: true } },
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
  //   update_clientes_VeiculosAtivos_Produtos: [
  //     {
  //       where: {
  //         _or: [
  //           {
  //             VeiculoAtivoCombo_Id: { _eq: Id }
  //           },
  //           {
  //             VeiculosAtivosPlano: {
  //               VeiculoAtivoCombo_Id: { _eq: Id }
  //             }
  //           }
  //         ],
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
  //         _or: [
  //           {
  //             VeiculoAtivoCombo_Id: { _eq: Id }
  //           },
  //           {
  //             VeiculosAtivosPlano: {
  //               VeiculoAtivoCombo_Id: { _eq: Id }
  //             }
  //           }
  //         ],
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
