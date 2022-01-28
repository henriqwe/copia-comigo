import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client'
import { order_by } from '&erp/graphql/generated/zeus'
import {
  $,
  useTypedClientQuery,
  useTypedMutation,
  useTypedQuery
} from '&erp/graphql/generated/zeus/apollo'
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

type UpdateContextProps = {
  slidePanelState: SlidePanelStateType
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>
  serviceOrderData?: {
    Id: string
    Tipo: {
      Valor: string
      Comentario: string
    }
    Situacao: {
      Valor: string
      Comentario: string
    }
    Agendamentos: {
      Id: string
      Agendamento: Date
      FimDoServico?: Date
      InicioDoServico?: Date
      Colaborador_Id: string
      Situacao: {
        Valor: string
        Comentario: string
      }
    }[]

    CodigoIdentificador: number
    Proposta_Id: string
    Beneficios: {
      Id: string
      Portfolio_Id: string
      TipoPortfolio: string
      PortfolioPreco_Id: string
    }[]
    Servicos: {
      Id: string
      Servico_Id: string
      ServicoPreco_Id: string
    }[]
    Produtos: { Id: string; Produto_Id: string; ProdutoPreco_Id: string }[]
    Veiculo_Id: string
  }
  serviceOrderActivitiesData?: {
    Id: string
    Situacao: {
      Comentario: string
    }
    MotivoRecusado?: string
    Usuario_Id: string
    created_at: Date
  }[]
  serviceOrderActivitiesRefetch: () => void
  serviceOrderActivitiesLoading: boolean
  collaboratorsData?: {
    Id: string
    Pessoa: {
      Nome: string
    }
  }[]
  collaboratorsRefetch: () => void
  serviceOrderRefetch: () => void
  serviceOrderLoading: boolean
  updateServiceOrdersLoading: boolean
  updateServiceOrders: (
    options?: MutationFunctionOptions<
      {
        update_comercial_Produtos_by_pk?: {
          Id: string
        }
        insert_operacional_OrdemDeServico_Atividades_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  rejectServiceOrder: (
    options?: MutationFunctionOptions<
      {
        update_comercial_Produtos_by_pk?: {
          Id: string
        }
        insert_operacional_OrdemDeServico_Atividades_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  rejectServiceOrderLoading: boolean
  finishServiceOrder: (
    options?: MutationFunctionOptions<
      {
        update_comercial_Produtos_by_pk?: {
          Id: string
        }
        insert_operacional_OrdemDeServico_Atividades_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  insertActiveVehicle: (
    options?: MutationFunctionOptions<
      {
        insert_clientes_VeiculosAtivos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  insertActiveVehicleLoading: boolean
  insertActiveVehicleBenefit: (
    options?: MutationFunctionOptions<
      {
        insert_clientes_VeiculosAtivos_Beneficios_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  insertActiveVehicleBenefitLoading: boolean
  updateActiveVehicle: (
    options?: MutationFunctionOptions<
      {
        update_clientes_VeiculosAtivos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  updateActiveVehicleLoading: boolean
  updateActiveVehicleBenefit: (
    options?: MutationFunctionOptions<
      {
        update_clientes_VeiculosAtivos_Beneficios_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  insertActiveVehicleService: (
    options?: MutationFunctionOptions<
      {
        insert_clientes_VeiculosAtivos_Servicos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  insertActiveVehicleProducts: (
    options?: MutationFunctionOptions<
      {
        insert_clientes_VeiculosAtivos_Produtos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  disableActiveVehicle: (
    options?: MutationFunctionOptions<
      {
        update_clientes_VeiculosAtivos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  initializeServiceOrders: (
    options?: MutationFunctionOptions<
      {
        update_operacional_OrdemDeServico_Agendamentos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  concludeServiceOrder: (
    options?: MutationFunctionOptions<
      {
        update_operacional_OrdemDeServico_Agendamentos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  initializeServiceOrdersLoading: boolean
  concludeServiceOrderLoading: boolean
  disableActiveVehicleLoading: boolean
  insertActiveVehicleProductsLoading: boolean
  insertActiveVehicleServiceLoading: boolean
  updateActiveVehicleBenefitLoading: boolean
  getServiceOrderProposal: (Id: string) => Promise<
    | {
      Id: string
      Cliente_Id?: string
      Instalacoes: {
        Endereco: {
          Bairro: string
          Cidade: string
          Complemento: string
          Estado: string
          Logradouro: string
          Numero: string
        }
      }[]
      TipoDePagamento_Id: string
    }
    | undefined
  >
  getProposalClient: (Id: string) => Promise<
    | {
      Id: string
      Pessoa: {
        Nome: string
        PessoaJuridica: boolean
        Identificador: string
      }
    }
    | undefined
  >
  finishServiceOrderLoading: boolean
  serviceOrdersSchema: yup.AnyObjectSchema
  rejectSchema: yup.AnyObjectSchema
  getActivityUser: (Id: string) => Promise<
    | {
      Id: string
      Cliente?: {
        Pessoa: {
          Nome: string
        }
      }
      Colaborador?: {
        Pessoa: {
          Nome: string
        }
      }
    }
    | undefined
  >
  getServiceOrderVehicle: (Id: string) => Promise<
    | {
      Id: string
      Placa?: string
      NumeroDoChassi?: string
      Apelido?: string
    }
    | undefined
  >
  getProductById: (
    productId: string,
    priceId: string
  ) => Promise<{
    product?: {
      Nome: string
    }
    price?: {
      Valor: string
    }
  }>
  getPlanById: (
    planId: string,
    priceId: string
  ) => Promise<{
    plan?: {
      Nome: string
    }
    price?: {
      ValorBase: string
      ValorPraticado?: string
      ServicoPreco: {
        Valor: string
      }
    }
  }>
  getComboById: (
    comboId: string,
    priceId: string
  ) => Promise<{
    combo?: {
      Produtos: {
        ValorPraticado: string
      }[]
      Nome: string
      Planos: {
        ValorPraticado: string
      }[]
      Servicos: {
        ValorPraticado: string
      }[]
    }
    price?: {
      ValorBase: string
    }
  }>
  getServiceById: (
    serviceId: string,
    priceId: string
  ) => Promise<{
    service?: {
      Id: string
      Nome: string
      GeraOS: boolean
    }
    price?: {
      Id: string
      Valor: string
    }
  }>
  getActiveVehicles: (
    Cliente_Id: string,
    Veiculo_Id: string
  ) => Promise<
    {
      Id: string
      Beneficios: {
        Id: string
        Portfolio_Id: string
        PortfolioPreco_Id: string
        TipoPortfolio: string
      }[]
    }[]
  >
}

type ProviderProps = {
  children: ReactNode
}

type SlidePanelStateType = {
  type: 'schedule' | 'activities'
  open: boolean
}

export const UpdateContext = createContext<UpdateContextProps>(
  {} as UpdateContextProps
)

export const UpdateProvider = ({ children }: ProviderProps) => {
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelStateType>({
    open: false,
    type: 'schedule'
  })
  const router = useRouter()

  const { data: configData } = useTypedQuery(
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

  const [updateServiceOrders, { loading: updateServiceOrdersLoading }] =
    useTypedMutation({
      update_operacional_OrdemDeServico_by_pk: [
        {
          pk_columns: { Id: router.query.id },
          _set: {
            Situacao_Id: 'agendada',
            updated_at: new Date()
          }
        },
        { Id: true }
      ],
      insert_operacional_OrdemDeServico_Agendamentos_one: [
        {
          object: {
            OS_Id: router.query.id,
            Agendamento: $`Agendamento`,
            Colaborador_Id: $`Colaborador_Id`,
            Situacao_Id: 'criada'
          }
        },
        {
          Id: true
        }
      ],
      insert_operacional_OrdemDeServico_Atividades_one: [
        {
          object: {
            OrdemDeServico_Id: router.query.id,
            Situacao_Id: 'agendada',
            Usuario_Id: '7fd2e5d7-a4c4-485b-8675-e56052e3ff5f'
          }
        },
        {
          Id: true
        }
      ]
    })

  const [initializeServiceOrders, { loading: initializeServiceOrdersLoading }] =
    useTypedMutation({
      update_operacional_OrdemDeServico_Agendamentos_by_pk: [
        {
          pk_columns: { Id: $`Id` },
          _set: {
            InicioDoServico: new Date(),
            OS_Id: router.query.id,
            Situacao_Id: 'iniciada'
          }
        },
        { Id: true }
      ]
    })

  const [concludeServiceOrder, { loading: concludeServiceOrderLoading }] =
    useTypedMutation({
      update_operacional_OrdemDeServico_Agendamentos_by_pk: [
        {
          pk_columns: { Id: $`Id` },
          _set: {
            InicioDoServico: new Date(),
            OS_Id: router.query.id,
            Situacao_Id: 'concluida'
          }
        },
        { Id: true }
      ]
    })

  const [rejectServiceOrder, { loading: rejectServiceOrderLoading }] =
    useTypedMutation({
      update_operacional_OrdemDeServico_Agendamentos_by_pk: [
        {
          pk_columns: { Id: $`Id` },
          _set: {
            OS_Id: router.query.id,
            Situacao_Id: 'frustada'
          }
        },
        { Id: true }
      ],
      insert_operacional_OrdemDeServico_Atividades_one: [
        {
          object: {
            OrdemDeServico_Id: router.query.id,
            MotivoRecusado: $`MotivoRecusado`,
            Situacao_Id: 'cancelada',
            Usuario_Id: '7fd2e5d7-a4c4-485b-8675-e56052e3ff5f'
          }
        },
        {
          Id: true
        }
      ]
    })

  const [finishServiceOrder, { loading: finishServiceOrderLoading }] =
    useTypedMutation({
      update_operacional_OrdemDeServico_by_pk: [
        {
          pk_columns: { Id: router.query.id },
          _set: {
            Situacao_Id: 'finalizada',
            DataConcluida: new Date(),
            updated_at: new Date()
          }
        },
        { Id: true }
      ],
      insert_operacional_OrdemDeServico_Atividades_one: [
        {
          object: {
            OrdemDeServico_Id: router.query.id,
            Situacao_Id: 'finalizada',
            Usuario_Id: '7fd2e5d7-a4c4-485b-8675-e56052e3ff5f'
          }
        },
        {
          Id: true
        }
      ]
    })

  const [updateActiveVehicle, { loading: updateActiveVehicleLoading }] =
    useTypedMutation({
      update_clientes_VeiculosAtivos_by_pk: [
        {
          pk_columns: {
            Id: $`Id`
          },
          _set: {
            OS_Id: router.query.id,
            updated_at: new Date()
          }
        },
        {
          Id: true
        }
      ]
    })

  const [disableActiveVehicle, { loading: disableActiveVehicleLoading }] =
    useTypedMutation({
      update_clientes_VeiculosAtivos_by_pk: [
        {
          pk_columns: {
            Id: $`Id`
          },
          _set: {
            Situacao_Id: 'inativo'
          }
        },
        {
          Id: true
        }
      ]
    })

  const [
    updateActiveVehicleBenefit,
    { loading: updateActiveVehicleBenefitLoading }
  ] = useTypedMutation({
    update_clientes_VeiculosAtivos_Beneficios_by_pk: [
      {
        pk_columns: {
          Id: $`Id`
        },
        _set: {
          PortfolioPreco_Id: $`PortfolioPreco_Id`,
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })

  const [
    insertActiveVehicleBenefit,
    { loading: insertActiveVehicleBenefitLoading }
  ] = useTypedMutation({
    insert_clientes_VeiculosAtivos_Beneficios_one: [
      {
        object: {
          Portfolio_Id: $`Portfolio_Id`,
          TipoPortfolio: $`TipoPortfolio`,
          PortfolioPreco_Id: $`PortfolioPreco_Id`,
          VeiculoAtivo_Id: $`VeiculoAtivo_Id`,
          Ativo: true
        }
      },
      {
        Id: true
      }
    ]
  })

  const [
    insertActiveVehicleProducts,
    { loading: insertActiveVehicleProductsLoading }
  ] = useTypedMutation({
    insert_clientes_VeiculosAtivos_Produtos_one: [
      {
        object: {
          ProdutoPreco_Id: $`ProdutoPreco_Id`,
          Produto_Id: $`Produto_Id`,
          VeiculoAtivo_Id: $`VeiculoAtivo_Id`,
          Ativo: true
        }
      },
      {
        Id: true
      }
    ]
  })

  const [
    insertActiveVehicleService,
    { loading: insertActiveVehicleServiceLoading }
  ] = useTypedMutation({
    insert_clientes_VeiculosAtivos_Servicos_one: [
      {
        object: {
          ServicoPreco_Id: $`ServicoPreco_Id`,
          Servico_Id: $`Servico_Id`,
          VeiculoAtivo_Id: $`VeiculoAtivo_Id`,
          Ativo: true
        }
      },
      {
        Id: true
      }
    ]
  })

  const [insertActiveVehicle, { loading: insertActiveVehicleLoading }] =
    useTypedMutation({
      insert_clientes_VeiculosAtivos_one: [
        {
          object: {
            Situacao_Id: 'ativo',
            Veiculo_Id: $`Veiculo_Id`,
            Cliente_Id: $`Cliente_Id`,
            Franquia_Id: configData?.Configuracoes_by_pk?.Valor[0],
            OS_Id: $`OS_Id`,
            Beneficios: {
              data: $`Beneficios`
            },
            Produtos: {
              data: $`Produtos`
            },
            Servicos: {
              data: $`Servicos`
            }
          }
        },
        {
          Id: true
        }
      ]
    })

  const {
    data: serviceOrderData,
    refetch: serviceOrderRefetch,
    loading: serviceOrderLoading
  } = useTypedQuery(
    {
      operacional_OrdemDeServico_by_pk: [
        {
          Id: router.query.id
        },
        {
          Id: true,
          Tipo: {
            Valor: true,
            Comentario: true
          },
          Situacao: {
            Valor: true,
            Comentario: true
          },
          Agendamentos: [
            {
              where: { deleted_at: { _is_null: true } },
              order_by: [{ created_at: order_by.desc }]
            },
            {
              Id: true,
              Agendamento: true,
              FimDoServico: true,
              InicioDoServico: true,
              Colaborador_Id: true,
              Situacao: {
                Valor: true,
                Comentario: true
              }
            }
          ],
          CodigoIdentificador: true,
          Proposta_Id: true,
          Beneficios: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              Portfolio_Id: true,
              TipoPortfolio: true,
              PortfolioPreco_Id: true
            }
          ],
          Servicos: [
            { where: { deleted_at: { _is_null: true } } },
            { Id: true, Servico_Id: true, ServicoPreco_Id: true }
          ],
          Produtos: [
            { where: { deleted_at: { _is_null: true } } },
            { Id: true, Produto_Id: true, ProdutoPreco_Id: true }
          ],
          Veiculo_Id: true
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

  const {
    data: serviceOrderActivitiesData,
    refetch: serviceOrderActivitiesRefetch,
    loading: serviceOrderActivitiesLoading
  } = useTypedQuery(
    {
      operacional_OrdemDeServico_Atividades: [
        {
          order_by: [{ created_at: 'desc' }],
          where: {
            deleted_at: { _is_null: true },
            OrdemDeServico_Id: { _eq: router.query.id }
          }
        },
        {
          Id: true,
          Situacao: {
            Comentario: true
          },
          MotivoRecusado: true,
          created_at: true,
          Usuario_Id: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  async function getServiceOrderProposal(Id: string) {
    const { data } = await useTypedClientQuery({
      propostas_Propostas_by_pk: [
        {
          Id
        },
        {
          Id: true,
          Cliente_Id: true,
          Instalacoes: [
            {
              where: { deleted_at: { _is_null: true } },
              order_by: [{ created_at: order_by.desc }]
            },
            { Endereco: [{}, true] }
          ],
          TipoDePagamento_Id: true
        }
      ]
    })

    return data.propostas_Propostas_by_pk
  }

  async function getProposalClient(Id: string) {
    const { data } = await useTypedClientQuery({
      identidades_Clientes_by_pk: [
        {
          Id
        },
        {
          Id: true,
          Pessoa: {
            Nome: true,
            PessoaJuridica: true,
            Identificador: true
          }
        }
      ]
    })

    return data.identidades_Clientes_by_pk
  }

  async function getActivityUser(Id: string) {
    const { data } = await useTypedClientQuery({
      autenticacao_Usuarios_by_pk: [
        {
          Id
        },
        {
          Id: true,
          Cliente: {
            Pessoa: {
              Nome: true
            }
          },
          Colaborador: {
            Pessoa: {
              Nome: true
            }
          }
        }
      ]
    })

    return data.autenticacao_Usuarios_by_pk
  }

  async function getProductById(productId: string, priceId: string) {
    const { data } = await useTypedClientQuery({
      comercial_Produtos_by_pk: [
        {
          Id: productId
        },
        {
          Nome: true
        }
      ],
      comercial_PrestadoresDeServicos_Produtos_Precos_by_pk: [
        {
          Id: priceId
        },
        {
          Valor: true
        }
      ]
    })

    return {
      product: data.comercial_Produtos_by_pk,
      price: data.comercial_PrestadoresDeServicos_Produtos_Precos_by_pk
    }
  }

  async function getPlanById(planId: string, priceId: string) {
    const { data } = await useTypedClientQuery({
      comercial_Planos_by_pk: [
        {
          Id: planId
        },
        {
          Nome: true
        }
      ],
      comercial_Planos_Precos_by_pk: [
        {
          Id: priceId
        },
        {
          ValorBase: true,
          ValorPraticado: true,
          ServicoPreco: {
            Valor: true
          }
        }
      ]
    })

    return {
      plan: data.comercial_Planos_by_pk,
      price: data.comercial_Planos_Precos_by_pk
    }
  }

  async function getComboById(comboId: string, priceId: string) {
    const { data } = await useTypedClientQuery({
      comercial_Combos_by_pk: [
        {
          Id: comboId
        },
        {
          Nome: true,
          Planos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              ValorPraticado: true
            }
          ],
          Produtos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              ValorPraticado: true
            }
          ],
          Servicos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              ValorPraticado: true
            }
          ]
        }
      ],
      comercial_Combos_Precos_by_pk: [
        {
          Id: priceId
        },
        {
          ValorBase: true
        }
      ]
    })

    return {
      combo: data.comercial_Combos_by_pk,
      price: data.comercial_Combos_Precos_by_pk
    }
  }

  async function getServiceById(serviceId: string, priceId: string) {
    const { data } = await useTypedClientQuery({
      comercial_Servicos_by_pk: [
        {
          Id: serviceId
        },
        {
          Id: true,
          Nome: true,
          GeraOS: true
        }
      ],
      comercial_PrestadoresDeServicos_Servicos_Precos_by_pk: [
        {
          Id: priceId
        },
        {
          Id: true,
          Valor: true
        }
      ]
    })

    return {
      service: data.comercial_Servicos_by_pk,
      price: data.comercial_PrestadoresDeServicos_Servicos_Precos_by_pk
    }
  }

  async function getServiceOrderVehicle(Id: string) {
    const { data } = await useTypedClientQuery({
      clientes_Veiculos_by_pk: [
        {
          Id
        },
        {
          Id: true,
          Placa: true,
          NumeroDoChassi: true,
          Apelido: true
        }
      ]
    })

    return data.clientes_Veiculos_by_pk
  }

  async function getActiveVehicles(Cliente_Id: string, Veiculo_Id: string) {
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
          ]
        }
      ]
    })

    return data.clientes_VeiculosAtivos
  }

  const serviceOrdersSchema = yup.object().shape({
    Agendamento: yup.date().required('Preencha o campo para continuar'),
    Colaborador_Id: yup.object().required('Preencha o campo para continuar')
  })

  const rejectSchema = yup.object().shape({
    MotivoRecusado: yup.string().required('Digite o motivo para continuar')
  })

  return (
    <UpdateContext.Provider
      value={{
        serviceOrderData: serviceOrderData?.operacional_OrdemDeServico_by_pk,
        serviceOrderRefetch,
        serviceOrderLoading,
        updateServiceOrdersLoading,
        updateServiceOrders,
        rejectServiceOrder,
        rejectServiceOrderLoading,
        finishServiceOrder,
        finishServiceOrderLoading,
        serviceOrdersSchema,
        rejectSchema,
        getServiceOrderProposal,
        getProposalClient,
        slidePanelState,
        setSlidePanelState,
        serviceOrderActivitiesData:
          serviceOrderActivitiesData?.operacional_OrdemDeServico_Atividades,
        serviceOrderActivitiesRefetch,
        serviceOrderActivitiesLoading,
        getActivityUser,
        getServiceOrderVehicle,
        getProductById,
        getPlanById,
        getComboById,
        getServiceById,
        getActiveVehicles,
        insertActiveVehicle,
        insertActiveVehicleLoading,
        insertActiveVehicleBenefit,
        insertActiveVehicleBenefitLoading,
        updateActiveVehicle,
        updateActiveVehicleLoading,
        updateActiveVehicleBenefit,
        updateActiveVehicleBenefitLoading,
        insertActiveVehicleService,
        insertActiveVehicleServiceLoading,
        insertActiveVehicleProducts,
        insertActiveVehicleProductsLoading,
        disableActiveVehicle,
        disableActiveVehicleLoading,
        collaboratorsData: collaboratorsData?.identidades_Colaboradores,
        collaboratorsRefetch,
        initializeServiceOrders,
        initializeServiceOrdersLoading,
        concludeServiceOrder,
        concludeServiceOrderLoading
      }}
    >
      {children}
    </UpdateContext.Provider>
  )
}

export const useUpdate = () => {
  return useContext(UpdateContext)
}
