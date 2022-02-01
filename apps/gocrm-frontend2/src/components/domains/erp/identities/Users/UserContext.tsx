import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client'
import { GraphQLTypes } from '&test/graphql/generated/zeus'
import {
  $,
  useTypedMutation,
  useTypedQuery
} from '&test/graphql/generated/zeus/apollo'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'
import * as yup from 'yup'

type UserContextProps = {
  slidePanelState: SlidePanelStateType
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>
  collaboratorsData?: {
    Id: string
    Pessoa: {
      Nome: string
    }
  }[]
  usersData?: {
    Id: string
    Cliente?: {
      Id: string
      Pessoa: {
        Nome: string
      }
    }
    Colaborador?: {
      Id: string
      Pessoa: {
        Nome: string
      }
    }
  }[]
  collaboratorsRefetch: () => void
  usersLoading: boolean
  usersRefetch: () => void
  createUser: (
    options?: MutationFunctionOptions<
      {
        insert_autenticacao_Usuarios_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createUserLoading: boolean
  softDeleteUserLoading: boolean
  softDeleteUser: (
    options?: MutationFunctionOptions<
      {
        update_autenticacao_Usuarios_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  updateUserLoading: boolean
  updateUser: (
    options?: MutationFunctionOptions<
      {
        update_autenticacao_Usuarios_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>

  userSchema: yup.AnyObjectSchema
}

type ProviderProps = {
  children: ReactNode
}

type SlidePanelStateType = {
  type: 'create' | 'update'
  data?: GraphQLTypes['autenticacao_Usuarios'] | null
  open: boolean
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
)

export const UserProvider = ({ children }: ProviderProps) => {
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelStateType>({
    type: 'create',
    open: false
  })

  const [createUser, { loading: createUserLoading }] = useTypedMutation({
    insert_autenticacao_Usuarios_one: [
      {
        object: {
          Cliente_Id: $`Cliente_Id`,
          Colaborador_Id: $`Colaborador_Id`
        }
      },
      { Id: true }
    ]
  })

  const [updateUser, { loading: updateUserLoading }] = useTypedMutation({
    update_autenticacao_Usuarios_by_pk: [
      {
        pk_columns: { Id: $`Id` },
        _set: {
          Cliente_Id: $`Cliente_Id`,
          Colaborador_Id: $`Colaborador_Id`,
          updated_at: new Date()
        }
      },
      { Id: true }
    ]
  })

  const [softDeleteUser, { loading: softDeleteUserLoading }] = useTypedMutation(
    {
      update_autenticacao_Usuarios_by_pk: [
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
    data: usersData,
    refetch: usersRefetch,
    loading: usersLoading
  } = useTypedQuery(
    {
      autenticacao_Usuarios: [
        {
          order_by: [{ created_at: 'desc' }],
          where: { deleted_at: { _is_null: true } }
        },
        {
          Id: true,
          Cliente: {
            Id: true,
            Pessoa: {
              Nome: true
            }
          },
          Colaborador: {
            Id: true,
            Pessoa: {
              Nome: true
            }
          }
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const { data: collaboratorsData, refetch: collaboratorsRefetch } =
    useTypedQuery(
      {
        identidades_Colaboradores: [
          {
            order_by: [{ created_at: 'desc' }],
            where: { deleted_at: { _is_null: true } }
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

  const userSchema = yup.object().shape({
    Colaborador_Id: yup.object(),
    Cliente_Id: yup.object()
  })

  return (
    <UserContext.Provider
      value={{
        slidePanelState,
        setSlidePanelState,
        collaboratorsData: collaboratorsData?.identidades_Colaboradores,
        collaboratorsRefetch,
        usersData: usersData?.autenticacao_Usuarios,
        usersRefetch,
        usersLoading,
        createUser,
        createUserLoading,
        softDeleteUserLoading,
        softDeleteUser,
        updateUserLoading,
        updateUser,
        userSchema
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
