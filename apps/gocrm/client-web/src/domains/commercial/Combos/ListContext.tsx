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
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'
import { order_by } from '&crm/graphql/generated/zeus'
import * as yup from 'yup'

type ListContextProps = {
  slidePanelState: SlidePanelStateType
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>
  combosData?: {
    Produtos: {
      Id: string
      Produto: {
        Id: string
        Nome: string
      }
    }[]
    Id: string
    Nome: string
    Planos: {
      Id: string
      Plano: {
        Nome: string
      }
    }[]
    Servicos: {
      Id: string
      Servico: {
        Id: string
        Nome: string
      }
    }[]
    OportunidadesDeProdutos: {
      Id: string
      Nome: string
      Valor: string
      Combo: {
        Id: string
        Nome: string
      }
    }[]
    OportunidadesDeServicos: {
      Id: string
      Nome: string
      Valor: string
      Combo: {
        Id: string
        Nome: string
      }
    }[]
    Precos: { Id: string; ValorDeAdesao: string; ValorDeRecorrencia: string }[]
  }[]

  combosRefetch: () => void
  combosLoading: boolean
  softDeleteComboLoading: boolean
  softDeleteCombo: (
    options?: MutationFunctionOptions<
      {
        update_comercial_Combos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createCombo: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_Combos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createComboLoading: boolean
  comboSchema: yup.AnyObjectSchema
}

type SlidePanelStateType = {
  open: boolean
}

type ProviderProps = {
  children: ReactNode
}

export const ListContext = createContext<ListContextProps>(
  {} as ListContextProps
)

export const ListProvider = ({ children }: ProviderProps) => {
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelStateType>({
    open: false
  })

  const [createCombo, { loading: createComboLoading }] = useTypedMutation({
    insert_comercial_Combos_one: [
      {
        object: {
          Nome: $`Nome`
        }
      },
      { Id: true }
    ]
  })

  const [softDeleteCombo, { loading: softDeleteComboLoading }] =
    useTypedMutation({
      update_comercial_Combos_by_pk: [
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
    data: combosData,
    refetch: combosRefetch,
    loading: combosLoading
  } = useTypedQuery(
    {
      comercial_Combos: [
        { where: { deleted_at: { _is_null: true } } },
        {
          Id: true,
          Nome: true,
          Planos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              Plano: {
                Nome: true
              }
            }
          ],
          Produtos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              Produto: {
                Id: true,
                Nome: true
              }
            }
          ],
          Servicos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              Servico: {
                Id: true,
                Nome: true
              }
            }
          ],
          OportunidadesDeProdutos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              Nome: true,
              Valor: true,
              Combo: {
                Id: true,
                Nome: true
              }
            }
          ],
          OportunidadesDeServicos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              Nome: true,
              Valor: true,
              Combo: {
                Id: true,
                Nome: true
              }
            }
          ],
          Precos: [
            { order_by: [{ created_at: order_by.desc }] },
            { Id: true, ValorDeAdesao: true, ValorDeRecorrencia: true }
          ]
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const comboSchema = yup.object().shape({
    Nome: yup.string().required('Preencha o campo para continuar')
  })

  return (
    <ListContext.Provider
      value={{
        combosData: combosData?.comercial_Combos,
        combosRefetch,
        combosLoading,
        softDeleteComboLoading,
        softDeleteCombo,
        setSlidePanelState,
        slidePanelState,
        createCombo,
        createComboLoading,
        comboSchema
      }}
    >
      {children}
    </ListContext.Provider>
  )
}

export const useList = () => {
  return useContext(ListContext)
}
