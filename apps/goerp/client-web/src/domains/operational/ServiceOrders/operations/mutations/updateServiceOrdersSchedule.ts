import { operacional_OrdemDeServico_Agendamentos_Situacoes_enum } from '&erp/graphql/generated/zeus'
import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateServiceOrdersScheduleProps = {
  Id: string
  OS_Id: string
}

export async function updateServiceOrdersSchedule({ Id, OS_Id }: UpdateServiceOrdersScheduleProps) {
  useTypedClientMutation({
    update_operacional_OrdemDeServico_Agendamentos_by_pk: [
      {
        pk_columns: { Id },
        _set: {
          OS_Id,
          Situacao_Id:
            operacional_OrdemDeServico_Agendamentos_Situacoes_enum.itensRetirados
        }
      },
      { Id: true }
    ]
  })
}
