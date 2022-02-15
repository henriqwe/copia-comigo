import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client'
import {
  GraphQLTypes,
  operacional_OrdemDeServico_Situacoes_enum,
  order_by
} from '&erp/graphql/generated/zeus'
import {
  $,
  useTypedClientQuery,
  useTypedMutation,
  useTypedQuery
} from '&erp/graphql/generated/zeus/apollo'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'

type ServiceOrdersContextProps = {
  serviceOrdersData?: {
    Id: string
    Situacao: {
      Comentario: string
    }
    Tipo: {
      Comentario: string
    }
    Agendamentos: {
      Agendamento: Date
      Colaborador?: {
        Pessoa: {
          Nome: string
        }
      }
    }[]

    CodigoIdentificador: number
  }[]

  serviceOrdersRefetch: () => void
  serviceOrdersLoading: boolean

  serviceOrdersTypesData?: {
    Comentario: string
    Valor: string
  }[]
  serviceOrdersTypesRefetch: () => void
  serviceOrdersTypesLoading: boolean
  createServiceOrder: (
    options?: MutationFunctionOptions<
      {
        insert_operacional_OrdemDeServico_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createServiceOrderLoading: boolean
  softDeleteServiceOrderLoading: boolean
  softDeleteServiceOrder: (
    options?: MutationFunctionOptions<
      {
        update_operacional_OrdemDeServico_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  configData: {
    Valor: string[]
  }
  filteredOSs?: FilteredOSs
  filters: { limit: number; offset: number; currentPage: number; where: any }
  setFilters: Dispatch<
    SetStateAction<{
      limit: number
      offset: number
      currentPage: number
      where: any
    }>
  >
}

export type Proposal = {
  Id: string
  Cliente_Id?: string
  Veiculos: {
    Veiculo_Id?: string
    PropostasCombos: {
      Id: string
      PropostaVeiculo_Id?: string
      created_at: Date
      Combo: {
        Id: string
        Servicos: {
          Servico: {
            GeraOS: boolean
            Id: string
          }
          ServicosPreco: {
            Id: string
          }
        }[]
        Produtos: {
          Id: string
          Produto: {
            Id: string
            ServicoDeDesinstalacao?: {
              Id: string
              PrestadoresDeServicos: {
                Prestador_Id: string
                Precos: {
                  Id: string
                }[]
              }[]
            }
          }
          ProdutoPreco: {
            Id: string
            TipoDeRecorrencia_Id?: string
          }
        }[]
        Planos: {
          Id: string
          created_at: Date
          Plano: {
            Id: string
            Produtos: {
              Produto: {
                Id: string
                ServicoDeDesinstalacao?: {
                  Id: string
                  PrestadoresDeServicos: {
                    Prestador_Id: string
                    Precos: {
                      Id: string
                    }[]
                  }[]
                }
              }
              ProdutoPreco: {
                Id: string
                TipoDeRecorrencia_Id: string
              }
            }[]

            Servicos: {
              Id: string
              created_at: Date
              Servico: {
                Id: string
                Nome: string
                GeraOS: boolean
              }
              ServicoPreco: {
                Id: string
                created_at: Date
              }
            }[]
          }
          PlanoPreco: {
            Id: string
          }
        }[]
      }
      ComboPreco_Id: string
    }[]

    PropostasPlanos: {
      Id: string
      created_at: Date
      Plano: {
        Id: string
        Produtos: {
          Produto: {
            Id: string
            ServicoDeDesinstalacao?: {
              Id: string
              PrestadoresDeServicos: {
                Prestador_Id: string
                Precos: {
                  Id: string
                }[]
              }[]
            }
          }
          ProdutoPreco: {
            Id: string
            TipoDeRecorrencia_Id: string
          }
        }[]

        Servicos: {
          Id: string
          created_at: Date
          Servico: {
            Id: string
            Nome: string
            GeraOS: boolean
          }
          ServicoPreco: {
            Id: string
            created_at: Date
          }
        }[]
      }
      PlanoPreco: {
        Id: string
      }
    }[]

    PropostasProdutos: {
      Id: string
      ProdutoPreco: {
        Id: string
        TipoDeRecorrencia_Id?: string
      }
      Produto: {
        Id: string
        ServicoDeDesinstalacao?: {
          Id: string
          PrestadoresDeServicos: {
            Prestador_Id: string
            Precos: {
              Id: string
            }[]
          }[]
        }
      }
      PropostaVeiculo_Id?: string
      created_at: Date
    }[]

    PropostasServicos: {
      Id: string
      created_at: Date
      Servico: {
        Id: string
        Nome: string
        GeraOS: boolean
      }
      ServicosPreco: {
        Id: string
        created_at: Date
      }
    }[]
  }[]
  created_at: Date
}

type ServiceOrder = {
  Id: string
  Situacao: {
    Comentario: string
  }
  Tipo: {
    Comentario: string
  }
  Agendamentos: {
    Agendamento: Date
    Colaborador?: {
      Pessoa: {
        Nome: string
      }
    }
  }[]

  CodigoIdentificador: number
}

type FilteredOSs = {
  operacional_OrdemDeServico: ServiceOrder[]
  operacional_OrdemDeServico_aggregate: {
    aggregate?: {
      count: number
    }
    nodes: {
      Id: string
    }[]
  }
}

type ProviderProps = {
  children: ReactNode
}

export const ServiceOrderContext = createContext<ServiceOrdersContextProps>(
  {} as ServiceOrdersContextProps
)

export const ServiceOrderProvider = ({ children }: ProviderProps) => {
  const [filters, setFilters] = useState({
    limit: 10,
    offset: 0,
    currentPage: 1,
    where: { deleted_at: { _is_null: true } }
  })
  const [filteredOSs, setFilteredOSs] = useState<FilteredOSs>()

  const [createServiceOrder, { loading: createServiceOrderLoading }] =
    useTypedMutation({
      insert_operacional_OrdemDeServico_one: [
        {
          object: {
            Situacao_Id: operacional_OrdemDeServico_Situacoes_enum.aberta,
            Proposta_Id: $`Proposta_Id`,
            Veiculo_Id: $`Veiculo_Id`,
            Tipo_Id: $`Tipo_Id`,
            Atividades: {
              data: [
                {
                  Situacao_Id: operacional_OrdemDeServico_Situacoes_enum.aberta,
                  Usuario_Id: '7fd2e5d7-a4c4-485b-8675-e56052e3ff5f'
                }
              ]
            },
            Beneficios: {
              data: $`Beneficios`
            },
            Servicos: {
              data: $`Servicos`
            },
            Produtos: {
              data: $`Produtos`
            }
          }
        },
        { Id: true }
      ]
    })

  const [softDeleteServiceOrder, { loading: softDeleteServiceOrderLoading }] =
    useTypedMutation({
      update_operacional_OrdemDeServico_by_pk: [
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

  const { data: configData } = useTypedQuery(
    {
      Configuracoes_by_pk: [
        {
          Slug: 'prestadorPrecos'
        },
        {
          Valor: [{}, true]
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const {
    data: serviceOrdersData,
    refetch: serviceOrdersRefetch,
    loading: serviceOrdersLoading
  } = useTypedQuery(
    {
      operacional_OrdemDeServico: [
        {
          order_by: [{ created_at: order_by.desc }],
          where: { deleted_at: { _is_null: true } }
        },
        {
          Id: true,
          Situacao: {
            Comentario: true
          },
          Tipo: {
            Comentario: true
          },
          Agendamentos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Agendamento: true,
              Colaborador: {
                Pessoa: {
                  Nome: true
                }
              }
            }
          ],
          CodigoIdentificador: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const {
    data: serviceOrdersTypesData,
    refetch: serviceOrdersTypesRefetch,
    loading: serviceOrdersTypesLoading
  } = useTypedQuery(
    {
      operacional_OrdemDeServico_Tipo: [
        {},
        {
          Comentario: true,
          Valor: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  async function getFilteredOSs() {
    const { data } = await useTypedClientQuery(
      {
        operacional_OrdemDeServico: [
          {
            order_by: [{ created_at: order_by.desc }],
            where: filters.where,
            limit: filters.limit,
            offset: filters.offset
          },
          {
            Id: true,
            Situacao: {
              Comentario: true
            },
            Tipo: {
              Comentario: true
            },
            Agendamentos: [
              { where: { deleted_at: { _is_null: true } } },
              {
                Agendamento: true,
                Colaborador: {
                  Pessoa: {
                    Nome: true
                  }
                }
              }
            ],
            CodigoIdentificador: true
          }
        ],
        operacional_OrdemDeServico_aggregate: [
          {
            where: filters.where
          },
          {
            aggregate: {
              count: [{ columns: undefined, distinct: undefined }, true]
            },
            nodes: {
              Id: true
            }
          }
        ]
      },
      { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
    )
    setFilteredOSs(data)
  }

  useEffect(() => {
    getFilteredOSs()
  }, [filters, serviceOrdersData])

  return (
    <ServiceOrderContext.Provider
      value={{
        serviceOrdersData: serviceOrdersData?.operacional_OrdemDeServico,
        serviceOrdersRefetch,
        serviceOrdersLoading,
        serviceOrdersTypesData:
          serviceOrdersTypesData?.operacional_OrdemDeServico_Tipo,
        serviceOrdersTypesRefetch,
        serviceOrdersTypesLoading,
        createServiceOrder,
        createServiceOrderLoading,
        softDeleteServiceOrderLoading,
        softDeleteServiceOrder,
        configData: configData?.Configuracoes_by_pk,
        filteredOSs,
        filters,
        setFilters
      }}
    >
      {children}
    </ServiceOrderContext.Provider>
  )
}

export const useServiceOrder = () => {
  return useContext(ServiceOrderContext)
}
