import { useTypedQuery } from '&erp/graphql/generated/zeus/apollo'
import { createContext, ReactNode, useContext } from 'react'

type UpdateContextProps = {
  providerData?: {
    Id: string
    Nome: string
  }
  providerRefetch: () => void
  providerLoading: boolean

  configData?: {
    Valor: string[]
  }
  configRefetch: () => void
  configLoading: boolean
}

type ProviderProps = {
  children: ReactNode
}

export const UpdateContext = createContext<UpdateContextProps>(
  {} as UpdateContextProps
)

export const UpdateProvider = ({ children }: ProviderProps) => {
  const {
    data: configData,
    refetch: configRefetch,
    loading: configLoading
  } = useTypedQuery(
    {
      Configuracoes_by_pk: [
        {
          Slug: 'prestadorPrecos'
        },
        {
          Valor: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const {
    data: providerData,
    refetch: providerRefetch,
    loading: providerLoading
  } = useTypedQuery(
    {
      comercial_PrestadoresDeServicos_by_pk: [
        {
          Id: configData?.Configuracoes_by_pk?.Valor[0]
        },
        {
          Id: true,
          Nome: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  return (
    <UpdateContext.Provider
      value={{
        providerData: providerData?.comercial_PrestadoresDeServicos_by_pk,
        providerRefetch,
        providerLoading,
        configData: configData?.Configuracoes_by_pk,
        configRefetch,
        configLoading
      }}
    >
      {children}
    </UpdateContext.Provider>
  )
}

export const useUpdate = () => {
  return useContext(UpdateContext)
}
