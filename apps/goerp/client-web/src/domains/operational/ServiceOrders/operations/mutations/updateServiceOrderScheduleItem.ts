import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateServiceOrderScheduleItemProps = {
  Id: string
  RetiradoDoEstoque: boolean
}

export async function updateServiceOrderScheduleItem({
  Id,
  RetiradoDoEstoque
}: UpdateServiceOrderScheduleItemProps) {
  useTypedClientMutation({
    update_operacional_OrdemDeServico_Agendamentos_Itens_by_pk: [
      {
        pk_columns: {
          Id
        },
        _set: {
          RetiradoDoEstoque,
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })
}
