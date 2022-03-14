import {
  clientes_VeiculosAtivos_Situacao_enum,
  identidades_Clientes_Documentos_Situacoes_enum,
  order_by
} from '&crm/graphql/generated/zeus'
import {
  useTypedMutation,
  useTypedQuery,
  $
} from '&crm/graphql/generated/zeus/apollo'
import * as utils from '@comigo/utils'
import * as yup from 'yup'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'
import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client'

type ClientContextProps = {
  clientsData?: {
    Id: string
    Pessoa: {
      Nome: string
      DadosDaApi: unknown
      Documentos: {
        Nome: string
      }[]
    }
    VeiculosAtivos: {
      Veiculo_Id: string
    }[]
    VeiculosAtivos_aggregate: {
      aggregate?: {
        count: number
      }
    }
  }[]
  clientsRefetch: () => void
  clientsLoading: boolean
  createClient: (
    options?: MutationFunctionOptions<
      {
        CadastrarCliente?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createClientLoading: boolean
  slidePanelState: SlidePanelStateType
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>
  CPFSchema: yup.AnyObjectSchema
  CNPJSchema: yup.AnyObjectSchema
}

type ProviderProps = {
  children: ReactNode
}

type SlidePanelStateType = {
  open: boolean
}

export const ClientContext = createContext<ClientContextProps>(
  {} as ClientContextProps
)

export const ClientProvider = ({ children }: ProviderProps) => {
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelStateType>({
    open: false
  })

  const [createClient, { loading: createClientLoading }] = useTypedMutation({
    CadastrarCliente: [
      {
        Identificador: $`Identificador`,
        PessoaJuridica: $`PessoaJuridica`
      },
      {
        Id: true
      }
    ]
  })

  const {
    data: clientsData,
    refetch: clientsRefetch,
    loading: clientsLoading
  } = useTypedQuery(
    {
      identidades_Clientes: [
        {
          order_by: [{ created_at: order_by.desc }],
          where: {
            deleted_at: { _is_null: true }
          }
        },
        {
          Id: true,
          Pessoa: {
            Nome: true,
            DadosDaApi: [{}, true],
            Documentos: [
              {
                where: {
                  deleted_at: { _is_null: true },
                  Situacao_Id: {
                    _eq: identidades_Clientes_Documentos_Situacoes_enum.aprovado
                  }
                }
              },
              {
                Nome: true
              }
            ]
          },
          VeiculosAtivos: [
            {
              where: {
                deleted_at: { _is_null: true }
              }
            },
            {
              Veiculo_Id: true
            }
          ],
          VeiculosAtivos_aggregate: [
            {
              where: {
                deleted_at: { _is_null: true },
                Situacao_Id: {
                  _eq: clientes_VeiculosAtivos_Situacao_enum.ativo
                }
              }
            },
            {
              aggregate: {
                count: [{ columns: undefined, distinct: undefined }, true]
              }
            }
          ]
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const CPFSchema = yup.object().shape({
    Identificador: yup
      .string()
      .required('Preencha o campo para continuar')
      .test('equal', 'Complete todos os campos', (val: string | undefined) => {
        return val?.toString().substring(13, 15) !== '_'
      })
      .test('equal', 'Digite um cpf válido', (val: string | undefined) => {
        return utils.CPFValidation(val as string)
      })
  })

  const CNPJSchema = yup.object().shape({
    Identificador: yup
      .string()
      .required('Preencha o campo para continuar')
      .test('equal', 'Complete todos os campos', (val: string | undefined) => {
        return val?.toString().substring(17, 18) !== '_'
      })
      .test('equal', 'Digite um cnpj válido', (val: string | undefined) => {
        return utils.CNPJValidation(val as string)
      })
  })

  return (
    <ClientContext.Provider
      value={{
        clientsData: clientsData?.identidades_Clientes,
        clientsRefetch,
        clientsLoading,
        createClient,
        createClientLoading,
        slidePanelState,
        setSlidePanelState,
        CPFSchema,
        CNPJSchema
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

export const useClient = () => {
  return useContext(ClientContext)
}
