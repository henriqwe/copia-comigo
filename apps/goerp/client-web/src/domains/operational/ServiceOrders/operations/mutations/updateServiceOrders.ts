import {
  operacional_OrdemDeServico_Agendamentos_Situacoes_enum,
  operacional_OrdemDeServico_Situacoes_enum
} from '&erp/graphql/generated/zeus'
import { useTypedClientMutation, $ } from '&erp/graphql/generated/zeus/apollo'

type UpdateServiceOrdersProps = {
  OS_Id: string
  Agendamento: Date
  Colaborador_Id: string
  Contato: string
  Responsavel: string
  Endereco: {
    Bairro: string
    Logradouro: string
    Cep: string
    Cidade: string
    Estado: string
    Numero: string
    Complemento: string
  }
  Itens: {
    Produto_Id: string
    Item_Id: string
    RetiradoDoEstoque: boolean
  }[]
}

export async function updateServiceOrders({
  OS_Id,
  Agendamento,
  Colaborador_Id,
  Itens,
  Contato,
  Responsavel,
  Endereco
}: UpdateServiceOrdersProps) {
  useTypedClientMutation({
    update_operacional_OrdemDeServico_by_pk: [
      {
        pk_columns: { Id: OS_Id },
        _set: {
          Situacao_Id: operacional_OrdemDeServico_Situacoes_enum.agendada,
          updated_at: new Date()
        }
      },
      { Id: true }
    ],
    insert_operacional_OrdemDeServico_Agendamentos_one: [
      {
        object: {
          OS_Id: OS_Id,
          Agendamento,
          Colaborador_Id,
          Contato,
          Responsavel,
          Endereco: $`Endereco`,
          Situacao_Id:
            operacional_OrdemDeServico_Agendamentos_Situacoes_enum.criada,
          Itens: {
            data: Itens
          }
        }
      },
      {
        Id: true
      }
    ],
    insert_operacional_OrdemDeServico_Atividades_one: [
      {
        object: {
          OrdemDeServico_Id: OS_Id,
          Situacao_Id: operacional_OrdemDeServico_Situacoes_enum.agendada,
          Usuario_Id: '7fd2e5d7-a4c4-485b-8675-e56052e3ff5f'
        }
      },
      {
        Id: true
      }
    ]
  },{
    Endereco
  })
}
