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
} from '&erp/graphql/generated/zeus/apollo'
import { createContext, ReactNode, useContext } from 'react'

type ConfigContextProps = {
  updateConfig: (
    options?: MutationFunctionOptions<
      {
        update_Configuracoes_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  updateConfigLoading: boolean
  configData?: {
    Id: string
    Nome: string
    Slug: string

    Valor: any
  }[]
  configLoading: boolean
  configRefetch: () => void
  prestadorDeServicoData?: {
    Id: string
    Nome: string
  }[]
  prestadorDeServicoLoading: boolean
  prestadorDeServicoRefetch: () => void
}

type ProviderProps = {
  children: ReactNode
}

export const ConfigContext = createContext<ConfigContextProps>(
  {} as ConfigContextProps
)

export const ConfigProvider = ({ children }: ProviderProps) => {
  const [updateConfig, { loading: updateConfigLoading }] = useTypedMutation({
    update_Configuracoes_by_pk: [
      {
        pk_columns: { Slug: $`Slug` },
        _set: {
          Valor: $`Valor`,
          updated_at: new Date()
        }
      },
      { Id: true }
    ]
  })

  const {
    data: configData,
    loading: configLoading,
    refetch: configRefetch
  } = useTypedQuery(
    {
      Configuracoes: [
        { where: { deleted_at: { _is_null: true } } },
        {
          Id: true,
          Nome: true,
          Slug: true,
          Valor: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const {
    data: prestadorDeServicoData,
    loading: prestadorDeServicoLoading,
    refetch: prestadorDeServicoRefetch
  } = useTypedQuery(
    {
      comercial_PrestadoresDeServicos: [
        { where: { deleted_at: { _is_null: true } } },
        {
          Id: true,
          Nome: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  return (
    <ConfigContext.Provider
      value={{
        updateConfig,
        updateConfigLoading,
        configData: configData?.Configuracoes,
        configLoading,
        configRefetch,
        prestadorDeServicoData:
          prestadorDeServicoData?.comercial_PrestadoresDeServicos,
        prestadorDeServicoLoading,
        prestadorDeServicoRefetch
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfig = () => {
  return useContext(ConfigContext)
}
