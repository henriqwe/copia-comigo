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
import { useRouter } from 'next/router'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'
import * as yup from 'yup'

type AlertsContextProps = {
  slidePanelState: SlidePanelStateType
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>
  alertsData?: {
    Id: string
    Mensagem: string
  }[]

  alertsRefetch: () => void
  alertsLoading: boolean
  createAlert: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_Servicos_RegrasETermosDeUso_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createAlertLoading: boolean
  updateAlert: (
    options?: MutationFunctionOptions<
      {
        update_comercial_Servicos_RegrasETermosDeUso_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  updateAlertLoading: boolean
  softDeleteAlertLoading: boolean
  softDeleteAlert: (
    options?: MutationFunctionOptions<
      {
        update_comercial_Servicos_RegrasETermosDeUso_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  alertschema: yup.AnyObjectSchema
}

type SlidePanelStateType = {
  data?: GraphQLTypes['comercial_Servicos_Servicos'] | null
  open: boolean
}

type ProviderProps = {
  children: ReactNode
}

export const AlertsContext = createContext<AlertsContextProps>(
  {} as AlertsContextProps
)

export const AlertsProvider = ({ children }: ProviderProps) => {
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelStateType>({
    open: false
  })

  const router = useRouter()
  const [createAlert, { loading: createAlertLoading }] = useTypedMutation({
    insert_comercial_Servicos_RegrasETermosDeUso_one: [
      {
        object: {
          Servico_Id: router.query.id,
          Mensagem: $`Mensagem`
        }
      },
      { Id: true }
    ]
  })

  const [updateAlert, { loading: updateAlertLoading }] = useTypedMutation({
    update_comercial_Servicos_RegrasETermosDeUso_by_pk: [
      {
        pk_columns: { Id: $`Id` },
        _set: {
          Mensagem: $`Mensagem`,
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })

  const [softDeleteAlert, { loading: softDeleteAlertLoading }] =
    useTypedMutation({
      update_comercial_Servicos_RegrasETermosDeUso_by_pk: [
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
    data: alertsData,
    refetch: alertsRefetch,
    loading: alertsLoading
  } = useTypedQuery(
    {
      comercial_Servicos_RegrasETermosDeUso: [
        {
          order_by: [{ created_at: order_by.desc }],
          where: {
            deleted_at: { _is_null: true },
            Produto_Id: { _eq: router.query.id }
          }
        },
        {
          Id: true,
          Mensagem: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const alertschema = yup.object().shape({
    Mensagem: yup.string().required('Preencha o campo para continuar')
  })

  return (
    <AlertsContext.Provider
      value={{
        slidePanelState,
        setSlidePanelState,
        alertsData: alertsData?.comercial_Servicos_RegrasETermosDeUso,
        alertsRefetch,
        alertsLoading,
        createAlert,
        createAlertLoading,
        updateAlert,
        updateAlertLoading,
        softDeleteAlertLoading,
        softDeleteAlert,
        alertschema
      }}
    >
      {children}
    </AlertsContext.Provider>
  )
}

export const useAlerts = () => {
  return useContext(AlertsContext)
}
