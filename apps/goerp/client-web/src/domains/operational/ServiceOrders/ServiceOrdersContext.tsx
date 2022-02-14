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
  useState
} from 'react'
import * as yup from 'yup'

type ServiceOrdersContextProps = {
  slidePanelState: SlidePanelStateType
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>
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
      Colaborador: {
        Pessoa: {
          Nome: string
        }
      }
    }[]

    CodigoIdentificador: number
  }[]

  serviceOrdersRefetch: () => void
  serviceOrdersLoading: boolean

  vehiclesData?: {
    Id: string
    Apelido?: string
    NumeroDoChassi?: string
    Placa?: string
  }[]
  refetch: () => void
  loading: boolean

  serviceOrdersTypesData?: {
    Comentario: string
    Valor: string
  }[]
  serviceOrdersTypesRefetch: () => void
  serviceOrdersTypesLoading: boolean
  proposalsData?: Proposal[]
  proposalsLoading: boolean
  proposalsRefetch: () => void
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
  serviceOrderschema: yup.AnyObjectSchema
  getActiveVehicleById: (
    Cliente_Id: string,
    Veiculo_Id: string
  ) => Promise<
    {
      Produtos: {
        Id: string
        ProdutoPreco_Id: string
        Produto_Id: string
        Ativo: boolean
      }[]
      Id: string
      Beneficios: {
        Id: string
        Portfolio_Id: string
        PortfolioPreco_Id: string
        TipoPortfolio: string
      }[]
      Servicos: {
        Id: string
        Ativo: boolean
        Servico_Id: string
        ServicoPreco_Id: string
      }[]
    }[]
  >
  configData: {
    Valor: string[]
  }
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

type ProviderProps = {
  children: ReactNode
}

type SlidePanelStateType = {
  data?: GraphQLTypes['comercial_Produtos'] | null
  open: boolean
}

export const ServiceOrderContext = createContext<ServiceOrdersContextProps>(
  {} as ServiceOrdersContextProps
)

