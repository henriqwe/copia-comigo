import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client'
import { GraphQLTypes, order_by } from '&crm/graphql/generated/zeus'
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
import * as yup from 'yup'

type ListContextProps = {
  slidePanelState: SlidePanelStateType
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>
  plansData?: {
    Id: string
    Nome: string
  }[]
  plansRefetch: () => void
  plansLoading: boolean
  softDeletePlanLoading: boolean
  softDeletePlan: (
    options?: MutationFunctionOptions<
      {
        update_comercial_Planos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createPlan: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_Planos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createPlanLoading: boolean
  planSchema: yup.AnyObjectSchema
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

  const [createPlan, { loading: createPlanLoading }] = useTypedMutation({
    insert_comercial_Planos_one: [
      {
        object: {
          Nome: $`Nome`
        }
      },
      { Id: true }
    ]
  })

  const [softDeletePlan, { loading: softDeletePlanLoading }] = useTypedMutation(
    {
      update_comercial_Planos_by_pk: [
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
    }
  )

  const {
    data: plansData,
    refetch: plansRefetch,
    loading: plansLoading
  } = useTypedQuery(
    {
      comercial_Planos: [
        {
          order_by: [{ created_at: order_by.desc }],
          where: { deleted_at: { _is_null: true } }
        },
        {
          Id: true,
          Nome: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const planSchema = yup.object().shape({
    Nome: yup.string().required('Preencha o campo para continuar')
  })

  return (
    <ListContext.Provider
      value={{
        slidePanelState,
        setSlidePanelState,
        plansData: plansData?.comercial_Planos,
        plansRefetch,
        plansLoading,
        softDeletePlanLoading,
        softDeletePlan,
        createPlan,
        createPlanLoading,
        planSchema
      }}
    >
      {children}
    </ListContext.Provider>
  )
}

export const useList = () => {
  return useContext(ListContext)
}
