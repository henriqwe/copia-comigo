import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client'
import {
  $,
  useTypedMutation,
  useTypedQuery
} from '&crm/graphql/generated/zeus/apollo'
import { createContext, ReactNode, useContext } from 'react'

type ListContextProps = {
  proposalsData?: {
    Id: string
    created_at: Date
    Combos: {
      Id: string
    }[]
    Planos: {
      Id: string
    }[]
    Produtos: {
      Id: string
    }[]
    Servicos: {
      Id: string
    }[]
    Situacao: {
      Comentario: string
      Valor: string
    }
  }[]

  proposalsRefetch: () => void
  proposalsLoading: boolean
  softDeleteProposalLoading: boolean
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

  const {
    data: proposalsData,
    refetch: proposalsRefetch,
    loading: proposalsLoading
  } = useTypedQuery(
    {
      propostas_Propostas: [
        { where: { deleted_at: { _is_null: true } } },
        {
          Id: true,
          created_at: true,
          Combos: [
            {},
            {
              Id: true,
              Combo: {
                Nome: true
              }
            }
          ],
          Planos: [
            {},
            {
              Id: true,
              Plano: {
                Nome: true
              }
            }
          ],
          Produtos: [
            {},
            {
              Id: true,
              Produto: {
                Id: true,
                Nome: true
              }
            }
          ],
          Servicos: [
            {},
            {
              Id: true,
              Servico: {
                Id: true,
                Nome: true
              }
            }
          ],
          Situacao: {
            Comentario: true,
            Valor: true
          }
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  return (
    <ListContext.Provider
      value={{
        proposalsData: proposalsData?.propostas_Propostas,
        proposalsRefetch,
        proposalsLoading,
        softDeleteProposalLoading,
        softDeleteProposal
      }}
    >
      {children}
    </ListContext.Provider>
  )
}

export const useList = () => {
  return useContext(ListContext)
}
