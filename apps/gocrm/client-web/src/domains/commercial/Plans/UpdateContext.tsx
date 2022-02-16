import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  LazyQueryResult,
  MutationFunctionOptions,
  OperationVariables,
  QueryLazyOptions
} from '@apollo/client'
import {
  $,
  useTypedLazyQuery,
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
import { order_by } from '&crm/graphql/generated/zeus'

type UpdateContextProps = {
  slidePanelState: SlidePanelStateType
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>
  plansData?: {
    Id: string
    Nome: string
    Servicos: {
      Id: string
      Servico: {
        Nome: string
        PrestadoresDeServicos: {
          Precos: {
            Valor: string
            TipoDePreco?: { Valor: string; Comentario: string }
          }[]
        }[]
      }
    }[]
    Produtos: {
      Id: string
      Produto: {
        Nome: string
        Fornecedores: {
          Precos: {
            Valor: string
            TipoDePreco?: { Valor: string; Comentario: string }
          }[]
        }[]
      }
    }[]

    Precos: {
      Id: string
      ValorDeAdesao: string
      ValorDeRecorrencia: string
    }[]
  }

  plansRefetch: () => void
  plansLoading: boolean
  runServiceQuery: (
    options?: QueryLazyOptions<OperationVariables>
  ) => Promise<LazyQueryResult<unknown, OperationVariables>>
  servicesData: {
    Id: string
    Nome: string
    GeraOS: boolean
    PrestadoresDeServicos: {
      Precos: {
        Id: string
        Valor: string
      }[]
    }[]
    Tipo: {
      Valor: string
      Comentario: string
    }
  }[]
  servicesRefetch: () => void
  servicesLoading: boolean
  runProductQuery: (
    options?: QueryLazyOptions<OperationVariables>
  ) => Promise<LazyQueryResult<unknown, OperationVariables>>
  productsData: {
    Id: string
    Nome: string
    ServicoDeInstalacao?: {
      Id: string
      Nome: string
      PrestadoresDeServicos: {
        Precos: {
          Id: string
          Valor: string
        }[]
      }[]
    }
    Fornecedores: {
      Precos: {
        Id: string
        Valor: string
      }[]
    }[]
    Tipo: {
      Valor: string
      Comentario: string
    }
    Categorias: string[]
  }[]
  productsRefetch: () => void
  productsLoading: boolean
  createPlanPrice: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_Planos_Precos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createPlanPriceLoading: boolean
  createProductPlan: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_Planos_Produtos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createProductPlanLoading: boolean
  createServicePlan: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_Planos_Servicos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createServicePlanLoading: boolean
  updatePlan: (
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
  updatePlanLoading: boolean
  planSchema: yup.AnyObjectSchema
}

type SlidePanelStateType = {
  open: boolean
  type: 'service' | 'product'
}

type ProviderProps = {
  children: ReactNode
}

export const UpdateContext = createContext<UpdateContextProps>(
  {} as UpdateContextProps
)

export const UpdateProvider = ({ children }: ProviderProps) => {
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelStateType>({
    open: false,
    type: 'service'
  })
  const router = useRouter()

  const [createPlanPrice, { loading: createPlanPriceLoading }] =
    useTypedMutation({
      insert_comercial_Planos_Precos_one: [
        {
          object: {
            ValorDeAdesao: $`ValorDeAdesao`,
            ValorDeRecorrencia: $`ValorDeRecorrencia`,
            Plano_Id: router.query.id
          }
        },
        { Id: true }
      ]
    })

  const [updatePlan, { loading: updatePlanLoading }] = useTypedMutation({
    update_comercial_Planos_by_pk: [
      {
        pk_columns: {
          Id: router.query.id
        },
        _set: {
          updated_at: new Date(),
          Nome: $`Nome`
        }
      },
      { Id: true }
    ]
  })

  const [createProductPlan, { loading: createProductPlanLoading }] =
    useTypedMutation({
      insert_comercial_Planos_Produtos_one: [
        {
          object: {
            Plano_Id: router.query.id,
            Produto_Id: $`Produto_Id`
          }
        },
        { Id: true }
      ]
    })

  const [createServicePlan, { loading: createServicePlanLoading }] =
    useTypedMutation({
      insert_comercial_Planos_Servicos_one: [
        {
          object: {
            Plano_Id: router.query.id,
            Servico_Id: $`Servico_Id`
          }
        },
        { Id: true }
      ]
    })

  const [
    runServiceQuery,
    { data: servicesData, refetch: servicesRefetch, loading: servicesLoading }
  ] = useTypedLazyQuery(
    {
      comercial_Servicos: [
        {
          where: {
            deleted_at: { _is_null: true },
            PrestadoresDeServicos: { Precos: {} }
          }
        },
        {
          Id: true,
          Nome: true,
          GeraOS: true,
          PrestadoresDeServicos: [
            {},
            {
              Precos: [
                { order_by: [{ created_at: order_by.desc }] },
                { Id: true, Valor: true }
              ]
            }
          ],
          Tipo: {
            Valor: true,
            Comentario: true
          }
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const [
    runProductQuery,
    { data: productsData, refetch: productsRefetch, loading: productsLoading }
  ] = useTypedLazyQuery(
    {
      comercial_Produtos: [
        {
          where: {
            deleted_at: { _is_null: true },
            Fornecedores: { Precos: {} }
          }
        },
        {
          Id: true,
          Nome: true,
          Fornecedores: [
            {},
            {
              Precos: [
                { order_by: [{ created_at: order_by.desc }] },
                { Id: true, Valor: true }
              ]
            }
          ],
          ServicoDeInstalacao: {
            Id: true,
            Nome: true,
            PrestadoresDeServicos: [
              {},
              {
                Precos: [
                  { order_by: [{ created_at: order_by.desc }] },
                  { Id: true, Valor: true }
                ]
              }
            ]
          },
          Tipo: {
            Valor: true,
            Comentario: true
          },
          Categorias: [{}, true]
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const {
    data: plansData,
    refetch: plansRefetch,
    loading: plansLoading
  } = useTypedQuery(
    {
      comercial_Planos_by_pk: [
        {
          Id: router.query.id
        },
        {
          Id: true,
          Nome: true,
          Servicos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              Servico: {
                Nome: true,
                PrestadoresDeServicos: [
                  {
                    where: {
                      Prestador_Id: {
                        _eq: '6fde7f19-6697-4076-befc-b9b73f03b3f5'
                      },
                      deleted_at: { _is_null: true }
                    }
                  },
                  {
                    Precos: [
                      {
                        order_by: [{ created_at: order_by.desc }]
                      },
                      {
                        Valor: true,
                        TipoDePreco: { Valor: true, Comentario: true }
                      }
                    ]
                  }
                ]
              }
            }
          ],
          Produtos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              Produto: {
                Nome: true,
                Fornecedores: [
                  {
                    where: {
                      deleted_at: { _is_null: true },
                      Fornecedor_Id: {
                        _eq: '6fde7f19-6697-4076-befc-b9b73f03b3f5'
                      }
                    }
                  },
                  {
                    Precos: [
                      {
                        order_by: [{ created_at: order_by.desc }]
                      },
                      {
                        Valor: true,
                        TipoDePreco: { Valor: true, Comentario: true }
                      }
                    ]
                  }
                ]
              }
            }
          ],
          Precos: [
            {
              where: { Plano_Id: { _eq: router.query.id } },
              order_by: [{ created_at: order_by.desc }]
            },
            {
              Id: true,
              ValorDeAdesao: true,
              ValorDeRecorrencia: true
            }
          ]
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const planSchema = yup.object().shape({
    Nome: yup.string().required('Preencha o campo para continuar')
  })

  return (
    <UpdateContext.Provider
      value={{
        planSchema,
        plansData: plansData?.comercial_Planos_by_pk,
        plansRefetch,
        plansLoading,
        createPlanPrice,
        createPlanPriceLoading,
        updatePlan,
        updatePlanLoading,
        runServiceQuery,
        servicesData: servicesData?.comercial_Servicos,
        servicesRefetch,
        servicesLoading,
        runProductQuery,
        productsData: productsData?.comercial_Produtos,
        productsRefetch,
        productsLoading,
        slidePanelState,
        setSlidePanelState,
        createProductPlan,
        createProductPlanLoading,
        createServicePlan,
        createServicePlanLoading
      }}
    >
      {children}
    </UpdateContext.Provider>
  )
}

export const useUpdate = () => {
  return useContext(UpdateContext)
}
