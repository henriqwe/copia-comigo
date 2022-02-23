import { operacional_OrdemDeServico_Agendamentos_Situacoes_enum } from '&erp/graphql/generated/zeus'
import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type InitializeServiceOrdersProps = {
  Id: string
  OS_Id: string
}

export async function initializeServiceOrders({
  Id,
  OS_Id
}: InitializeServiceOrdersProps) {
  useTypedClientMutation({
    update_operacional_OrdemDeServico_Agendamentos_by_pk: [
      {
        pk_columns: { Id },
        _set: {
          InicioDoServico: new Date(),
          OS_Id,
          Situacao_Id:
            operacional_OrdemDeServico_Agendamentos_Situacoes_enum.iniciada
        }
      },
      { Id: true }
    ]
  })
}
