import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client'
import { GraphQLTypes, order_by } from 'graphql/generated/zeus'
import {
  useTypedClientQuery,
  useTypedMutation,
  useTypedQuery,
  $
} from 'graphql/generated/zeus/apollo'
import { useRouter } from 'next/router'
import {
  ReactNode,
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction
} from 'react'
import * as yup from 'yup'

type ViewContextProps = {
  slidePanelState: SlidePanelStateType
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>
  proposalData?: {
    Id: string
    Cliente_Id?: string
    Lead_Id?: string
    Ticket_Id: string
    TipoDePagamento_Id: string
    TipoDeRecorrencia_Id: string
    Usuario_Id: string
    // Cliente?: {
    //   Id: string
    //   Pessoa: {
    //     Nome: string
    //   }
    // }
    // Lead: {
    //   Id: string
    //   Nome: string
    // }
    // Ticket: {
    //   Id: string
    //   Lead: {
    //     Nome: string
    //   }
    // }
    // TipoDePagamento: {
    //   Comentario: string
    //   Valor: string
    // }
    // TipoDeRecorrencia: {
    //   Comentario: string
    //   Valor: string
    // }
    // Usuario: {
    //   Id: string
    //   Cliente?: {
    //     Pessoa: {
    //       Nome: string
    //     }
    //   }
    //   Colaborador?: {
    //     Pessoa: {
    //       Nome: string
    //     }
    //   }
    // }
  } & ProposalsArray
  proposalInstallationsData?: {
    Id: string
    Endereco: any
    // VeiculoRelacionamento?: {
    //   Id: string
    //   Apelido?: string
    //   Placa?: string
    //   NumeroDoChassi?: string
    //   Categoria: {
    //     Id: string
    //     Nome: string
    //   }
    // }
    Veiculo_Id?: string
    Proposta_Id: string
    PosicaoDoVeiculo: number
    Veiculo?: number
  }[]
  proposalInstallationsRefetch: () => void
  proposalInstallationsLoading: boolean
  proposalRefetch: () => void
  proposalLoading: boolean
  getProposalArray(position: number): Promise<ProposalsArray | undefined>
  getProposalInstallationByVehiclePosition: (vehicle: number) => Promise<
    | {
        Endereco: boolean | never[] | unknown
        PosicaoDoVeiculo: number
        Id: string
        Veiculo_Id: string
      }[]
    | undefined
  >
  createProposalCombo: (
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
  createProposalService: (
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
  createProposalPlan: (
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
  createProposalProduct: (
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
  createProposalUpSelling: (
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
  createProposalInstalation: (
    options?: MutationFunctionOptions<
      {
        insert_propostas_Propostas_Instalacoes_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  updateProposalInstalation: (
    options?: MutationFunctionOptions<
      {
        update_propostas_Propostas_Instalacoes_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  updateProposalCombo: (
    options?: MutationFunctionOptions<
      {
        update_propostas_Propostas_Combos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  updateProposalService: (
    options?: MutationFunctionOptions<
      {
        update_propostas_Propostas_Servicos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  updateProposalPlan: (
    options?: MutationFunctionOptions<
      {
        update_propostas_Propostas_Planos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  updateProposalProduct: (
    options?: MutationFunctionOptions<
      {
        update_propostas_Propostas_Produtos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  updateProposalUpSelling: (
    options?: MutationFunctionOptions<
      {
        update_propostas_Propostas_Oportunidades_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  disableActiveVehicleBenefit: (
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
  disableActiveVehicleService: (
    options?: MutationFunctionOptions<
      {
        update_clientes_VeiculosAtivos_Servicos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createActiveVehicleService: (
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
  disableActiveVehicleProduct: (
    options?: MutationFunctionOptions<
      {
        update_clientes_VeiculosAtivos_Produtos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  deleteProposalInstalation: (
    options?: MutationFunctionOptions<
      {
        delete_propostas_Propostas_Instalacoes_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  deleteProposalCombo: (
    options?: MutationFunctionOptions<
      {
        delete_propostas_Propostas_Combos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  deleteProposalService: (
    options?: MutationFunctionOptions<
      {
        delete_propostas_Propostas_Servicos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  deleteProposalPlan: (
    options?: MutationFunctionOptions<
      {
        delete_propostas_Propostas_Planos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  deleteProposalProduct: (
    options?: MutationFunctionOptions<
      {
        delete_propostas_Propostas_Produtos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  deleteProposalUpSelling: (
    options?: MutationFunctionOptions<
      {
        delete_propostas_Propostas_Oportunidades_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
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
  addClientToProposal: (
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
  createActiveVehicleBenefit: (
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
  createActiveVehicleProduct: (
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
  changeVehicleOwnership: (
    options?: MutationFunctionOptions<
      {
        update_clientes_VeiculosAtivos_by_pk?: {
          Id: string
        }
        insert_clientes_VeiculosAtivos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  changeVehicleSituation: (
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
  createActiveVehicle: (
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
  createActiveVehicleLoading: boolean
  changeVehicleSituationLoading: boolean
  changeVehicleOwnershipLoading: boolean
  createActiveVehicleProductLoading: boolean
  updateActiveVehicleBenefitLoading: boolean
  createActiveVehicleBenefitLoading: boolean
  refuseProposalLoading: boolean
  addClientToProposalLoading: boolean
  acceptProposalLoading: boolean
  createProposalComboLoading: boolean
  createProposalServiceLoading: boolean
  createProposalPlanLoading: boolean
  createProposalProductLoading: boolean
  createProposalUpSellingLoading: boolean
  createProposalInstalationLoading: boolean
  updateProposalInstalationLoading: boolean
  updateProposalComboLoading: boolean
  updateProposalServiceLoading: boolean
  updateProposalPlanLoading: boolean
  updateProposalProductLoading: boolean
  updateProposalUpSellingLoading: boolean
  deleteProposalServiceLoading: boolean
  deleteProposalPlanLoading: boolean
  deleteProposalProductLoading: boolean
  deleteProposalUpSellingLoading: boolean
  deleteProposalComboLoading: boolean
  deleteProposalInstalationLoading: boolean
  disableActiveVehicleBenefitLoading: boolean
  disableActiveVehicleServiceLoading: boolean
  disableActiveVehicleProductLoading: boolean
  createActiveVehicleServiceLoading: boolean
  addressSchema: any
  getVehicleById: (Id: string) => Promise<{
    data?: {
      Id: string
      Placa?: string | undefined
      NumeroDoChassi?: string | undefined
      Categoria_Id: string
      Apelido?: string | undefined
    }
    category?: {
      Id: string
      Nome: string
    }
  }>
  getProposalClienteById: (Id: string) => Promise<
    | {
        Id: string
        Pessoa: {
          Nome: string
        }
      }
    | undefined
  >
  getVehicleCategoryById: (Id: string) => Promise<
    | {
        Id: string
        Nome: string
      }
    | undefined
  >
  getLeadById: (Id: string) => Promise<
    | {
        Id: string
        Nome: string
      }
    | undefined
  >
  getUserById: (Id: string) => Promise<
    | {
        Id: string
        Colaborador?: {
          Pessoa: {
            Nome: string
          }
        }
      }
    | undefined
  >
  getActiveVehicleById: (Veiculo_Id: string) => Promise<
    | {
        Id: string
        Cliente_Id: string
        Franquia_Id: string
        OS_Id: string
        Situacao: {
          Valor: string
        }
        Produtos: {
          Id: string
          ProdutoPreco_Id: string
          Produto_Id: string
          Ativo: boolean
        }[]
        Servicos: {
          Id: string
          ServicoPreco_Id: string
          Servico_Id: string
          Ativo: boolean
        }[]
        Beneficios: {
          Id: string
          PortfolioPreco_Id: string
          Portfolio_Id: string
          TipoPortfolio: string
        }[]
      }[]
    | undefined
  >
}

export type ProposalsArray = {
  Id: string
  Situacao: {
    Comentario: string
    Valor: string
  }
  Combos: {
    Id: string
    ComboPreco: { Id: string; ValorBase: string }
    Veiculo: number
    Veiculo_Id?: string
    Proposta_Id: string
    Combo: {
      Id: string
      Nome: string
      Precos: { ValorBase: string }[]
      Planos: {
        Id: string
        Plano: {
          Id: string
          Nome: string
        }
        ValorPraticado: string
      }[]
      Produtos: {
        Id: string
        ValorPraticado: string
        ProdutoPreco: {
          Id: string
          TipoDeRecorrencia_Id?: string
        }
        Produto: {
          Id: string
          Nome: string
        }
      }[]
      Servicos: {
        Id: string
        ValorPraticado: string
        ServicoPreco_Id: string
        Servico: {
          Id: string
          Nome: string
          GeraOS: boolean
        }
      }[]
      OportunidadesDeProdutos?: {
        Id: string
        Nome: string
        Valor: string
      }[]
      OportunidadesDeServicos?: {
        Id: string
        Nome: string
        Valor: string
      }[]
      Combos: {
        Id: string
        Valor: string
        Combo: {
          Planos: {
            Id: string
            Plano: {
              Nome: string
            }
          }[]
          Produtos: {
            Id: string
            Produto: {
              Id: string
              Nome: string
            }
          }[]
          Servicos: {
            Id: string
            Servico: {
              Id: string
              Nome: string
            }
          }[]
        }
      }[]
    }
  }[]
  Planos: {
    Id: string
    PlanoPreco: {
      Id: string
      ValorBase: string
      ValorPraticado?: string
      ServicoPreco: {
        Id: string
        Valor: string
      }
    }
    Veiculo: number
    Veiculo_Id?: string
    Proposta_Id: string
    Plano: {
      Id: string
      Nome: string
      Precos: {
        ValorBase: string
        ValorPraticado?: string
        ServicoPreco: {
          Id: string
          Valor: string
        }
      }[]
      Servico: {
        Nome: string
      }
    }
  }[]
  Produtos: {
    Id: string
    ProdutoPreco: { Id: string; Valor: string; TipoDeRecorrencia_Id?: string }
    Veiculo: number
    Veiculo_Id?: string
    Proposta_Id: string
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
    }
  }[]
  Servicos: {
    Id: string
    ServicosPreco: {
      Id: string
      Valor: string
    }
    Veiculo: number
    Veiculo_Id?: string
    Proposta_Id: string
    Servico: {
      Id: string
      Nome: string
      GeraOS: boolean
      Produtos_Servicos: { Id: string; Produto: { Nome: string } }[]
      servicosServicos: {
        Id: string
        Servico: {
          Nome: string
        }
      }[]
    }
  }[]
  Oportunidades: {
    Id: string
    Veiculo: number
    Veiculo_Id?: string
    OportunidadeDeProduto?: {
      Id: string
      Nome: string
    }
    OportunidadeDeServico?: {
      Id: string
      Nome: string
    }
  }[]
}

type ProviderProps = {
  children: ReactNode
}

type SlidePanelStateType = {
  open: boolean
  type: 'createClient' | 'createAddress' | 'updateAddress'
  data?: GraphQLTypes['propostas_Propostas_Instalacoes']
}

export const ViewContext = createContext<ViewContextProps>(
  {} as ViewContextProps
)

export const ViewProvider = ({ children }: ProviderProps) => {
  const router = useRouter()
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelStateType>({
    open: false,
    type: 'createClient'
  })

  const [createProposalCombo, { loading: createProposalComboLoading }] =
    useTypedMutation({
      insert_propostas_Propostas_Combos_one: [
        {
          object: {
            Combo_Id: $`Combo_Id`,
            Proposta_Id: router.query.id,
            ComboPreco_Id: $`ComboPreco_Id`,
            Veiculo_Id: $`Veiculo_Id`,
            Veiculo: $`Veiculo`
          }
        },
        { Id: true }
      ]
    })

  const [createProposalService, { loading: createProposalServiceLoading }] =
    useTypedMutation({
      insert_propostas_Propostas_Servicos_one: [
        {
          object: {
            Servico_Id: $`Servico_Id`,
            Proposta_Id: router.query.id,
            ServicosPreco_Id: $`ServicosPreco_Id`,
            Veiculo_Id: $`Veiculo_Id`,
            Veiculo: $`Veiculo`
          }
        },
        { Id: true }
      ]
    })

  const [createProposalPlan, { loading: createProposalPlanLoading }] =
    useTypedMutation({
      insert_propostas_Propostas_Planos_one: [
        {
          object: {
            Plano_Id: $`Plano_Id`,
            Proposta_Id: router.query.id,
            PlanoPreco_Id: $`PlanoPreco_Id`,
            Veiculo_Id: $`Veiculo_Id`,
            Veiculo: $`Veiculo`
          }
        },
        { Id: true }
      ]
    })

  const [createProposalProduct, { loading: createProposalProductLoading }] =
    useTypedMutation({
      insert_propostas_Propostas_Produtos_one: [
        {
          object: {
            Produto_Id: $`Produto_Id`,
            Proposta_Id: router.query.id,
            ProdutoPreco_Id: $`ProdutoPreco_Id`,
            Veiculo_Id: $`Veiculo_Id`,
            Veiculo: $`Veiculo`,

            Oportunidades: {
              data: $`oportunidadesData`
            }
          }
        },
        { Id: true }
      ]
    })

  const [createProposalUpSelling, { loading: createProposalUpSellingLoading }] =
    useTypedMutation({
      insert_propostas_Propostas_Oportunidades_one: [
        {
          object: {
            OportunidadeProduto_Id: $`OportunidadeProduto_Id`,
            OportunidadeServico_Id: $`OportunidadeServico_Id`,
            Proposta_Id: router.query.id,
            Veiculo: $`Veiculo`
          }
        },
        { Id: true }
      ]
    })

  const [
    disableActiveVehicleBenefit,
    { loading: disableActiveVehicleBenefitLoading }
  ] = useTypedMutation({
    update_clientes_VeiculosAtivos_Beneficios_by_pk: [
      {
        pk_columns: { Id: $`Id` },
        _set: {
          Ativo: false,
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })

  const [
    createActiveVehicleService,
    { loading: createActiveVehicleServiceLoading }
  ] = useTypedMutation({
    insert_clientes_VeiculosAtivos_Servicos_one: [
      {
        object: {
          Ativo: true,
          VeiculoAtivo_Id: $`VeiculoAtivo_Id`,
          ServicoPreco_Id: $`ServicoPreco_Id`,
          Servico_Id: $`Servico_Id`
        }
      },
      {
        Id: true
      }
    ]
  })

  const [
    disableActiveVehicleService,
    { loading: disableActiveVehicleServiceLoading }
  ] = useTypedMutation({
    update_clientes_VeiculosAtivos_Servicos_by_pk: [
      {
        pk_columns: { Id: $`Id` },
        _set: {
          Ativo: false,
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })

  const [
    createActiveVehicleProduct,
    { loading: createActiveVehicleProductLoading }
  ] = useTypedMutation({
    insert_clientes_VeiculosAtivos_Produtos_one: [
      {
        object: {
          Ativo: true,
          VeiculoAtivo_Id: $`VeiculoAtivo_Id`,
          ProdutoPreco_Id: $`ProdutoPreco_Id`,
          Produto_Id: $`Produto_Id`
        }
      },
      {
        Id: true
      }
    ]
  })

  const [
    disableActiveVehicleProduct,
    { loading: disableActiveVehicleProductLoading }
  ] = useTypedMutation({
    update_clientes_VeiculosAtivos_Produtos_by_pk: [
      {
        pk_columns: { Id: $`Id` },
        _set: {
          Ativo: false,
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })

  const [
    createActiveVehicleBenefit,
    { loading: createActiveVehicleBenefitLoading }
  ] = useTypedMutation({
    insert_clientes_VeiculosAtivos_Beneficios_one: [
      {
        object: {
          Ativo: true,
          Portfolio_Id: $`Portfolio_Id`,
          PortfolioPreco_Id: $`PortfolioPreco_Id`,
          TipoPortfolio: $`TipoPortfolio`,
          VeiculoAtivo_Id: $`VeiculoAtivo_Id`
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
        pk_columns: { Id: $`Id` },
        _set: {
          PortfolioPreco_Id: $`PortfolioPreco_Id`
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
            Situacao_Id: 'aceito',
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
            Situacao_Id: 'recusado',
            updated_at: new Date()
          }
        },
        {
          Id: true
        }
      ]
    }
  )

  const [addClientToProposal, { loading: addClientToProposalLoading }] =
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

  const [updateProposalCombo, { loading: updateProposalComboLoading }] =
    useTypedMutation({
      update_propostas_Propostas_Combos_by_pk: [
        {
          pk_columns: { Id: $`Id` },
          _set: {
            Combo_Id: $`Combo_Id`,
            Veiculo_Id: $`Veiculo_Id`,
            ComboPreco_Id: $`ComboPreco_Id`,
            updated_at: new Date()
          }
        },
        {
          Id: true
        }
      ]
    })

  const [updateProposalService, { loading: updateProposalServiceLoading }] =
    useTypedMutation({
      update_propostas_Propostas_Servicos_by_pk: [
        {
          pk_columns: { Id: $`Id` },
          _set: {
            Servico_Id: $`Servico_Id`,
            Veiculo_Id: $`Veiculo_Id`,
            ServicosPreco_Id: $`ServicosPreco_Id`,
            updated_at: new Date()
          }
        },
        { Id: true }
      ]
    })

  const [updateProposalPlan, { loading: updateProposalPlanLoading }] =
    useTypedMutation({
      update_propostas_Propostas_Planos_by_pk: [
        {
          pk_columns: { Id: $`Id` },
          _set: {
            Plano_Id: $`Plano_Id`,
            Veiculo_Id: $`Veiculo_Id`,
            PlanoPreco_Id: $`PlanoPreco_Id`,
            updated_at: new Date()
          }
        },
        { Id: true }
      ]
    })

  const [updateProposalProduct, { loading: updateProposalProductLoading }] =
    useTypedMutation({
      update_propostas_Propostas_Produtos_by_pk: [
        {
          pk_columns: { Id: $`Id` },
          _set: {
            updated_at: new Date(),
            Produto_Id: $`Produto_Id`,
            ProdutoPreco_Id: $`ProdutoPreco_Id`,
            Veiculo_Id: $`Veiculo_Id`
          }
        },
        { Id: true }
      ]
    })

  const [updateProposalUpSelling, { loading: updateProposalUpSellingLoading }] =
    useTypedMutation({
      update_propostas_Propostas_Oportunidades_by_pk: [
        {
          pk_columns: { Id: $`Id` },
          _set: {
            Veiculo_Id: $`Veiculo_Id`
          }
        },
        { Id: true }
      ]
    })
  const [deleteProposalCombo, { loading: deleteProposalComboLoading }] =
    useTypedMutation({
      delete_propostas_Propostas_Combos_by_pk: [
        {
          Id: $`Id`
        },
        {
          Id: true
        }
      ]
    })

  const [deleteProposalService, { loading: deleteProposalServiceLoading }] =
    useTypedMutation({
      delete_propostas_Propostas_Servicos_by_pk: [
        {
          Id: $`Id`
        },
        { Id: true }
      ]
    })

  const [deleteProposalPlan, { loading: deleteProposalPlanLoading }] =
    useTypedMutation({
      delete_propostas_Propostas_Planos_by_pk: [
        {
          Id: $`Id`
        },
        { Id: true }
      ]
    })

  const [deleteProposalProduct, { loading: deleteProposalProductLoading }] =
    useTypedMutation({
      delete_propostas_Propostas_Produtos_by_pk: [
        {
          Id: $`Id`
        },
        { Id: true }
      ]
    })

  const [deleteProposalUpSelling, { loading: deleteProposalUpSellingLoading }] =
    useTypedMutation({
      delete_propostas_Propostas_Oportunidades_by_pk: [
        {
          Id: $`Id`
        },
        { Id: true }
      ]
    })

  const [changeVehicleSituation, { loading: changeVehicleSituationLoading }] =
    useTypedMutation({
      update_clientes_VeiculosAtivos_by_pk: [
        {
          pk_columns: {
            Id: $`Id`
          },
          _set: {
            Situacao_Id: $`Situacao_Id`
          }
        },
        { Id: true }
      ]
    })

  const [changeVehicleOwnership, { loading: changeVehicleOwnershipLoading }] =
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
        { Id: true }
      ],
      insert_clientes_VeiculosAtivos_one: [
        {
          object: {
            Situacao_Id: 'ativo',
            Veiculo_Id: $`Veiculo_Id`,
            Cliente_Id: $`Cliente_Id`,
            Franquia_Id: $`Franquia_Id`,
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

  const [createActiveVehicle, { loading: createActiveVehicleLoading }] =
    useTypedMutation({
      insert_clientes_VeiculosAtivos_one: [
        {
          object: {
            Situacao_Id: 'ativo',
            Veiculo_Id: $`Veiculo_Id`,
            Cliente_Id: $`Cliente_Id`,
            Franquia_Id: $`Franquia_Id`,
            OS_Id: null,
            Beneficios: {
              data: $`Beneficios`
            },
            Produtos: {
              data: []
            },
            Servicos: {
              data: []
            }
          }
        },
        {
          Id: true
        }
      ]
    })

  const [
    createProposalInstalation,
    { loading: createProposalInstalationLoading }
  ] = useTypedMutation({
    insert_propostas_Propostas_Instalacoes_one: [
      {
        object: {
          Endereco: $`Endereco`,
          Veiculo_Id: $`Veiculo_Id`,
          PosicaoDoVeiculo: $`PosicaoDoVeiculo`,
          Proposta_Id: router.query.id
        }
      },
      { Id: true }
    ]
  })

  const [
    updateProposalInstalation,
    { loading: updateProposalInstalationLoading }
  ] = useTypedMutation({
    update_propostas_Propostas_Instalacoes_by_pk: [
      {
        pk_columns: {
          Id: $`Id`
        },
        _set: {
          Endereco: $`Endereco`,
          Veiculo_Id: $`Veiculo_Id`
        }
      },
      { Id: true }
    ]
  })

  const [
    deleteProposalInstalation,
    { loading: deleteProposalInstalationLoading }
  ] = useTypedMutation({
    delete_propostas_Propostas_Instalacoes_by_pk: [
      {
        Id: $`Id`
      },
      { Id: true }
    ]
  })

  const {
    data: proposalInstallationsData,
    refetch: proposalInstallationsRefetch,
    loading: proposalInstallationsLoading
  } = useTypedQuery({
    propostas_Propostas_Instalacoes: [
      {
        where: {
          deleted_at: { _is_null: true },
          Proposta_Id: { _eq: router.query.id }
        }
      },
      {
        Id: true,
        Endereco: true,
        // VeiculoRelacionamento: {
        //   Id: true,
        //   Apelido: true,
        //   Placa: true,
        //   NumeroDoChassi: true,
        //   Categoria: {
        //     Id: true,
        //     Nome: true
        //   }
        // },
        Veiculo_Id: true,
        PosicaoDoVeiculo: true,
        Proposta_Id: true
      }
    ]
  })

  const {
    data: proposalData,
    refetch: proposalRefetch,
    loading: proposalLoading
  } = useTypedQuery(
    {
      propostas_Propostas_by_pk: [
        { Id: router.query.id },
        {
          Id: true,
          Cliente_Id: true,
          Lead_Id: true,
          Ticket_Id: true,
          TipoDePagamento_Id: true,
          TipoDeRecorrencia_Id: true,
          Usuario_Id: true,
          // Cliente: {
          //   Id: true,
          //   Pessoa: {
          //     Nome: true
          //   }
          // },
          // Lead: {
          //   Id: true,
          //   Nome: true
          // },
          // Ticket: {
          //   Id: true,
          //   Lead: {
          //     Nome: true
          //   }
          // },
          // TipoDePagamento: {
          //   Comentario: true,
          //   Valor: true
          // },
          // TipoDeRecorrencia: {
          //   Comentario: true,
          //   Valor: true
          // },
          // Usuario: {
          //   Id: true,
          //   Cliente: {
          //     Pessoa: {
          //       Nome: true
          //     }
          //   },
          //   Colaborador: {
          //     Pessoa: {
          //       Nome: true
          //     }
          //   }
          // },
          Situacao: {
            Comentario: true,
            Valor: true
          },
          Combos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              ComboPreco: { Id: true, ValorBase: true },
              Veiculo: true,
              Veiculo_Id: true,
              Proposta_Id: true,
              Combo: {
                Id: true,
                Nome: true,
                Precos: [
                  { order_by: [{ created_at: 'desc' }] },
                  { ValorBase: true }
                ],
                Planos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Id: true,
                    ValorPraticado: true,
                    PlanoPreco_Id: true,
                    Plano: {
                      Id: true,
                      Nome: true
                    }
                  }
                ],
                Produtos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Id: true,
                    ValorPraticado: true,
                    ProdutoPreco: {
                      Id: true,
                      TipoDeRecorrencia_Id: true
                    },
                    Produto: {
                      Id: true,
                      Nome: true
                    }
                  }
                ],
                Servicos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Id: true,
                    ValorPraticado: true,
                    ServicoPreco_Id: true,
                    Servico: {
                      Id: true,
                      Nome: true,
                      GeraOS: true
                    }
                  }
                ],
                OportunidadesDeProdutos: [
                  {},
                  {
                    Id: true,
                    Nome: true,
                    Valor: true
                  }
                ],
                OportunidadesDeServicos: [
                  {},
                  {
                    Id: true,
                    Nome: true,
                    Valor: true
                  }
                ],
                Combos: [
                  { where: { deleted_at: { _is_null: true } } },
                  {
                    Id: true,
                    Valor: true,
                    Combo: {
                      Planos: [
                        { where: { deleted_at: { _is_null: true } } },
                        {
                          Id: true,
                          Plano: {
                            Nome: true
                          }
                        }
                      ],
                      Produtos: [
                        { where: { deleted_at: { _is_null: true } } },
                        {
                          Id: true,
                          Produto: {
                            Id: true,
                            Nome: true
                          }
                        }
                      ],
                      Servicos: [
                        { where: { deleted_at: { _is_null: true } } },
                        {
                          Id: true,
                          Servico: {
                            Id: true,
                            Nome: true
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ],
          Planos: [
            {},
            {
              Id: true,
              PlanoPreco: {
                Id: true,
                ValorBase: true,
                ValorPraticado: true,
                ServicoPreco: { Valor: true, Id: true }
              },
              Veiculo: true,
              Veiculo_Id: true,
              Proposta_Id: true,
              Plano: {
                Id: true,
                Nome: true,
                Precos: [
                  { order_by: [{ created_at: 'desc' }] },
                  {
                    ValorBase: true,
                    ValorPraticado: true,
                    ServicoPreco: { Valor: true, Id: true }
                  }
                ],
                Servico: {
                  Nome: true
                }
              }
            }
          ],
          Produtos: [
            {},
            {
              Id: true,
              ProdutoPreco: {
                Id: true,
                Valor: true,
                TipoDeRecorrencia_Id: true
              },
              Veiculo: true,
              Veiculo_Id: true,
              Proposta_Id: true,
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
                ]
              }
            }
          ],
          Servicos: [
            {},
            {
              Id: true,
              ServicosPreco: {
                Id: true,
                Valor: true
              },
              Veiculo: true,
              Veiculo_Id: true,
              Proposta_Id: true,
              Servico: {
                Id: true,
                Nome: true,
                GeraOS: true,
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
                ]
              }
            }
          ],
          Oportunidades: [
            {},
            {
              Id: true,
              Veiculo: true,
              Veiculo_Id: true,
              OportunidadeDeProduto: {
                Id: true,
                Nome: true
              },
              OportunidadeDeServico: {
                Id: true,
                Nome: true
              }
            }
          ]
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  async function getProposalArray(position: number) {
    if (router.query.id) {
      const { data: proposalArrayData } = await useTypedClientQuery({
        propostas_Propostas_by_pk: [
          { Id: router.query.id },
          {
            Id: true,
            Situacao: {
              Comentario: true,
              Valor: true
            },
            Combos: [
              {
                where: {
                  Veiculo: { _eq: position },
                  deleted_at: { _is_null: true }
                }
              },
              {
                Id: true,
                Veiculo: true,
                ComboPreco: {
                  Id: true,
                  ValorBase: true
                },
                Proposta_Id: true,
                Veiculo_Id: true,
                Combo: {
                  Id: true,
                  Nome: true,
                  Precos: [
                    { order_by: [{ created_at: order_by.desc }] },
                    { ValorBase: true }
                  ],
                  Planos: [
                    { where: { deleted_at: { _is_null: true } } },
                    {
                      Id: true,
                      ValorPraticado: true,
                      PlanoPreco: {
                        Id: true,
                        ValorBase: true,
                        ValorPraticado: true,
                        ServicoPreco: {
                          Id: true,
                          Valor: true
                        }
                      },
                      Plano: {
                        Id: true,
                        Nome: true
                      }
                    }
                  ],
                  Produtos: [
                    { where: { deleted_at: { _is_null: true } } },
                    {
                      Id: true,
                      ValorPraticado: true,
                      ProdutoPreco: {
                        Id: true,
                        TipoDeRecorrencia_Id: true
                      },
                      Produto: {
                        Id: true,
                        Nome: true
                      }
                    }
                  ],
                  Servicos: [
                    { where: { deleted_at: { _is_null: true } } },
                    {
                      Id: true,
                      ValorPraticado: true,
                      ServicoPreco_Id: true,
                      Servico: {
                        Id: true,
                        Nome: true,
                        GeraOS: true
                      }
                    }
                  ],
                  OportunidadesDeProdutos: [
                    { where: { deleted_at: { _is_null: true } } },
                    {
                      Id: true,
                      Nome: true,
                      Valor: true
                    }
                  ],
                  OportunidadesDeServicos: [
                    { where: { deleted_at: { _is_null: true } } },
                    {
                      Id: true,
                      Nome: true,
                      Valor: true
                    }
                  ],
                  Combos: [
                    { where: { deleted_at: { _is_null: true } } },
                    {
                      Id: true,
                      Valor: true,
                      Combo: {
                        Planos: [
                          { where: { deleted_at: { _is_null: true } } },
                          {
                            Id: true,
                            Plano: {
                              Nome: true
                            }
                          }
                        ],
                        Produtos: [
                          { where: { deleted_at: { _is_null: true } } },
                          {
                            Id: true,
                            Produto: {
                              Id: true,
                              Nome: true
                            }
                          }
                        ],
                        Servicos: [
                          { where: { deleted_at: { _is_null: true } } },
                          {
                            Id: true,
                            Servico: {
                              Id: true,
                              Nome: true
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            Planos: [
              { where: { Veiculo: { _eq: position } } },
              {
                Id: true,
                PlanoPreco: {
                  Id: true,
                  ValorBase: true,
                  ValorPraticado: true,
                  ServicoPreco: {
                    Id: true,
                    Valor: true
                  }
                },
                Veiculo: true,
                Veiculo_Id: true,
                Plano: {
                  Id: true,
                  Nome: true,
                  Precos: [
                    { order_by: [{ created_at: order_by.desc }] },
                    {
                      ValorBase: true,
                      ValorPraticado: true,
                      ServicoPreco: {
                        Id: true,
                        Valor: true
                      }
                    }
                  ],
                  Servico: {
                    Nome: true
                  }
                }
              }
            ],
            Produtos: [
              { where: { Veiculo: { _eq: position } } },
              {
                Id: true,
                ProdutoPreco: {
                  Id: true,
                  Valor: true,
                  TipoDeRecorrencia_Id: true
                },
                Veiculo: true,
                Veiculo_Id: true,
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
                  ]
                }
              }
            ],
            Servicos: [
              { where: { Veiculo: { _eq: position } } },
              {
                Id: true,
                ServicosPreco: {
                  Id: true,
                  Valor: true
                },
                Veiculo: true,
                Veiculo_Id: true,
                Servico: {
                  Id: true,
                  Nome: true,
                  GeraOS: true,
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
                  ]
                }
              }
            ],
            Oportunidades: [
              { where: { Veiculo: { _eq: position } } },
              {
                Id: true,
                Veiculo: true,
                Veiculo_Id: true,
                OportunidadeDeProduto: {
                  Id: true,
                  Nome: true
                },
                OportunidadeDeServico: {
                  Id: true,
                  Nome: true
                }
              }
            ]
          }
        ]
      })
      return proposalArrayData.propostas_Propostas_by_pk
    }
  }

  async function getProposalClienteById(Id: string) {
    const { data } = await useTypedClientQuery({
      identidades_Clientes_by_pk: [
        {
          Id
        },
        {
          Id: true,
          Pessoa: {
            Nome: true
          }
        }
      ]
    })
    return data?.identidades_Clientes_by_pk
  }

  async function getProposalInstallationByVehiclePosition(vehicle: number) {
    const { data } = await useTypedClientQuery({
      propostas_Propostas_Instalacoes: [
        {
          where: {
            Proposta_Id: { _eq: router.query.id },
            PosicaoDoVeiculo: { _eq: vehicle }
          }
        },
        {
          Endereco: true,
          Veiculo_Id: true,
          PosicaoDoVeiculo: true,
          Id: true
        }
      ]
    })
    return data?.propostas_Propostas_Instalacoes
  }

  async function getVehicleById(Id: string) {
    const { data } = await useTypedClientQuery({
      clientes_Veiculos_by_pk: [
        {
          Id
        },
        {
          Id: true,
          Placa: true,
          NumeroDoChassi: true,
          Categoria_Id: true,
          Apelido: true
        }
      ]
    })

    const { data: category } = await useTypedClientQuery({
      CategoriasDeVeiculos_by_pk: [
        {
          Id: data.clientes_Veiculos_by_pk?.Categoria_Id
        },
        {
          Id: true,
          Nome: true
        }
      ]
    })
    return {
      data: data.clientes_Veiculos_by_pk,
      category: category.CategoriasDeVeiculos_by_pk
    }
  }

  async function getVehicleCategoryById(Id: string) {
    const { data: category } = await useTypedClientQuery({
      CategoriasDeVeiculos_by_pk: [
        {
          Id
        },
        {
          Id: true,
          Nome: true
        }
      ]
    })
    return category.CategoriasDeVeiculos_by_pk
  }

  async function getLeadById(Id: string) {
    const { data } = await useTypedClientQuery({
      clientes_Leads_by_pk: [
        {
          Id
        },
        {
          Id: true,
          Nome: true
        }
      ]
    })
    return data.clientes_Leads_by_pk
  }

  async function getUserById(Id: string) {
    const { data } = await useTypedClientQuery({
      autenticacao_Usuarios_by_pk: [
        {
          Id
        },
        {
          Id: true,
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

  async function getActiveVehicleById(Veiculo_Id: string) {
    const { data } = await useTypedClientQuery({
      clientes_VeiculosAtivos: [
        {
          where: {
            deleted_at: { _is_null: true },
            Veiculo_Id: { _eq: Veiculo_Id }
            // Situacao: { Valor: { _eq: 'ativo' } }
          }
        },
        {
          Id: true,
          Cliente_Id: true,
          Franquia_Id: true,
          OS_Id: true,
          Situacao: {
            Valor: true
          },
          Beneficios: [
            { where: { deleted_at: { _is_null: true }, Ativo: { _eq: true } } },
            {
              Id: true,
              Portfolio_Id: true,
              PortfolioPreco_Id: true,
              TipoPortfolio: true
            }
          ],
          Produtos: [
            { where: { deleted_at: { _is_null: true }, Ativo: { _eq: true } } },
            {
              Id: true,
              Ativo: true,
              Produto_Id: true,
              ProdutoPreco_Id: true
            }
          ],
          Servicos: [
            { where: { deleted_at: { _is_null: true }, Ativo: { _eq: true } } },
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

  const addressSchema = yup.object().shape({
    Cep: yup.string().required('Preencha o campo para continuar'),
    Numero: yup.string().required('Preencha o campo para continuar')
  })

  return (
    <ViewContext.Provider
      value={{
        proposalData: proposalData?.propostas_Propostas_by_pk,
        proposalRefetch,
        proposalLoading,
        proposalInstallationsData:
          proposalInstallationsData?.propostas_Propostas_Instalacoes,
        proposalInstallationsRefetch,
        proposalInstallationsLoading,
        slidePanelState,
        setSlidePanelState,
        getProposalArray,
        createProposalCombo,
        createProposalService,
        createProposalPlan,
        createProposalProduct,
        createProposalUpSelling,
        createProposalComboLoading,
        createProposalServiceLoading,
        createProposalPlanLoading,
        createProposalProductLoading,
        createProposalUpSellingLoading,
        createProposalInstalation,
        createProposalInstalationLoading,
        updateProposalInstalation,
        updateProposalInstalationLoading,
        acceptProposal,
        acceptProposalLoading,
        refuseProposal,
        refuseProposalLoading,
        addClientToProposal,
        addClientToProposalLoading,
        updateProposalCombo,
        updateProposalService,
        updateProposalPlan,
        updateProposalProduct,
        updateProposalUpSelling,
        updateProposalUpSellingLoading,
        updateProposalComboLoading,
        updateProposalServiceLoading,
        updateProposalPlanLoading,
        updateProposalProductLoading,
        deleteProposalCombo,
        deleteProposalService,
        deleteProposalPlan,
        deleteProposalProduct,
        deleteProposalUpSelling,
        deleteProposalServiceLoading,
        deleteProposalPlanLoading,
        deleteProposalProductLoading,
        deleteProposalUpSellingLoading,
        deleteProposalComboLoading,
        addressSchema,
        getProposalInstallationByVehiclePosition,
        deleteProposalInstalation,
        deleteProposalInstalationLoading,
        getVehicleById,
        getProposalClienteById,
        getVehicleCategoryById,
        getLeadById,
        getUserById,
        disableActiveVehicleBenefit,
        disableActiveVehicleBenefitLoading,
        disableActiveVehicleService,
        disableActiveVehicleServiceLoading,
        disableActiveVehicleProduct,
        disableActiveVehicleProductLoading,
        getActiveVehicleById,
        createActiveVehicleBenefit,
        createActiveVehicleBenefitLoading,
        updateActiveVehicleBenefit,
        updateActiveVehicleBenefitLoading,
        createActiveVehicleService,
        createActiveVehicleServiceLoading,
        createActiveVehicleProduct,
        createActiveVehicleProductLoading,
        changeVehicleOwnership,
        changeVehicleOwnershipLoading,
        changeVehicleSituation,
        changeVehicleSituationLoading,
        createActiveVehicle,
        createActiveVehicleLoading
      }}
    >
      {children}
    </ViewContext.Provider>
  )
}

export const useView = () => {
  return useContext(ViewContext)
}
