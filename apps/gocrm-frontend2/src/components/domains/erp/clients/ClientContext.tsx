import { useTypedQuery } from '&test/graphql/generated/zeus/apollo'
import { createContext, ReactNode, useContext } from 'react'

type ClientContextProps = {
  clientsData?: {
    Id: string
    Pessoa: {
      Nome: string
    }
  }[]
  clientsRefetch: () => void
  clientsLoading: boolean
}

type ProviderProps = {
  children: ReactNode
}

export const ClientContext = createContext<ClientContextProps>(
  {} as ClientContextProps
)

export const ClientProvider = ({ children }: ProviderProps) => {
  const {
    data: clientsData,
    refetch: clientsRefetch,
    loading: clientsLoading
  } = useTypedQuery(
    {
      identidades_Clientes: [
        {
          order_by: [{ created_at: 'desc' }],
          where: {
            deleted_at: { _is_null: true }
          }
        },
        {
          Id: true,
          Pessoa: {
            Nome: true
          }
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  return (
    <ClientContext.Provider
      value={{
        clientsData: clientsData?.identidades_Clientes,
        clientsRefetch,
        clientsLoading
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

export const useClient = () => {
  return useContext(ClientContext)
}
