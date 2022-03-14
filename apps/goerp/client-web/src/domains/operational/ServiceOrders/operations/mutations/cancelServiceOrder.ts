import {
  operacional_OrdemDeServico_Agendamentos_Situacoes_enum,
  operacional_OrdemDeServico_Situacoes_enum
} from '&erp/graphql/generated/zeus'
import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type CancelServiceOrderProps = {
  OS_Id: string
  Id: string
}

export async function cancelServiceOrder({
  OS_Id,
  Id
}: CancelServiceOrderProps) {
  let scheduleCancel = {}
  if (Id) {
    scheduleCancel = {
      update_operacional_OrdemDeServico_Agendamentos_by_pk: [
        {
          pk_columns: { Id },
          _set: {
            OS_Id: OS_Id,
            Situacao_Id:
              operacional_OrdemDeServico_Agendamentos_Situacoes_enum.frustada
          }
        },
        { Id: true }
      ]
    }
  }
  useTypedClientMutation({
    ...scheduleCancel,
    update_operacional_OrdemDeServico_by_pk: [
      {
        pk_columns: { Id: OS_Id },
        _set: {
          Situacao_Id: operacional_OrdemDeServico_Situacoes_enum.cancelada,
          updated_at: new Date()
        }
      },
      { Id: true }
    ],
    insert_operacional_OrdemDeServico_Atividades_one: [
      {
        object: {
          OrdemDeServico_Id: OS_Id,
          MotivoRecusado: null,
          Situacao_Id: operacional_OrdemDeServico_Situacoes_enum.cancelada,
          Usuario_Id: '7fd2e5d7-a4c4-485b-8675-e56052e3ff5f'
        }
      },
      {
        Id: true
      }
    ]
  })
}
