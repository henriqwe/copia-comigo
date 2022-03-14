import {
  identidades_Clientes_Documentos_Situacoes_enum,
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
import { ProposalsDataType } from './types/proposal'
import * as utils from '@comigo/utils'
import * as yup from 'yup'
import { Clienttype } from './types/client'
import { LeadType } from './types/lead'

type UpdateContextProps = {
  client: Clienttype
  setClient: Dispatch<SetStateAction<Clienttype>>
  vehiclesData?: {
    Id: string
    Apelido?: string
    Placa?: string
    NumeroDoChassi?: string
    VeiculosAtivos: {
      Id: string
      Situacao_Id: string
    }[]
  }[]

  vehiclesRefetch: () => void
  vehiclesLoading: boolean
  slidePanelState: SlidePanel
  setSlidePanelState: Dispatch<SetStateAction<SlidePanel>>
  tabsForPage: {
    title: string
    type: string
    id?: number
  }[]
  setTabsForPage: Dispatch<SetStateAction<unknown>>
  selectedTab: {
    title: string
    type: string
    id?: number
  }
  setSelectedTab: Dispatch<SetStateAction<unknown>>
  servicesData: {
    Id: string
    Nome: string
    Tipo: {
      Valor: string
      Comentario: string
    }
    RegrasETermosDeUsos: {
      Id: string
      Mensagem: string
    }[]
    PrestadoresDeServicos: {
      Precos: {
        Id: string
        Valor: string
        TipoDePreco?: { Valor: string }
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
    RegrasETermosDeUsos: {
      Id: string
      Mensagem: string
    }[]
    Fornecedores: {
      Precos: {
        Id: string
        Valor: string
        TipoDePreco?: { Valor: string }
      }[]
    }[]

    ServicoDeInstalacao?: {
      Id: string
      Nome: string
      RegrasETermosDeUsos: {
        Id: string
        Mensagem: string
      }[]
      PrestadoresDeServicos: {
        Precos: { Id: string; Valor: string; TipoDePreco?: { Valor: string } }[]
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
    Produtos: {
      Produto: {
        RegrasETermosDeUsos: {
          Id: string
          Mensagem: string
        }[]
      }
    }[]
    Servicos: {
      Servico: {
        RegrasETermosDeUsos: {
          Id: string
          Mensagem: string
        }[]
      }
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
    Planos: {
      Plano: {
        Id: string
        Produtos: {
          Produto: {
            Id: string
            RegrasETermosDeUsos: {
              Id: string
              Mensagem: string
            }[]
          }
        }[]
        Servicos: {
          Servico: {
            Id: string
            RegrasETermosDeUsos: {
              Id: string
              Mensagem: string
            }[]
          }
        }[]
      }
    }[]

    Produtos: {
      Produto: {
        Id: string
        RegrasETermosDeUsos: {
          Id: string
          Mensagem: string
        }[]
      }
    }[]
    Servicos: {
      Servico: {
        Id: string
        RegrasETermosDeUsos: {
          Id: string
          Mensagem: string
        }[]
      }
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
  proposalData: ProposalsDataType
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
  insertProposalAlert: (
    options?: MutationFunctionOptions<
      {
        insert_propostas_Propostas_RegrasETermosDeUso_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  insertProposalAlertLoading: boolean
  updateProposalAlert: (
    options?: MutationFunctionOptions<
      {
        update_propostas_Propostas_RegrasETermosDeUso_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  updateProposalAlertLoading: boolean
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
  insertOnlyClientPaymentType: (
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
  insertOnlyClientPaymentTypeLoading: boolean

  insertOnlyClientInvoiceDate: (
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
  insertOnlyClientInvoiceDateLoading: boolean

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
  getClientById: (Id: string) => Promise<Clienttype>
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
      Situacao_Id: string
    }[]
  >
  paymentType: PaymentType
  setPaymentType: Dispatch<SetStateAction<PaymentType>>
  clientPaymentType: PaymentType
  setClientPaymentType: Dispatch<SetStateAction<PaymentType>>
  disabledUpdateClientPaymentType: boolean
  setDisabledUpdateClientPaymentType: Dispatch<SetStateAction<boolean>>
  hasDependencies: boolean
  setHasDependencies: Dispatch<SetStateAction<boolean>>
  currentStage: number
  setCurrentStage: Dispatch<SetStateAction<number>>

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
  CPFSchema: yup.AnyObjectSchema
  CNPJSchema: yup.AnyObjectSchema
  insertClientToProposal: (
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
  insertClientToProposalLoading: boolean
  getClientPhonesByClientId: (Id: string) => Promise<
    {
      Id: string
      Telefone: string
    }[]
  >
  getClientAddressByClientId: (Id: string) => Promise<
    {
      Id: string
      Bairro: string
      Cep?: string
      Numero?: string
      Logradouro: string
      Cidade: {
        Nome: string
      }
      Estado: {
        Nome: string
      }
    }[]
  >
  getClientEmailsByClientId: (Id: string) => Promise<
    {
      Id: string
      Email: string
    }[]
  >
  getLeadById: (Id: string) => Promise<{
    Nome: string
    Email: string
    Telefone: string
    Id: string
  }>
  lead: LeadType
  setLead: Dispatch<SetStateAction<LeadType>>
  runClientQuery: (options?: QueryLazyOptions<OperationVariables>) => Promise<
    LazyQueryResult<
      {
        identidades_Clientes: {
          Id: string
          Pessoa: {
            Nome: string
          }
        }[]
      },
      OperationVariables
    >
  >
  clientData: {
    Id: any
    Pessoa: {
      Nome: string
    }
  }[]
  clientRefetch: () => void
  clientLoading: boolean
  createProductSchema: yup.AnyObjectSchema
  createPlanSchema: yup.AnyObjectSchema
  createServiceSchema: yup.AnyObjectSchema
  createComboSchema: yup.AnyObjectSchema
  createVehicleSchema: yup.AnyObjectSchema
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
    | 'linkClient'
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
  const [currentStage, setCurrentStage] = useState(0)
  const [client, setClient] = useState<Clienttype>()
  const [lead, setLead] = useState<LeadType>()
  const [paymentType, setPaymentType] = useState<PaymentType>()
  const [clientPaymentType, setClientPaymentType] = useState<PaymentType>()
  const [disabledUpdateClientPaymentType, setDisabledUpdateClientPaymentType] =
    useState(false)
  const [hasDependencies, setHasDependencies] = useState<boolean>()

  const [tabsForPage, setTabsForPage] = useState([
    {
      title: 'Resumo',
      type: 'Resume'
    },
    {
      title: 'Venda avulsa',
      type: 'General'
    }
  ])

  const [selectedTab, setSelectedTab] = useState(tabsForPage[0])

  const [insertProposalVehicle, { loading: insertProposalVehicleLoading }] =
    useTypedMutation({
      insert_propostas_Propostas_Veiculos_one: [
        {
          object: {
            Veiculo_Id: $`Veiculo_Id`,
            Proposta_Id: router.query.id,
            PossuiGNV: $`PossuiGNV`
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
  const [
    insertOnlyClientPaymentType,
    { loading: insertOnlyClientPaymentTypeLoading }
  ] = useTypedMutation({
    update_identidades_Clientes_by_pk: [
      {
        pk_columns: { Id: $`Id` },
        _set: {
          FormaDePagamento_Id: $`FormaDePagamento_Id`,
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })
  const [
    insertOnlyClientInvoiceDate,
    { loading: insertOnlyClientInvoiceDateLoading }
  ] = useTypedMutation({
    update_identidades_Clientes_by_pk: [
      {
        pk_columns: { Id: $`Id` },
        _set: {
          DiaDeFaturamento_Id: $`DiaDeFaturamento_Id`,
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })

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
            Proposta_Id: router.query.id,
            PropostaVeiculo_Id: $`PropostaVeiculo_Id`,
            PrecoDeAdesao_Id: $`PrecoDeAdesao_Id`,
            PrecoDeRecorrencia_Id: $`PrecoDeRecorrencia_Id`,
            PropostaPlano_Id: $`PropostaPlano_Id`,
            PropostaCombo_Id: $`PropostaCombo_Id`
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
            Produto_Id: $`Produto_Id`,
            Proposta_Id: router.query.id,
            PropostaVeiculo_Id: $`PropostaVeiculo_Id`,
            PrecoDeAdesao_Id: $`PrecoDeAdesao_Id`,
            PrecoDeRecorrencia_Id: $`PrecoDeRecorrencia_Id`,
            PropostaPlano_Id: $`PropostaPlano_Id`,
            PropostaCombo_Id: $`PropostaCombo_Id`,
            Quantidade: $`Quantidade`
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
            PropostaVeiculo_Id: $`PropostaVeiculo_Id`,
            PropostaCombo_Id: $`PropostaCombo_Id`
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

  const [insertProposalAlert, { loading: insertProposalAlertLoading }] =
    useTypedMutation({
      insert_propostas_Propostas_RegrasETermosDeUso_one: [
        {
          object: {
            Produto_RegraETermosDeUso_Id: $`Produto_RegraETermosDeUso_Id`,
            Servico_RegraETermosDeUso_Id: $`Servico_RegraETermosDeUso_Id`,
            Proposta_Id: router.query.id
          }
        },
        {
          Id: true
        }
      ]
    })

  const [updateProposalAlert, { loading: updateProposalAlertLoading }] =
    useTypedMutation({
      update_propostas_Propostas_RegrasETermosDeUso_by_pk: [
        {
          pk_columns: {
            Id: $`Id`
          },
          _set: {
            Informado: $`Informado`
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

  const [insertClientToProposal, { loading: insertClientToProposalLoading }] =
    useTypedMutation({
      update_propostas_Propostas_by_pk: [
        {
          pk_columns: { Id: router.query.id },
          _set: {
            Cliente_Id: $`Cliente_Id`,
            updated_at: new Date()
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
          NumeroDoChassi: true,
          VeiculosAtivos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              Situacao_Id: true
            }
          ]
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const [
    runClientQuery,
    { data: clientData, refetch: clientRefetch, loading: clientLoading }
  ] = useTypedLazyQuery(
    {
      identidades_Clientes: [
        {
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
          RegrasETermosDeUsos: [
            {
              where: { deleted_at: { _is_null: true } }
            },
            {
              Id: true,
              Mensagem: true
            }
          ],
          Tipo: {
            Valor: true,
            Comentario: true
          },
          PrestadoresDeServicos: [
            {
              where: {
                deleted_at: { _is_null: true },
                Prestador_Id: {
                  _eq: '6fde7f19-6697-4076-befc-b9b73f03b3f5'
                }
              }
            },
            {
              Precos: [
                {
                  where: { deleted_at: { _is_null: true } },
                  order_by: [{ created_at: order_by.desc }]
                },
                {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true }
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
          RegrasETermosDeUsos: [
            {
              where: { deleted_at: { _is_null: true } }
            },
            {
              Id: true,
              Mensagem: true
            }
          ],
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
                  where: { deleted_at: { _is_null: true } },
                  order_by: [{ created_at: order_by.desc }]
                },
                {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true }
                }
              ]
            }
          ],
          ServicoDeInstalacao: {
            Id: true,
            Nome: true,
            RegrasETermosDeUsos: [
              {
                where: { deleted_at: { _is_null: true } }
              },
              {
                Id: true,
                Mensagem: true
              }
            ],
            PrestadoresDeServicos: [
              {
                where: {
                  deleted_at: { _is_null: true },
                  Prestador_Id: {
                    _eq: '6fde7f19-6697-4076-befc-b9b73f03b3f5'
                  }
                }
              },
              {
                Precos: [
                  { order_by: [{ created_at: order_by.desc }] },
                  { Id: true, Valor: true, TipoDePreco: { Valor: true } }
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
          Produtos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Produto: {
                Id: true,
                RegrasETermosDeUsos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Id: true,
                    Mensagem: true
                  }
                ]
              }
            }
          ],
          Servicos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Servico: {
                Id: true,
                RegrasETermosDeUsos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Id: true,
                    Mensagem: true
                  }
                ]
              }
            }
          ],
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
          Planos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Plano: {
                Id: true,
                Produtos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Produto: {
                      Id: true,
                      RegrasETermosDeUsos: [
                        { where: { deleted_at: { _is_null: true } } },
                        {
                          Id: true,
                          Mensagem: true
                        }
                      ]
                    }
                  }
                ],
                Servicos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Servico: {
                      Id: true,
                      RegrasETermosDeUsos: [
                        { where: { deleted_at: { _is_null: true } } },
                        {
                          Id: true,
                          Mensagem: true
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ],
          Produtos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Produto: {
                Id: true,
                RegrasETermosDeUsos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Id: true,
                    Mensagem: true
                  }
                ]
              }
            }
          ],
          Servicos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Servico: {
                Id: true,
                RegrasETermosDeUsos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Id: true,
                    Mensagem: true
                  }
                ]
              }
            }
          ],
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
        Lead_Id: true,
        Situacao: {
          Comentario: true
        },
        FormaDePagamentoDaAdesao_Id: true,
        Cliente_Id: true,
        PropostaGerada: true,
        RegrasETermosDeUsos: [
          {
            where: { deleted_at: { _is_null: true } },
            order_by: [{ created_at: order_by.asc }]
          },
          {
            Id: true,
            Informado: true,
            ProdutoRegrasETermosDeUso: {
              Produto_Id: true,
              Mensagem: true
            },
            ServicoRegrasETermosDeUso: {
              Servico_Id: true,
              Mensagem: true
            }
          }
        ],
        Planos: [
          {
            where: {
              deleted_at: { _is_null: true },
              PropostaVeiculo_Id: { _is_null: true }
            }
          },
          {
            Id: true,
            Plano: {
              Id: true,
              Nome: true
            },
            PropostaCombo_Id: true,
            PlanoPreco: {
              Id: true,
              ValorDeAdesao: true,
              ValorDeRecorrencia: true
            },
            PropostasServicos: [
              {
                where: { deleted_at: { _is_null: true } }
              },
              {
                Id: true,
                Servico: {
                  Id: true,
                  Nome: true,
                  GeraOS: true
                },
                PropostaCombo_Id: true,
                PropostaPlano_Id: true,
                PrecoDeAdesao: {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true }
                },
                PrecoDeRecorrencia: {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true }
                }
              }
            ],
            PropostasProdutos: [
              { where: { deleted_at: { _is_null: true } } },
              {
                Id: true,
                Quantidade: true,
                PropostaCombo_Id: true,
                PropostaPlano_Id: true,
                Produto: { Id: true, Nome: true },
                PrecoAdesao: {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true }
                },
                PrecoRecorrencia: {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true }
                }
              }
            ]
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
            Id: true,
            Servico: {
              Id: true,
              Nome: true,
              GeraOS: true
            },
            PropostaCombo_Id: true,
            PropostaPlano_Id: true,
            PrecoDeAdesao: {
              Id: true,
              Valor: true,
              TipoDePreco: { Valor: true }
            },
            PrecoDeRecorrencia: {
              Id: true,
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
            Id: true,
            Quantidade: true,
            PropostaCombo_Id: true,
            PropostaPlano_Id: true,
            Produto: { Id: true, Nome: true },
            PrecoAdesao: {
              Id: true,
              Valor: true,
              TipoDePreco: { Valor: true }
            },
            PrecoRecorrencia: {
              Id: true,
              Valor: true,
              TipoDePreco: { Valor: true }
            }
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
            Id: true,
            Combo: {
              Id: true,
              Nome: true
            },
            ComboPreco: {
              Id: true,
              ValorDeAdesao: true,
              ValorDeRecorrencia: true
            },
            PropostasPlanos: [
              { where: { deleted_at: { _is_null: true } } },
              {
                Id: true,
                Plano: {
                  Id: true,
                  Nome: true
                },
                PropostaCombo_Id: true,
                PlanoPreco: {
                  Id: true,
                  ValorDeAdesao: true,
                  ValorDeRecorrencia: true
                },
                PropostasProdutos: [
                  {
                    where: { deleted_at: { _is_null: true } }
                  },
                  {
                    Id: true,
                    Quantidade: true,
                    PropostaCombo_Id: true,
                    PropostaPlano_Id: true,
                    Produto: { Id: true, Nome: true },
                    PrecoAdesao: {
                      Id: true,
                      Valor: true,
                      TipoDePreco: { Valor: true }
                    },
                    PrecoRecorrencia: {
                      Id: true,
                      Valor: true,
                      TipoDePreco: { Valor: true }
                    }
                  }
                ],
                PropostasServicos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Id: true,
                    Servico: {
                      Id: true,
                      Nome: true,
                      GeraOS: true
                    },
                    PropostaCombo_Id: true,
                    PropostaPlano_Id: true,
                    PrecoDeAdesao: {
                      Id: true,
                      Valor: true,
                      TipoDePreco: { Valor: true }
                    },
                    PrecoDeRecorrencia: {
                      Id: true,
                      Valor: true,
                      TipoDePreco: { Valor: true }
                    }
                  }
                ]
              }
            ],
            PropostasServicos: [
              {
                where: { deleted_at: { _is_null: true } }
              },
              {
                Id: true,
                Servico: {
                  Id: true,
                  Nome: true,
                  GeraOS: true
                },
                PropostaCombo_Id: true,
                PropostaPlano_Id: true,
                PrecoDeAdesao: {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true }
                },
                PrecoDeRecorrencia: {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true }
                }
              }
            ],
            PropostasProdutos: [
              { where: { deleted_at: { _is_null: true } } },
              {
                Id: true,
                Quantidade: true,
                PropostaCombo_Id: true,
                PropostaPlano_Id: true,
                Produto: { Id: true, Nome: true },
                PrecoAdesao: {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true }
                },
                PrecoRecorrencia: {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true }
                }
              }
            ]
          }
        ],
        Veiculos: [
          { where: { deleted_at: { _is_null: true } } },
          {
            Id: true,
            Veiculo_Id: true,
            PossuiGNV: true,
            PropostasServicos: [
              {
                where: { deleted_at: { _is_null: true } }
              },
              {
                Id: true,
                Servico: {
                  Id: true,
                  Nome: true,
                  GeraOS: true
                },
                PropostaCombo_Id: true,
                PropostaPlano_Id: true,
                PrecoDeAdesao: {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true }
                },
                PrecoDeRecorrencia: {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true }
                }
              }
            ],
            PropostasProdutos: [
              { where: { deleted_at: { _is_null: true } } },
              {
                Id: true,
                Quantidade: true,
                PropostaCombo_Id: true,
                PropostaPlano_Id: true,
                Produto: { Id: true, Nome: true },
                PrecoAdesao: {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true }
                },
                PrecoRecorrencia: {
                  Id: true,
                  Valor: true,
                  TipoDePreco: { Valor: true }
                }
              }
            ],
            PropostasPlanos: [
              { where: { deleted_at: { _is_null: true } } },
              {
                Id: true,
                Plano: {
                  Id: true,
                  Nome: true
                },
                PropostaCombo_Id: true,
                PlanoPreco: {
                  Id: true,
                  ValorDeAdesao: true,
                  ValorDeRecorrencia: true
                },
                PropostasProdutos: [
                  {
                    where: { deleted_at: { _is_null: true } }
                  },
                  {
                    Id: true,
                    Quantidade: true,
                    PropostaCombo_Id: true,
                    PropostaPlano_Id: true,
                    Produto: { Id: true, Nome: true },
                    PrecoAdesao: {
                      Id: true,
                      Valor: true,
                      TipoDePreco: { Valor: true }
                    },
                    PrecoRecorrencia: {
                      Id: true,
                      Valor: true,
                      TipoDePreco: { Valor: true }
                    }
                  }
                ],
                PropostasServicos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Id: true,
                    Servico: {
                      Id: true,
                      Nome: true,
                      GeraOS: true
                    },
                    PropostaCombo_Id: true,
                    PropostaPlano_Id: true,
                    PrecoDeAdesao: {
                      Id: true,
                      Valor: true,
                      TipoDePreco: { Valor: true }
                    },
                    PrecoDeRecorrencia: {
                      Id: true,
                      Valor: true,
                      TipoDePreco: { Valor: true }
                    }
                  }
                ]
              }
            ],
            PropostasCombos: [
              { where: { deleted_at: { _is_null: true } } },
              {
                Id: true,
                Combo: {
                  Id: true,
                  Nome: true
                },
                ComboPreco: {
                  Id: true,
                  ValorDeAdesao: true,
                  ValorDeRecorrencia: true
                },
                PropostasPlanos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Id: true,
                    Plano: {
                      Id: true,
                      Nome: true
                    },
                    PropostaCombo_Id: true,
                    PlanoPreco: {
                      Id: true,
                      ValorDeAdesao: true,
                      ValorDeRecorrencia: true
                    },
                    PropostasProdutos: [
                      {
                        where: { deleted_at: { _is_null: true } }
                      },
                      {
                        Id: true,
                        Quantidade: true,
                        PropostaCombo_Id: true,
                        PropostaPlano_Id: true,
                        Produto: { Id: true, Nome: true },
                        PrecoAdesao: {
                          Id: true,
                          Valor: true,
                          TipoDePreco: { Valor: true }
                        },
                        PrecoRecorrencia: {
                          Id: true,
                          Valor: true,
                          TipoDePreco: { Valor: true }
                        }
                      }
                    ],
                    PropostasServicos: [
                      { where: { deleted_at: { _is_null: true } } },
                      {
                        Id: true,
                        Servico: {
                          Id: true,
                          Nome: true,
                          GeraOS: true
                        },
                        PropostaCombo_Id: true,
                        PropostaPlano_Id: true,
                        PrecoDeAdesao: {
                          Id: true,
                          Valor: true,
                          TipoDePreco: { Valor: true }
                        },
                        PrecoDeRecorrencia: {
                          Id: true,
                          Valor: true,
                          TipoDePreco: { Valor: true }
                        }
                      }
                    ]
                  }
                ],
                PropostasProdutos: [
                  {
                    where: { deleted_at: { _is_null: true } }
                  },
                  {
                    Id: true,
                    Quantidade: true,
                    PropostaCombo_Id: true,
                    PropostaPlano_Id: true,
                    Produto: { Id: true, Nome: true },
                    PrecoAdesao: {
                      Id: true,
                      Valor: true,
                      TipoDePreco: { Valor: true }
                    },
                    PrecoRecorrencia: {
                      Id: true,
                      Valor: true,
                      TipoDePreco: { Valor: true }
                    }
                  }
                ],
                PropostasServicos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Id: true,
                    Servico: {
                      Id: true,
                      Nome: true,
                      GeraOS: true
                    },
                    PropostaCombo_Id: true,
                    PropostaPlano_Id: true,
                    PrecoDeAdesao: {
                      Id: true,
                      Valor: true,
                      TipoDePreco: { Valor: true }
                    },
                    PrecoDeRecorrencia: {
                      Id: true,
                      Valor: true,
                      TipoDePreco: { Valor: true }
                    }
                  }
                ]
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
              Nome: true,
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
              ],
              PessoaJuridica: true
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

  async function getLeadById(Id: string) {
    const { data } = await useTypedClientQuery(
      {
        clientes_Leads_by_pk: [
          { Id },
          {
            Id: true,
            Nome: true,
            Email: true,
            Telefone: true
          }
        ]
      },
      { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
    )
    return data.clientes_Leads_by_pk
  }

  async function getClientProposalsByClientId(Id: string) {
    const { data } = await useTypedClientQuery(
      {
        propostas_Propostas: [
          {
            where: { deleted_at: { _is_null: true }, Cliente_Id: { _eq: Id } }
          },
          {
            Id: true,
            Situacao_Id: true
          }
        ]
      },
      { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
    )
    return data.propostas_Propostas
  }

  async function getClientPhonesByClientId(Id: string) {
    const { data } = await useTypedClientQuery(
      {
        contatos_Telefones: [
          {
            where: {
              deleted_at: { _is_null: true },
              Identidades: { _contains: $`cliente` }
            }
          },
          {
            Id: true,
            Telefone: true
          }
        ]
      },
      {
        cliente: { cliente: Id }
      },
      {
        fetchPolicy: 'no-cache',
        notifyOnNetworkStatusChange: true
      }
    )
    return data.contatos_Telefones
  }

  async function getClientAddressByClientId(Id: string) {
    const { data } = await useTypedClientQuery(
      {
        contatos_Enderecos: [
          {
            where: {
              deleted_at: { _is_null: true },
              Identidades: { _contains: $`cliente` }
            }
          },
          {
            Id: true,
            Bairro: true,
            Cep: true,
            Numero: true,
            Logradouro: true,
            Cidade: { Nome: true },
            Estado: { Nome: true }
          }
        ]
      },
      {
        cliente: { cliente: Id }
      },
      {
        fetchPolicy: 'no-cache',
        notifyOnNetworkStatusChange: true
      }
    )
    return data.contatos_Enderecos
  }

  async function getClientEmailsByClientId(Id: string) {
    const { data } = await useTypedClientQuery(
      {
        contatos_Emails: [
          {
            where: {
              deleted_at: { _is_null: true },
              Identidades: { _contains: $`cliente` }
            }
          },
          {
            Id: true,
            Email: true
          }
        ]
      },
      {
        cliente: { cliente: Id }
      },
      {
        fetchPolicy: 'no-cache',
        notifyOnNetworkStatusChange: true
      }
    )
    return data.contatos_Emails
  }

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

  const createProductSchema = yup.object().shape({
    Product_Id: yup.object().required('Preencha o campo para continuar'),
    Quantidade: yup.string().required('Preencha o campo para continuar')
  })

  const createPlanSchema = yup.object().shape({
    Plan_Id: yup.object().required('Preencha o campo para continuar')
  })

  const createServiceSchema = yup.object().shape({
    Servico_Id: yup.object().required('Preencha o campo para continuar')
  })

  const createComboSchema = yup.object().shape({
    Combo_Id: yup.object().required('Preencha o campo para continuar')
  })

  const createVehicleSchema = yup.object().shape({
    Veiculo: yup.object().required('Preencha o campo para continuar')
  })

  return (
    <UpdateContext.Provider
      value={{
        vehiclesData: vehiclesData?.clientes_Veiculos,
        vehiclesRefetch,
        vehiclesLoading,
        slidePanelState,
        setSlidePanelState,
        tabsForPage,
        setTabsForPage,
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
        insertProposalAlert,
        insertProposalAlertLoading,
        selectedTab,
        setSelectedTab,
        createVehicle,
        createVehicleLoading,
        getVehicleById,
        getClientById,
        client,
        setClient,
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
        getPaymentDayById,
        insertOnlyClientPaymentType,
        insertOnlyClientPaymentTypeLoading,
        insertOnlyClientInvoiceDate,
        insertOnlyClientInvoiceDateLoading,
        currentStage,
        setCurrentStage,
        createClient,
        createClientLoading,
        CPFSchema,
        CNPJSchema,
        insertClientToProposal,
        insertClientToProposalLoading,
        getClientPhonesByClientId,
        getClientAddressByClientId,
        getClientEmailsByClientId,
        updateProposalAlert,
        updateProposalAlertLoading,
        getLeadById,
        lead,
        setLead,
        runClientQuery,
        clientData: clientData?.identidades_Clientes,
        clientRefetch,
        clientLoading,
        hasDependencies,
        setHasDependencies,
        createProductSchema,
        createPlanSchema,
        createServiceSchema,
        createComboSchema,
        createVehicleSchema
      }}
    >
      {children}
    </UpdateContext.Provider>
  )
}

export const useUpdate = () => {
  return useContext(UpdateContext)
}
