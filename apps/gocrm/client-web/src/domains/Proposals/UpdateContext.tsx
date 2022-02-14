import {
  order_by,
  propostas_Propostas_Situacoes_enum
} from '&crm/graphql/generated/zeus'
import {
  useTypedLazyQuery,
  useTypedMutation,
  useTypedQuery,
  $,
  useTypedClientQuery
} from '&crm/graphql/generated/zeus/apollo'
import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  LazyQueryResult,
  MutationFunctionOptions,
  OperationVariables,
  QueryLazyOptions
} from '@apollo/client'
import { useRouter } from 'next/router'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'
import { BooleanLiteral } from 'typescript'

type UpdateContextProps = {
  client: Client
  setClient: Dispatch<SetStateAction<Client>>
  vehiclesData?: {
    Id: string
    Apelido?: string
    Placa?: string
    NumeroDoChassi?: string
  }[]

  vehiclesRefetch: () => void
  vehiclesLoading: boolean
  slidePanelState: SlidePanel
  setSlidePanelState: Dispatch<SetStateAction<SlidePanel>>
  categories: {
    title: string
    type: string
    id?: number
  }[]
  setCategories: Dispatch<SetStateAction<unknown>>
  selectedCategory: {
    title: string
    type: string
    id?: number
  }
  setSelectedCategory: Dispatch<SetStateAction<unknown>>
  servicesData: {
    Id: string
    Nome: string
    Tipo: {
      Valor: string
      Comentario: string
    }
    PrestadoresDeServicos: {
      Precos: {
        Id: string
        Valor: string
      }[]
    }[]
  }[]
  servicesRefetch: () => void
  servicesLoading: boolean
  runServiceQuery: (
    options?: QueryLazyOptions<OperationVariables>
  ) => Promise<LazyQueryResult<unknown, OperationVariables>>
  productsData: {
    Id: string
    Categorias: string[]
    Nome: string
    Tipo: {
      Valor: string
      Comentario: string
    }
    Fornecedores: {
      Precos: {
        Id: string
        Valor: string
      }[]
    }[]

    ServicoDeInstalacao?: {
      Id: string
      Nome: string
      PrestadoresDeServicos: {
        Precos: { Id: string; Valor: string }[]
      }[]
    }
  }[]
  productsRefetch: () => void
  productsLoading: boolean
  runProductQuery: (
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
  runPlanQuery: (
    options?: QueryLazyOptions<OperationVariables>
  ) => Promise<LazyQueryResult<unknown, OperationVariables>>
  combosData: {
    Id: string
    Nome: string
    Precos: {
      Id: string
    }[]
  }[]
  combosRefetch: () => void
  combosLoading: boolean
  runComboQuery: (
    options?: QueryLazyOptions<OperationVariables>
  ) => Promise<LazyQueryResult<unknown, OperationVariables>>
  runPaymentTypeQuery: (
    options?: QueryLazyOptions<OperationVariables>
  ) => Promise<LazyQueryResult<unknown, OperationVariables>>
  paymentTypesData: {
    Valor: string
    Comentario: string
  }[]
  paymentTypesRefetch: () => void
  paymentTypesLoading: boolean
  runPaymentDayQuery: (
    options?: QueryLazyOptions<OperationVariables>
  ) => Promise<LazyQueryResult<unknown, OperationVariables>>
  paymentDayData?: {
    Valor: string
    Comentario: string
  }[]
  paymentDayRefetch: () => void
  paymentDayLoading: boolean
  proposalData: {
    FormaDePagamentoDaAdesao_Id?: string
    Situacao: {
      Comentario: string
    }
    Cliente_Id?: string
    Planos: {
      Plano: {
        Id: string
        Nome: string
      }
      PlanoPreco: {
        ValorDeAdesao: string
        ValorDeRecorrencia: string
      }
    }[]
    Servicos: {
      Servico: {
        Id: string
        Nome: string
      }
      ServicosPreco: {
        Valor: string
        TipoDePreco?: { Valor: string }
      }
    }[]
    Produtos: {
      Produto: { Id: string; Nome: string }
      ProdutoPreco: { Valor: string; TipoDePreco?: { Valor: string } }
    }[]
    Combos: {
      Combo: {
        Id: string
        Nome: string
      }
      ComboPreco: {
        ValorDeAdesao: string
        ValorDeRecorrencia: string
      }
    }[]
    Veiculos: {
      Id: string
      Veiculo_Id?: string
      PropostasServicos: {
        Servico: {
          Id: string
          Nome: string
        }
        ServicosPreco: {
          Valor?: string
          TipoDePreco?: { Valor: string }
        }
      }[]
      PropostasProdutos: {
        Produto: { Id: string; Nome: string }
        ProdutoPreco: { Valor?: string; TipoDePreco?: { Valor: string } }
      }[]
      PropostasPlanos: {
        Plano: {
          Id: string
          Nome: string
          Produtos: {
            Produto: { Id: string; Nome: string }
            ProdutoPreco: { Valor?: string; TipoDePreco?: { Valor: string } }
          }[]
          Servicos: {
            Servico: { Id: string; Nome: string }
            ServicoPreco: { Valor?: string; TipoDePreco?: { Valor: string } }
          }[]
        }
        PlanoPreco: {
          ValorDeAdesao: string
          ValorDeRecorrencia: string
        }
      }[]
      PropostasCombos: {
        Combo: {
          Nome: string
          Planos: {
            Plano: {
              Id: string
              Nome: string
              Produtos: {
                Produto: { Id: string; Nome: string }
                ProdutoPreco: {
                  Valor?: string
                  TipoDePreco?: { Valor: string }
                }
              }[]
              Servicos: {
                Servico: { Id: string; Nome: string }
                ServicoPreco: {
                  Valor?: string
                  TipoDePreco?: { Valor: string }
                }
              }[]
            }
          }[]
          Produtos: {
            Produto: { Id: string; Nome: string }
            ProdutoPreco: { Valor?: string; TipoDePreco?: { Valor: string } }
          }[]
          Servicos: {
            Servico: { Id: string; Nome: string }
            ServicosPreco: { Valor?: string; TipoDePreco?: { Valor: string } }
          }[]
        }
        ComboPreco: {
          ValorDeAdesao: string
          ValorDeRecorrencia: string
        }
      }[]
    }[]
  }
  proposalLoading: boolean
  proposalRefetch: () => void
  insertProposalService: (
    options?: MutationFunctionOptions<
      {
        insert_propostas_Propostas_Servicos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  insertProposalServiceLoading: boolean
  insertProposalProduct: (
    options?: MutationFunctionOptions<
      {
        insert_propostas_Propostas_Produtos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  insertProposalProductLoading: boolean
  insertProposalPlan: (
    options?: MutationFunctionOptions<
      {
        insert_propostas_Propostas_Planos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  insertProposalPlanLoading: boolean
  insertProposalCombo: (
    options?: MutationFunctionOptions<
      {
        insert_propostas_Propostas_Combos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  insertProposalComboLoading: boolean
  insertProposalUpSelling: (
    options?: MutationFunctionOptions<
      {
        insert_propostas_Propostas_Oportunidades_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  insertProposalUpSellingLoading: boolean
  insertProposalVehicle: (
    options?: MutationFunctionOptions<
      {
        insert_propostas_Propostas_Veiculos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  insertProposalVehicleLoading: boolean
  insertProposalPaymentType: (
    options?: MutationFunctionOptions<
      {
        update_propostas_Propostas_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  insertProposalPaymentTypeLoading: boolean
  insertClientPaymentType: (
    options?: MutationFunctionOptions<
      {
        update_identidades_Clientes_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  insertClientPaymentTypeLoading: boolean
  createVehicle: (
    options?: MutationFunctionOptions<
      {
        insert_clientes_Veiculos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createVehicleLoading: boolean
  acceptProposal: (
    options?: MutationFunctionOptions<
      {
        update_propostas_Propostas_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  acceptProposalLoading: boolean
  refuseProposal: (
    options?: MutationFunctionOptions<
      {
        update_propostas_Propostas_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  refuseProposalLoading: boolean
  getVehicleById: (Id: string) => Promise<{
    Id: string
    Apelido?: string
    Placa?: string
    NumeroDoChassi?: string
  }>
  getClientById: (Id: string) => Promise<{
    Id: string
    Pessoa: {
      DadosDaApi: {
        emails: {
          email: string
        }[]
        enderecos: {
          bairro: string
          cidade: string
          complemento: string
          estado: string
          logradouro: string
          numero: string
          pontoDeReferencia: string
        }[]
      }
      Nome: string
    }
    FormaDePagamento_Id?: string
    DiaDeFaturamento_Id?: string
  }>
  getPaymentTypeById: (Valor: string) => Promise<{
    Valor: string
    Comentario: string
  }>
  getPaymentDayById: (Valor: string) => Promise<{
    Valor: string
    Comentario: string
  }>
  getClientProposalsByClientId: (Id: string) => Promise<
    {
      Id: string
    }[]
  >
  paymentType: PaymentType
  setPaymentType: Dispatch<SetStateAction<PaymentType>>
  clientPaymentType: PaymentType
  setClientPaymentType: Dispatch<SetStateAction<PaymentType>>
  disabledUpdateClientPaymentType: boolean
  setDisabledUpdateClientPaymentType: Dispatch<SetStateAction<boolean>>
}

type Client = {
  Id: string
  Pessoa: {
    DadosDaApi: {
      emails: {
        email: string
      }[]
      enderecos: {
        bairro: string
        cidade: string
        complemento: string
        estado: string
        logradouro: string
        numero: string
        pontoDeReferencia: string
      }[]
    }
    Nome: string
  }
  FormaDePagamento_Id?: string
  DiaDeFaturamento_Id?: string
}

type ProviderProps = {
  children: ReactNode
}

type SlidePanel = {
  type:
    | 'proposalVehicle'
    | 'createVehicle'
    | 'proposalService'
    | 'proposalProduct'
    | 'proposalPlan'
    | 'proposalCombo'
    | 'paymentType'
    | 'clientPaymentType'
  open: boolean
}

type PaymentType = {
  Valor: string
  Comentario: string
}

export const UpdateContext = createContext<UpdateContextProps>(
  {} as UpdateContextProps
)

export const UpdateProvider = ({ children }: ProviderProps) => {
  const router = useRouter()
  const [slidePanelState, setSlidePanelState] = useState<SlidePanel>({
    open: false,
    type: 'proposalVehicle'
  })
  const [client, setClient] = useState<Client>()
  const [paymentType, setPaymentType] = useState<PaymentType>()
  const [clientPaymentType, setClientPaymentType] = useState<PaymentType>()
  const [disabledUpdateClientPaymentType, setDisabledUpdateClientPaymentType] =
    useState(false)

  const [categories, setCategories] = useState([
    {
      title: 'Resumo',
      type: 'Resume'
    },
    {
      title: 'Geral',
      type: 'General'
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  const [insertProposalVehicle, { loading: insertProposalVehicleLoading }] =
    useTypedMutation({
      insert_propostas_Propostas_Veiculos_one: [
        {
          object: {
            Veiculo_Id: $`Veiculo_Id`,
            Proposta_Id: router.query.id
          }
        },
        {
          Id: true
        }
      ]
    })

  const [
    insertProposalPaymentType,
    { loading: insertProposalPaymentTypeLoading }
  ] = useTypedMutation({
    update_propostas_Propostas_by_pk: [
      {
        pk_columns: { Id: router.query.id },
        _set: {
          FormaDePagamentoDaAdesao_Id: $`FormaDePagamentoDaAdesao_Id`,
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })

  const [insertClientPaymentType, { loading: insertClientPaymentTypeLoading }] =
    useTypedMutation({
      update_identidades_Clientes_by_pk: [
        {
          pk_columns: { Id: $`Id` },
          _set: {
            DiaDeFaturamento_Id: $`DiaDeFaturamento_Id`,
            FormaDePagamento_Id: $`FormaDePagamento_Id`,
            updated_at: new Date()
          }
        },
        {
          Id: true
        }
      ]
    })

  const [acceptProposal, { loading: acceptProposalLoading }] = useTypedMutation(
    {
      update_propostas_Propostas_by_pk: [
        {
          pk_columns: { Id: router.query.id },
          _set: {
            Situacao_Id: propostas_Propostas_Situacoes_enum.aceito,
            DataAceito: new Date(),
            updated_at: new Date()
          }
        },
        {
          Id: true
        }
      ]
    }
  )

  const [refuseProposal, { loading: refuseProposalLoading }] = useTypedMutation(
    {
      update_propostas_Propostas_by_pk: [
        {
          pk_columns: { Id: router.query.id },
          _set: {
            Situacao_Id: propostas_Propostas_Situacoes_enum.recusado,
            updated_at: new Date()
          }
        },
        {
          Id: true
        }
      ]
    }
  )

  const [createVehicle, { loading: createVehicleLoading }] = useTypedMutation({
    insert_clientes_Veiculos_one: [
      {
        object: {
          Placa: $`Placa`,
          Categoria_Id: $`Categoria_Id`,
          Cliente_Id: $`Cliente_Id`,
          DadosDaApi: $`DadosDaApi`,
          Apelido: $`Apelido`,
          NumeroDoChassi: $`NumeroDoChassi`
        }
      },
      { Id: true }
    ]
  })

  const [insertProposalService, { loading: insertProposalServiceLoading }] =
    useTypedMutation({
      insert_propostas_Propostas_Servicos_one: [
        {
          object: {
            Servico_Id: $`Servico_Id`,
            ServicosPreco_Id: $`ServicosPreco_Id`,
            Proposta_Id: router.query.id,
            PropostaVeiculo_Id: $`PropostaVeiculo_Id`
          }
        },
        {
          Id: true
        }
      ]
    })

  const [insertProposalProduct, { loading: insertProposalProductLoading }] =
    useTypedMutation({
      insert_propostas_Propostas_Produtos_one: [
        {
          object: {
            ProdutoPreco_Id: $`ProdutoPreco_Id`,
            Produto_Id: $`Produto_Id`,
            Proposta_Id: router.query.id,
            PropostaVeiculo_Id: $`PropostaVeiculo_Id`
          }
        },
        {
          Id: true
        }
      ]
    })

  const [insertProposalPlan, { loading: insertProposalPlanLoading }] =
    useTypedMutation({
      insert_propostas_Propostas_Planos_one: [
        {
          object: {
            PlanoPreco_Id: $`PlanoPreco_Id`,
            Plano_Id: $`Plano_Id`,
            Proposta_Id: router.query.id,
            PropostaVeiculo_Id: $`PropostaVeiculo_Id`
          }
        },
        {
          Id: true
        }
      ]
    })

  const [insertProposalCombo, { loading: insertProposalComboLoading }] =
    useTypedMutation({
      insert_propostas_Propostas_Combos_one: [
        {
          object: {
            ComboPreco_Id: $`ComboPreco_Id`,
            Combo_Id: $`Combo_Id`,
            Proposta_Id: router.query.id,
            PropostaVeiculo_Id: $`PropostaVeiculo_Id`
          }
        },
        {
          Id: true
        }
      ]
    })

  const [insertProposalUpSelling, { loading: insertProposalUpSellingLoading }] =
    useTypedMutation({
      insert_propostas_Propostas_Oportunidades_one: [
        {
          object: {
            OportunidadeProduto_Id: $`OportunidadeProduto_Id`,
            OportunidadeServico_Id: $`OportunidadeServico_Id`,
            Proposta_Id: router.query.id,
            PropostaVeiculo_Id: $`PropostaVeiculo_Id`
          }
        },
        {
          Id: true
        }
      ]
    })

  const {
    data: vehiclesData,
    refetch: vehiclesRefetch,
    loading: vehiclesLoading
  } = useTypedQuery(
    {
      clientes_Veiculos: [
        {
          order_by: [{ created_at: order_by.desc }],
          where: {
            deleted_at: { _is_null: true }
          }
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

  const [
    runPaymentTypeQuery,
    {
      data: paymentTypesData,
      refetch: paymentTypesRefetch,
      loading: paymentTypesLoading
    }
  ] = useTypedLazyQuery(
    {
      vendas_TiposDePagamento: [
        {},
        {
          Comentario: true,
          Valor: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const [
    runServiceQuery,
    { data: servicesData, refetch: servicesRefetch, loading: servicesLoading }
  ] = useTypedLazyQuery(
    {
      comercial_Servicos: [
        {
          order_by: [{ created_at: order_by.desc }],
          where: {
            deleted_at: { _is_null: true },
            PrestadoresDeServicos: { Precos: {} }
          }
        },
        {
          Id: true,
          Nome: true,
          Tipo: {
            Valor: true,
            Comentario: true
          },
          PrestadoresDeServicos: [
            {
              where: { deleted_at: { _is_null: true } }
            },
            {
              Precos: [
                {
                  where: { deleted_at: { _is_null: true } },
                  order_by: [{ created_at: order_by.desc }]
                },
                {
                  Id: true,
                  Valor: true
                }
              ]
            }
          ]
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
          order_by: [{ created_at: order_by.desc }],
          where: {
            deleted_at: { _is_null: true },
            Fornecedores: { Precos: {} }
          }
        },
        {
          Id: true,
          Nome: true,
          Categorias: [{}, true],
          Tipo: {
            Valor: true,
            Comentario: true
          },
          Fornecedores: [
            {},
            {
              Precos: [
                {
                  where: { deleted_at: { _is_null: true } },
                  order_by: [{ created_at: order_by.desc }]
                },
                {
                  Id: true,
                  Valor: true
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
                  { Id: true, Valor: true }
                ]
              }
            ]
          }
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
          order_by: [{ created_at: order_by.desc }],
          where: { deleted_at: { _is_null: true } }
        },
        {
          Id: true,
          Nome: true,
          Precos: [
            {
              where: { deleted_at: { _is_null: true } },
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

  const [
    runComboQuery,
    { data: combosData, refetch: combosRefetch, loading: combosLoading }
  ] = useTypedLazyQuery(
    {
      comercial_Combos: [
        { where: { deleted_at: { _is_null: true } } },
        {
          Id: true,
          Nome: true,
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
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const [
    runPaymentDayQuery,
    {
      data: paymentDayData,
      refetch: paymentDayRefetch,
      loading: paymentDayLoading
    }
  ] = useTypedLazyQuery(
    {
      vendas_DiasDeFaturamento: [
        {},
        {
          Valor: true,
          Comentario: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const {
    data: proposalData,
    loading: proposalLoading,
    refetch: proposalRefetch
  } = useTypedQuery({
    propostas_Propostas_by_pk: [
      {
        Id: router.query.id
      },
      {
        Situacao: {
          Comentario: true
        },
        FormaDePagamentoDaAdesao_Id: true,
        Cliente_Id: true,
        Planos: [
          {
            where: {
              deleted_at: { _is_null: true },
              PropostaVeiculo_Id: { _is_null: true }
            }
          },
          {
            Plano: {
              Id: true,
              Nome: true
            },
            PlanoPreco: {
              ValorDeAdesao: true,
              ValorDeRecorrencia: true
            }
          }
        ],
        Servicos: [
          {
            where: {
              deleted_at: { _is_null: true },
              PropostaVeiculo_Id: { _is_null: true }
            }
          },
          {
            Servico: {
              Id: true,
              Nome: true
            },
            ServicosPreco: {
              Valor: true,
              TipoDePreco: { Valor: true }
            }
          }
        ],
        Produtos: [
          {
            where: {
              deleted_at: { _is_null: true },
              PropostaVeiculo_Id: { _is_null: true }
            }
          },
          {
            Produto: { Id: true, Nome: true },
            ProdutoPreco: { Valor: true, TipoDePreco: { Valor: true } }
          }
        ],
        Combos: [
          {
            where: {
              deleted_at: { _is_null: true },
              PropostaVeiculo_Id: { _is_null: true }
            }
          },
          {
            Combo: {
              Id: true,
              Nome: true
            },
            ComboPreco: {
              ValorDeAdesao: true,
              ValorDeRecorrencia: true
            }
          }
        ],
        Veiculos: [
          { where: { deleted_at: { _is_null: true } } },
          {
            Id: true,
            Veiculo_Id: true,
            PropostasServicos: [
              {
                where: { deleted_at: { _is_null: true } }
              },
              {
                Servico: {
                  Id: true,
                  Nome: true
                },
                ServicosPreco: {
                  Valor: true,
                  TipoDePreco: { Valor: true }
                }
              }
            ],
            PropostasProdutos: [
              { where: { deleted_at: { _is_null: true } } },
              {
                Produto: { Id: true, Nome: true },
                ProdutoPreco: { Valor: true, TipoDePreco: { Valor: true } }
              }
            ],
            PropostasPlanos: [
              { where: { deleted_at: { _is_null: true } } },
              {
                Plano: {
                  Id: true,
                  Nome: true,
                  Produtos: [
                    { where: { deleted_at: { _is_null: true } } },
                    {
                      Produto: { Id: true, Nome: true },
                      ProdutoPreco: {
                        Valor: true,
                        TipoDePreco: { Valor: true }
                      }
                    }
                  ],
                  Servicos: [
                    { where: { deleted_at: { _is_null: true } } },
                    {
                      Servico: { Id: true, Nome: true },
                      ServicoPreco: {
                        Valor: true,
                        TipoDePreco: { Valor: true }
                      }
                    }
                  ]
                },
                PlanoPreco: {
                  ValorDeAdesao: true,
                  ValorDeRecorrencia: true
                }
              }
            ],
            PropostasCombos: [
              { where: { deleted_at: { _is_null: true } } },
              {
                Combo: {
                  Nome: true,
                  Planos: [
                    { where: { deleted_at: { _is_null: true } } },
                    {
                      Plano: {
                        Id: true,
                        Nome: true,
                        Produtos: [
                          { where: { deleted_at: { _is_null: true } } },
                          {
                            Produto: { Id: true, Nome: true },
                            ProdutoPreco: {
                              Valor: true,
                              TipoDePreco: { Valor: true }
                            }
                          }
                        ],
                        Servicos: [
                          { where: { deleted_at: { _is_null: true } } },
                          {
                            Servico: { Id: true, Nome: true },
                            ServicoPreco: {
                              Valor: true,
                              TipoDePreco: { Valor: true }
                            }
                          }
                        ]
                      }
                    }
                  ],
                  Produtos: [
                    { where: { deleted_at: { _is_null: true } } },
                    {
                      Produto: { Id: true, Nome: true },
                      ProdutoPreco: {
                        Valor: true,
                        TipoDePreco: { Valor: true }
                      }
                    }
                  ],
                  Servicos: [
                    { where: { deleted_at: { _is_null: true } } },
                    {
                      Servico: { Id: true, Nome: true },
                      ServicosPreco: {
                        Valor: true,
                        TipoDePreco: { Valor: true }
                      }
                    }
                  ]
                },
                ComboPreco: {
                  ValorDeAdesao: true,
                  ValorDeRecorrencia: true
                }
              }
            ]
          }
        ]
      }
    ]
  })

  async function getPaymentTypeById(Valor: string) {
    const { data } = await useTypedClientQuery(
      {
        vendas_TiposDePagamento_by_pk: [
          { Valor },
          {
            Comentario: true,
            Valor: true
          }
        ]
      },
      { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
    )
    return data.vendas_TiposDePagamento_by_pk
  }

  async function getPaymentDayById(Valor: string) {
    const { data } = await useTypedClientQuery(
      {
        vendas_DiasDeFaturamento_by_pk: [
          { Valor },
          {
            Comentario: true,
            Valor: true
          }
        ]
      },
      { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
    )
    return data.vendas_DiasDeFaturamento_by_pk
  }

  async function getVehicleById(Id: string) {
    const { data } = await useTypedClientQuery(
      {
        clientes_Veiculos_by_pk: [
          { Id },
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
    return data.clientes_Veiculos_by_pk
  }

  async function getClientById(Id: string) {
    const { data } = await useTypedClientQuery(
      {
        identidades_Clientes_by_pk: [
          { Id },
          {
            Id: true,
            Pessoa: {
              DadosDaApi: [{}, true],
              Nome: true
            },
            FormaDePagamento_Id: true,
            DiaDeFaturamento_Id: true
          }
        ]
      },
      { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
    )
    return data.identidades_Clientes_by_pk
  }

  async function getClientProposalsByClientId(Id: string) {
    const { data } = await useTypedClientQuery(
      {
        propostas_Propostas: [
          {
            where: { deleted_at: { _is_null: true }, Cliente_Id: { _eq: Id } }
          },
          {
            Id: true
          }
        ]
      },
      { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
    )
    return data.propostas_Propostas
  }

  return (
    <UpdateContext.Provider
      value={{
        vehiclesData: vehiclesData?.clientes_Veiculos,
        vehiclesRefetch,
        vehiclesLoading,
        slidePanelState,
        setSlidePanelState,
        categories,
        setCategories,
        servicesData: servicesData?.comercial_Servicos,
        servicesRefetch,
        servicesLoading,
        runServiceQuery,
        productsData: productsData?.comercial_Produtos,
        productsRefetch,
        productsLoading,
        runProductQuery,
        plansData: plansData?.comercial_Planos,
        plansRefetch,
        plansLoading,
        runPlanQuery,
        combosData: combosData?.comercial_Combos,
        combosRefetch,
        combosLoading,
        runComboQuery,
        proposalData: proposalData?.propostas_Propostas_by_pk,
        proposalLoading,
        proposalRefetch,
        insertProposalService,
        insertProposalServiceLoading,
        insertProposalProduct,
        insertProposalProductLoading,
        insertProposalPlan,
        insertProposalPlanLoading,
        insertProposalCombo,
        insertProposalComboLoading,
        insertProposalUpSelling,
        insertProposalUpSellingLoading,
        insertProposalVehicle,
        insertProposalVehicleLoading,
        selectedCategory,
        setSelectedCategory,
        createVehicle,
        createVehicleLoading,
        getVehicleById,
        getClientById,
        client,
        setClient,
        acceptProposal,
        acceptProposalLoading,
        refuseProposal,
        refuseProposalLoading,
        runPaymentTypeQuery,
        paymentTypesData: paymentTypesData?.vendas_TiposDePagamento,
        paymentTypesRefetch,
        paymentTypesLoading,
        insertProposalPaymentType,
        insertProposalPaymentTypeLoading,
        insertClientPaymentType,
        insertClientPaymentTypeLoading,
        getPaymentTypeById,
        paymentType,
        setPaymentType,
        clientPaymentType,
        setClientPaymentType,
        getClientProposalsByClientId,
        disabledUpdateClientPaymentType,
        setDisabledUpdateClientPaymentType,
        runPaymentDayQuery,
        paymentDayData: paymentDayData?.vendas_DiasDeFaturamento,
        paymentDayRefetch,
        paymentDayLoading,
        getPaymentDayById
      }}
    >
      {children}
    </UpdateContext.Provider>
  )
}

export const useUpdate = () => {
  return useContext(UpdateContext)
}
