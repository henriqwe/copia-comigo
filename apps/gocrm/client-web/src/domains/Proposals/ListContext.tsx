import {
  order_by,
  propostas_Propostas_Situacoes_enum
} from '&crm/graphql/generated/zeus'
import {
  useTypedMutation,
  useTypedQuery,
  $
} from '&crm/graphql/generated/zeus/apollo'
import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client'
import { createContext, ReactNode, useContext } from 'react'

type ListContextProps = {
  paymentTypesData: {
    Comentario: string
    Valor: string
  }[]
  recurrenceTypesData: {
    Comentario: string
    Valor: string
  }[]
  proposalsData?: {
    Id: string
    Situacao: {
      Comentario: string
    },
    created_at: Date
  }[]

  proposalsRefetch: () => void
  proposalsLoading: boolean
  softDeleteProposal: (
    options?: MutationFunctionOptions<
      {
        update_propostas_Propostas_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  softDeleteProposalLoading: boolean
  insertProposal: (
    options?: MutationFunctionOptions<
      {
        insert_propostas_Propostas_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  insertProposalLoading: boolean
}

type ProviderProps = {
  children: ReactNode
}

export const ListContext = createContext<ListContextProps>(
  {} as ListContextProps
)

export const ListProvider = ({ children }: ProviderProps) => {
  const [softDeleteProposal, { loading: softDeleteProposalLoading }] =
    useTypedMutation({
      update_propostas_Propostas_by_pk: [
        {
          pk_columns: { Id: $`Id` },
          _set: {
            deleted_at: new Date()
          }
        },
        {
          Id: true
        }
      ]
    })

  const [insertProposal, { loading: insertProposalLoading }] = useTypedMutation(
    {
      insert_propostas_Propostas_one: [
        {
          object: {
            Lead_Id: $`Lead_Id`,
            Ticket_Id: $`Ticket_Id`,
            Usuario_Id: $`Usuario_Id`,
            Situacao_Id: propostas_Propostas_Situacoes_enum.criado,
            Cliente_Id: $`Cliente_Id`
          }
        },
        {
          Id: true
        }
      ]
    }
  )

  const { data: paymentTypesData } = useTypedQuery({
    vendas_TiposDePagamento: [
      {},
      {
        Comentario: true,
        Valor: true
      }
    ]
  })

  const { data: recurrenceTypesData } = useTypedQuery({
    vendas_TiposDeRecorrencia: [
      {},
      {
        Comentario: true,
        Valor: true
      }
    ]
  })

  const {
    data: proposalsData,
    refetch: proposalsRefetch,
    loading: proposalsLoading
  } = useTypedQuery(
    {
      propostas_Propostas: [
        {
          order_by: [{ created_at: order_by.desc }],
          where: {
            deleted_at: { _is_null: true }
          }
        },
        {
          Id: true,
          Situacao: {
            Comentario: true
          },
          created_at: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  return (
    <ListContext.Provider
      value={{
        paymentTypesData: paymentTypesData?.vendas_TiposDePagamento,
        recurrenceTypesData: recurrenceTypesData?.vendas_TiposDeRecorrencia,
        proposalsData: proposalsData?.propostas_Propostas,
        proposalsRefetch,
        proposalsLoading,
        softDeleteProposal,
        softDeleteProposalLoading,
        insertProposal,
        insertProposalLoading
      }}
    >
      {children}
    </ListContext.Provider>
  )
}

export const useList = () => {
  return useContext(ListContext)
}
