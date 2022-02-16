import {
  useTypedLazyQuery,
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
import { $, useTypedMutation } from '&crm/graphql/generated/zeus/apollo'
import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  LazyQueryResult,
  MutationFunctionOptions,
  OperationVariables,
  QueryLazyOptions
} from '@apollo/client'
import { order_by } from '&crm/graphql/generated/zeus'
import * as yup from 'yup'

type ViewContextProps = {
  slidePanelState: SlidePanelStateType
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>
  comboData?: {
    Produtos: {
      Id: string
      Produto: {
        Id: string
        Nome: string
        ProdutosQueDependo: {
          Id: string
          ProdutoDependente: { Nome: string }
        }[]
        Servicos_Produtos: {
          Id: string
          Servico: {
            Nome: string
          }
        }[]
        Fornecedores: {
          Id: string
          Precos: {
            Valor: string
            TipoDePreco?: { Valor: string; Comentario: string }
          }[]
        }[]
      }
    }[]
    Id: string
    Nome: string
    Planos: {
      Id: string
      PlanoPreco: {
        Id: string
        ValorDeAdesao: string
        ValorDeRecorrencia: string
      }
      Plano: {
        Nome: string
        Precos: {
          Id: string
          ValorDeAdesao: string
          ValorDeRecorrencia: string
        }[]
      }
    }[]
    Servicos: {
      Id: string
      Servico: {
        Id: string
        Nome: string
        Produtos_Servicos: { Id: string; Produto: { Nome: string } }[]

        servicosServicos: {
          Id: string
          Servico: {
            Nome: string
          }
        }[]

        PrestadoresDeServicos: {
          Id: string
          Precos: {
            Valor: string
            TipoDePreco?: { Valor: string; Comentario: string }
          }[]
        }[]
      }
    }[]
    Precos: { Id: string; ValorDeAdesao: string; ValorDeRecorrencia: string }[]
  }
  comboRefetch: () => void
  comboLoading: boolean
  createComboService: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_Combos_Servicos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createComboServiceLoading: boolean
  createComboPlan: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_Combos_Planos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createComboPlanLoading: boolean
  createComboProduct: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_Combos_Produtos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createComboProductLoading: boolean
  createComboPrice: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_Combos_Precos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createComboPriceLoading: boolean
  softDeleteComboPlan: (
    options?: MutationFunctionOptions<
      {
        update_comercial_Combos_Planos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  softDeleteComboPlanLoading: boolean
  softDeleteComboProduct: (
    options?: MutationFunctionOptions<
      {
        update_comercial_Combos_Produtos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  softDeleteComboProductLoading: boolean
  softDeleteComboService: (
    options?: MutationFunctionOptions<
      {
        update_comercial_Combos_Servicos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  softDeleteComboServiceLoading: boolean
  updateCombo: (
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
  updateComboLoading: boolean
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
        TipoDePreco?: { Valor: string; Comentario: string }
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
          TipoDePreco?: { Valor: string; Comentario: string }
        }[]
      }[]
    }
    Fornecedores: {
      Precos: {
        Id: string
        Valor: string
        TipoDePreco?: { Valor: string; Comentario: string }
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
  runPlanQuery: (
    options?: QueryLazyOptions<OperationVariables>
  ) => Promise<LazyQueryResult<unknown, OperationVariables>>
  plansData: {
    Id: string
    Nome: string
    Precos: {
      Id: string
      ValorDeAdesao: string
      ValorDeRecorrencia: string
    }[]
  }[]
  plansRefetch: () => void
  plansLoading: boolean
  comboSchema: yup.AnyObjectSchema
}

type SlidePanelStateType = {
  open: boolean
  type: 'service' | 'product' | 'plan'
}

type ProviderProps = {
  children: ReactNode
}

export const ViewContext = createContext<ViewContextProps>(
  {} as ViewContextProps
)

export const ViewProvider = ({ children }: ProviderProps) => {
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelStateType>({
    open: false,
    type: 'service'
  })
  const router = useRouter()
  const [createComboService, { loading: createComboServiceLoading }] =
    useTypedMutation({
      insert_comercial_Combos_Servicos_one: [
        {
          object: {
            Combo_Id: router.query.id,
            Servico_Id: $`Servico_Id`
          }
        },
        { Id: true }
      ]
    })

  const [createComboPlan, { loading: createComboPlanLoading }] =
    useTypedMutation({
      insert_comercial_Combos_Planos_one: [
        {
          object: {
            Combo_Id: router.query.id,
            Plano_Id: $`Plano_Id`,
            PlanoPreco_Id: $`PlanoPreco_Id`
          }
        },
        { Id: true }
      ]
    })

  const [createComboProduct, { loading: createComboProductLoading }] =
    useTypedMutation({
      insert_comercial_Combos_Produtos_one: [
        {
          object: {
            Combo_Id: router.query.id,
            Produto_Id: $`Produto_Id`
          }
        },
        { Id: true }
      ]
    })

  const [createComboPrice, { loading: createComboPriceLoading }] =
    useTypedMutation({
      insert_comercial_Combos_Precos_one: [
        {
          object: {
            Combo_Id: router.query.id,
            ValorDeAdesao: $`ValorDeAdesao`,
            ValorDeRecorrencia: $`ValorDeRecorrencia`
          }
        },
        { Id: true }
      ]
    })

  const [updateCombo, { loading: updateComboLoading }] = useTypedMutation({
    update_comercial_Combos_by_pk: [
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

  const [softDeleteComboPlan, { loading: softDeleteComboPlanLoading }] =
    useTypedMutation({
      update_comercial_Combos_Planos_by_pk: [
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

  const [softDeleteComboProduct, { loading: softDeleteComboProductLoading }] =
    useTypedMutation({
      update_comercial_Combos_Produtos_by_pk: [
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

  const [softDeleteComboService, { loading: softDeleteComboServiceLoading }] =
    useTypedMutation({
      update_comercial_Combos_Servicos_by_pk: [
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
                {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true, Comentario: true }
                }
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
                {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true, Comentario: true }
                }
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
                  {
                    Id: true,
                    Valor: true,
                    TipoDePreco: { Valor: true, Comentario: true }
                  }
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

  const [
    runPlanQuery,
    { data: plansData, refetch: plansRefetch, loading: plansLoading }
  ] = useTypedLazyQuery(
    {
      comercial_Planos: [
        {
          where: {
            deleted_at: { _is_null: true },
            Precos: {}
          }
        },
        {
          Id: true,
          Nome: true,
          Precos: [
            { order_by: [{ created_at: order_by.desc }] },
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

  const {
    data: comboData,
    refetch: comboRefetch,
    loading: comboLoading
  } = useTypedQuery(
    {
      comercial_Combos_by_pk: [
        { Id: router.query.id },
        {
          Id: true,
          Nome: true,
          Planos: [
            {
              where: { deleted_at: { _is_null: true } }
            },
            {
              Id: true,
              PlanoPreco: {
                Id: true,
                ValorDeAdesao: true,
                ValorDeRecorrencia: true
              },
              Plano: {
                Nome: true,
                Precos: [
                  { order_by: [{ created_at: order_by.desc }] },
                  {
                    Id: true,
                    ValorDeAdesao: true,
                    ValorDeRecorrencia: true
                  }
                ]
              }
            }
          ],
          Produtos: [
            {
              where: { deleted_at: { _is_null: true } }
            },
            {
              Id: true,
              Produto: {
                Id: true,
                Nome: true,
                ProdutosQueDependo: [
                  {
                    where: {
                      deleted_at: { _is_null: true }
                    }
                  },
                  {
                    Id: true,
                    ProdutoDependente: { Nome: true }
                  }
                ],
                Servicos_Produtos: [
                  {
                    where: {
                      deleted_at: { _is_null: true }
                    }
                  },
                  {
                    Id: true,
                    Servico: {
                      Nome: true
                    }
                  }
                ],
                Fornecedores: [
                  {},
                  {
                    Id: true,
                    Precos: [
                      { order_by: [{ created_at: order_by.desc }] },
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
          Servicos: [
            {
              where: { deleted_at: { _is_null: true } }
            },
            {
              Id: true,
              Servico: {
                Id: true,
                Nome: true,
                Produtos_Servicos: [
                  {
                    where: {
                      deleted_at: { _is_null: true }
                    }
                  },
                  { Id: true, Produto: { Nome: true } }
                ],
                servicosServicos: [
                  {
                    where: {
                      deleted_at: { _is_null: true }
                    }
                  },
                  {
                    Id: true,
                    Servico: {
                      Nome: true
                    }
                  }
                ],
                PrestadoresDeServicos: [
                  {},
                  {
                    Id: true,
                    Precos: [
                      { order_by: [{ created_at: order_by.desc }] },
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
              where: { Combo_Id: { _eq: router.query.id } },
              order_by: [{ created_at: order_by.desc }]
            },
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
    <ViewContext.Provider
      value={{
        comboData: comboData?.comercial_Combos_by_pk,
        comboRefetch,
        comboLoading,
        createComboService,
        createComboServiceLoading,
        createComboPlan,
        createComboPlanLoading,
        createComboProduct,
        createComboProductLoading,
        createComboPrice,
        createComboPriceLoading,
        softDeleteComboPlan,
        softDeleteComboPlanLoading,
        softDeleteComboProduct,
        softDeleteComboProductLoading,
        softDeleteComboService,
        softDeleteComboServiceLoading,
        slidePanelState,
        setSlidePanelState,
        updateCombo,
        updateComboLoading,
        comboSchema,
        runServiceQuery,
        servicesData: servicesData?.comercial_Servicos,
        servicesRefetch,
        servicesLoading,
        runProductQuery,
        productsData: productsData?.comercial_Produtos,
        productsRefetch,
        productsLoading,
        runPlanQuery,
        plansData: plansData?.comercial_Planos,
        plansRefetch,
        plansLoading
      }}
    >
      {children}
    </ViewContext.Provider>
  )
}

export const useView = () => {
  return useContext(ViewContext)
}
