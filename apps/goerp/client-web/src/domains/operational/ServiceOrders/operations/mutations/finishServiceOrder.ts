import { operacional_OrdemDeServico_Situacoes_enum } from '&erp/graphql/generated/zeus'
import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type FinishServiceOrderProps = {
  OS_Id: string
}

export async function finishServiceOrder({
  OS_Id
}: FinishServiceOrderProps) {
  useTypedClientMutation({
    update_operacional_OrdemDeServico_by_pk: [
      {
        pk_columns: { Id: OS_Id },
        _set: {
          Situacao_Id: operacional_OrdemDeServico_Situacoes_enum.finalizada,
          DataConcluida: new Date(),
          updated_at: new Date()
        }
      },
      { Id: true }
    ],
    insert_operacional_OrdemDeServico_Atividades_one: [
      {
        object: {
          OrdemDeServico_Id: OS_Id,
          Situacao_Id: operacional_OrdemDeServico_Situacoes_enum.finalizada,
          Usuario_Id: '7fd2e5d7-a4c4-485b-8675-e56052e3ff5f'
        }
      },
      {
        Id: true
      }
    ]
  })
}