export const ServiceOrderProvider = ({ children }: ProviderProps) => {
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelStateType>({
    open: false
  })

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

  const {
    data: proposalsData,
    refetch: proposalsRefetch,
    loading: proposalsLoading
  } = useTypedQuery(
    {
      propostas_Propostas: [
        {
          where: {
            Situacao: { Valor: { _eq: 'aceito' } },
            deleted_at: { _is_null: true }
          }
        },
        {
          Id: true,
          Cliente_Id: true,
          Veiculos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Veiculo_Id: true,
              PropostasCombos: [
                {
                  where: { deleted_at: { _is_null: true } }
                },
                {
                  Id: true,
                  PropostaVeiculo_Id: true,
                  created_at: true,
                  Combo: {
                    Id: true,
                    Servicos: [
                      { where: { deleted_at: { _is_null: true } } },
                      {
                        Servico: {
                          GeraOS: true,
                          Id: true
                        },
                        ServicosPreco: {
                          Id: true
                        }
                      }
                    ],
                    Produtos: [
                      { where: { deleted_at: { _is_null: true } } },
                      {
                        Id: true,
                        Produto: {
                          Id: true,
                          ServicoDeDesinstalacao: {
                            Id: true,
                            PrestadoresDeServicos: [
                              { where: { deleted_at: { _is_null: true } } },
                              {
                                Prestador_Id: true,
                                Precos: [
                                  {
                                    where: { deleted_at: { _is_null: true } },
                                    order_by: [{ created_at: order_by.desc }]
                                  },
                                  {
                                    Id: true
                                  }
                                ]
                              }
                            ]
                          }
                        },
                        ProdutoPreco: {
                          Id: true,
                          TipoDeRecorrencia_Id: true
                        }
                      }
                    ],
                    Planos: [
                      { where: { deleted_at: { _is_null: true } } },
                      {
                        Id: true,
                        created_at: true,
                        Plano: {
                          Id: true,
                          Produtos: [
                            { where: { deleted_at: { _is_null: true } } },
                            {
                              Produto: {
                                Id: true,
                                ServicoDeDesinstalacao: {
                                  Id: true,
                                  PrestadoresDeServicos: [
                                    {
                                      where: { deleted_at: { _is_null: true } }
                                    },
                                    {
                                      Prestador_Id: true,
                                      Precos: [
                                        {
                                          where: {
                                            deleted_at: { _is_null: true }
                                          }
                                        },
                                        {
                                          Id: true
                                        }
                                      ]
                                    }
                                  ]
                                }
                              },
                              ProdutoPreco: {
                                Id: true,
                                TipoDeRecorrencia_Id: true
                              }
                            }
                          ],
                          Servicos: [
                            { where: { deleted_at: { _is_null: true } } },
                            {
                              Id: true,
                              created_at: true,
                              Servico: {
                                Id: true,
                                Nome: true,
                                GeraOS: true
                              },
                              ServicoPreco: {
                                Id: true,
                                created_at: true
                              }
                            }
                          ]
                        },
                        PlanoPreco: {
                          Id: true
                        }
                      }
                    ]
                  },
                  ComboPreco_Id: true
                }
              ],
              PropostasPlanos: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Id: true,
                  created_at: true,
                  Plano: {
                    Id: true,
                    Produtos: [
                      { where: { deleted_at: { _is_null: true } } },
                      {
                        Produto: {
                          Id: true,
                          ServicoDeDesinstalacao: {
                            Id: true,
                            PrestadoresDeServicos: [
                              { where: { deleted_at: { _is_null: true } } },
                              {
                                Prestador_Id: true,
                                Precos: [
                                  {
                                    where: { deleted_at: { _is_null: true } }
                                  },
                                  {
                                    Id: true
                                  }
                                ]
                              }
                            ]
                          }
                        },
                        ProdutoPreco: {
                          Id: true,
                          TipoDeRecorrencia_Id: true
                        }
                      }
                    ],
                    Servicos: [
                      { where: { deleted_at: { _is_null: true } } },
                      {
                        Id: true,
                        created_at: true,
                        Servico: {
                          Id: true,
                          Nome: true,
                          GeraOS: true
                        },
                        ServicoPreco: {
                          Id: true,
                          created_at: true
                        }
                      }
                    ]
                  },
                  PlanoPreco: {
                    Id: true
                  }
                }
              ],
              PropostasProdutos: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Id: true,
                  ProdutoPreco: {
                    Id: true,
                    TipoDeRecorrencia_Id: true
                  },
                  Produto: {
                    Id: true,
                    ServicoDeDesinstalacao: {
                      Id: true,
                      PrestadoresDeServicos: [
                        { where: { deleted_at: { _is_null: true } } },
                        {
                          Prestador_Id: true,
                          Precos: [
                            {
                              where: { deleted_at: { _is_null: true } }
                            },
                            {
                              Id: true
                            }
                          ]
                        }
                      ]
                    }
                  },
                  PropostaVeiculo_Id: true,
                  created_at: true
                }
              ],
              PropostasServicos: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Id: true,
                  created_at: true,
                  Servico: {
                    Id: true,
                    Nome: true,
                    GeraOS: true
                  },
                  ServicosPreco: {
                    Id: true,
                    created_at: true
                  }
                }
              ]
            }
          ],
          created_at: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const {
    data: vehiclesData,
    refetch: vehiclesRefetch,
    loading: vehiclesLoading
  } = useTypedQuery(
    {
      clientes_Veiculos: [
        {
          order_by: [{ created_at: order_by.desc }],
          where: { deleted_at: { _is_null: true } }
        },
        {
          Id: true,
          Apelido: true,
          Placa: true,
          NumeroDoChassi: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  async function getActiveVehicleById(Cliente_Id: string, Veiculo_Id: string) {
    const { data } = await useTypedClientQuery({
      clientes_VeiculosAtivos: [
        {
          where: {
            deleted_at: { _is_null: true },
            Cliente_Id: { _eq: Cliente_Id },
            Veiculo_Id: { _eq: Veiculo_Id }
          }
        },
        {
          Id: true,
          Beneficios: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              Portfolio_Id: true,
              PortfolioPreco_Id: true,
              TipoPortfolio: true
            }
          ],
          Produtos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              Ativo: true,
              Produto_Id: true,
              ProdutoPreco_Id: true
            }
          ],
          Servicos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              Ativo: true,
              Servico_Id: true,
              ServicoPreco_Id: true
            }
          ]
        }
      ]
    })
    return data.clientes_VeiculosAtivos
  }

  const serviceOrderschema = yup.object().shape({
    Tipo: yup.object().required('Selecione um tipo para continuar'),
    Proposta: yup.object().required('Selecione uma proposta para continuar'),
    Veiculo: yup.object().required('Selecione um veiculo para continuar')
  })

  return (
    <ServiceOrderContext.Provider
      value={{
        slidePanelState,
        setSlidePanelState,
        serviceOrdersData: serviceOrdersData?.operacional_OrdemDeServico,
        serviceOrdersRefetch,
        serviceOrdersLoading,
        serviceOrdersTypesData:
          serviceOrdersTypesData?.operacional_OrdemDeServico_Tipo,
        serviceOrdersTypesRefetch,
        serviceOrdersTypesLoading,
        proposalsData: proposalsData?.propostas_Propostas,
        proposalsLoading,
        proposalsRefetch,
        createServiceOrder,
        createServiceOrderLoading,
        softDeleteServiceOrderLoading,
        softDeleteServiceOrder,
        serviceOrderschema,
        vehiclesData: vehiclesData?.clientes_Veiculos,
        refetch: vehiclesRefetch,
        loading: vehiclesLoading,
        getActiveVehicleById,
        configData: configData?.Configuracoes_by_pk
      }}
    >
      {children}
    </ServiceOrderContext.Provider>
  )
}

export const useServiceOrder = () => {
  return useContext(ServiceOrderContext)
}
