import {
  operacional_OrdemDeServico_Agendamentos_Situacoes_enum,
  order_by
} from '&erp/graphql/generated/zeus'
import { useTypedQuery } from '&erp/graphql/generated/zeus/apollo'
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
import { ClientType } from './types/client'
import { ProductItensType } from './types/productItens'
import { ServiceOrderData } from './types/serviceOrder'
import { VehicleType } from './types/vehicle'

type UpdateContextProps = {
  client: ClientType
  setClient: Dispatch<SetStateAction<ClientType>>
  productItens: ProductItensType[]
  setProductItens: Dispatch<SetStateAction<ProductItensType[]>>
  activeEdit: boolean
  setActiveEdit: Dispatch<SetStateAction<boolean>>
  vehicle: VehicleType
  setVehicle: Dispatch<SetStateAction<VehicleType>>
  slidePanelState: SlidePanelStateType
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>
  serviceOrderData?: ServiceOrderData
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
  serviceOrdersSchema: yup.AnyObjectSchema
  rejectSchema: yup.AnyObjectSchema
}

type ProviderProps = {
  children: ReactNode
}

type SlidePanelStateType = {
  type: 'schedule' | 'activities' | 'giveBack'
  open: boolean
}

export const UpdateContext = createContext<UpdateContextProps>(
  {} as UpdateContextProps
)

export const UpdateProvider = ({ children }: ProviderProps) => {
  const [client, setClient] = useState<ClientType>()
  const [productItens, setProductItens] = useState<ProductItensType[]>([])
  const [activeEdit, setActiveEdit] = useState(false)
  const [vehicle, setVehicle] = useState<VehicleType>()
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
          Valor: [{}, true]
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

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
          PossuiGNV: true,
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
              where: {
                deleted_at: { _is_null: true },
                Situacao_Id: {
                  _neq: operacional_OrdemDeServico_Agendamentos_Situacoes_enum.frustada
                }
              },
              order_by: [{ created_at: order_by.desc }]
            },
            {
              Id: true,
              Agendamento: true,
              FimDoServico: true,
              InicioDoServico: true,
              Colaborador_Id: true,
              Contato: true,
              Responsavel: true,
              Endereco: [{}, true],
              Situacao: {
                Valor: true,
                Comentario: true
              },
              Itens: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Id: true,
                  Produto: {
                    Id: true
                  },
                  RetiradoDoEstoque: true,
                  Item: {
                    Id: true,
                    Chips: [
                      {
                        where: {
                          deleted_at: { _is_null: true },
                          Ativo: { _eq: true }
                        }
                      },
                      {
                        Id: true
                      }
                    ],
                    Equipamentos: [
                      {
                        where: {
                          deleted_at: { _is_null: true },
                          Ativo: { _eq: true }
                        }
                      },
                      {
                        Id: true
                      }
                    ],
                    Identificadores: [
                      {
                        where: {
                          deleted_at: { _is_null: true },
                          Ativo: { _eq: true }
                        }
                      },
                      {
                        Id: true
                      }
                    ],
                    Rastreadores: [
                      {
                        where: {
                          deleted_at: { _is_null: true },
                          Ativo: { _eq: true }
                        }
                      },
                      {
                        Id: true
                      }
                    ],
                    KitsDeInsumo: [
                      {
                        where: {
                          deleted_at: { _is_null: true },
                          Ativo: { _eq: true }
                        }
                      },
                      {
                        Id: true
                      }
                    ],
                    KitsDeInstalacao: [
                      {
                        where: {
                          deleted_at: { _is_null: true },
                          Ativo: { _eq: true }
                        }
                      },
                      {
                        Id: true
                      }
                    ]
                  }
                }
              ]
            }
          ],
          CodigoIdentificador: true,
          Proposta_Id: true,
          Combos: [
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
              OSPlanos: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Id: true,
                  PlanoPreco_Id: true,
                  Plano: {
                    Id: true,
                    Nome: true
                  },
                  OrdemDeServicoCombo_Id: true,
                  OSServicos: [
                    { where: { deleted_at: { _is_null: true } } },
                    {
                      Id: true,
                      Servico: {
                        Id: true,
                        Nome: true,
                        GeraOS: true
                      },
                      Beneficio: true,
                      Servico_Id: true,
                      PrecoDeAdesao_Id: true,
                      PrecoDeRecorrencia_Id: true,
                      OrdemDeServicoCombo_Id: true,
                      OrdemDeServicoPlano_Id: true
                    }
                  ],
                  OSProdutos: [
                    { where: { deleted_at: { _is_null: true } } },
                    {
                      Id: true,
                      Quantidade: true,
                      Produto: {
                        Id: true,
                        Nome: true
                      },
                      PrecoDeAdesao_Id: true,
                      PrecoDeRecorrencia_Id: true,
                      Identificavel_Id: true,
                      TipoDeIdentificavel_Id: true,
                      OrdemDeServicoCombo_Id: true,
                      OrdemDeServicoPlano_Id: true
                    }
                  ]
                }
              ],
              OSServicos: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Id: true,
                  Servico: {
                    Id: true,
                    Nome: true,
                    GeraOS: true
                  },
                  Beneficio: true,
                  Servico_Id: true,
                  PrecoDeAdesao_Id: true,
                  PrecoDeRecorrencia_Id: true,
                  OrdemDeServicoCombo_Id: true,
                  OrdemDeServicoPlano_Id: true
                }
              ],
              OSProdutos: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Id: true,
                  Quantidade: true,
                  Produto: {
                    Id: true,
                    Nome: true
                  },
                  PrecoDeAdesao_Id: true,
                  PrecoDeRecorrencia_Id: true,
                  Identificavel_Id: true,
                  TipoDeIdentificavel_Id: true,
                  OrdemDeServicoCombo_Id: true,
                  OrdemDeServicoPlano_Id: true
                }
              ]
            }
          ],
          Planos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              PlanoPreco_Id: true,
              Plano: {
                Id: true,
                Nome: true
              },
              OrdemDeServicoCombo_Id: true,
              OSServicos: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Id: true,
                  Servico: {
                    Id: true,
                    Nome: true,
                    GeraOS: true
                  },
                  Beneficio: true,
                  Servico_Id: true,
                  PrecoDeAdesao_Id: true,
                  PrecoDeRecorrencia_Id: true,
                  OrdemDeServicoCombo_Id: true,
                  OrdemDeServicoPlano_Id: true
                }
              ],
              OSProdutos: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Id: true,
                  Quantidade: true,
                  Produto: {
                    Id: true,
                    Nome: true
                  },
                  PrecoDeAdesao_Id: true,
                  PrecoDeRecorrencia_Id: true,
                  Identificavel_Id: true,
                  TipoDeIdentificavel_Id: true,
                  OrdemDeServicoCombo_Id: true,
                  OrdemDeServicoPlano_Id: true
                }
              ]
            }
          ],
          Servicos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              Servico: {
                Id: true,
                Nome: true,
                GeraOS: true
              },
              Beneficio: true,
              Servico_Id: true,
              PrecoDeAdesao_Id: true,
              PrecoDeRecorrencia_Id: true,
              OrdemDeServicoCombo_Id: true,
              OrdemDeServicoPlano_Id: true
            }
          ],
          Produtos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Id: true,
              Quantidade: true,
              Produto: {
                Id: true,
                Nome: true
              },
              PrecoDeAdesao_Id: true,
              PrecoDeRecorrencia_Id: true,
              Identificavel_Id: true,
              TipoDeIdentificavel_Id: true,
              OrdemDeServicoCombo_Id: true,
              OrdemDeServicoPlano_Id: true
            }
          ],
          Veiculo_Id: true,
          Proposta: {
            Id: true,
            Cliente_Id: true
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
          order_by: [{ created_at: order_by.desc }],
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

  const serviceOrdersSchema = yup.object().shape({
    Agendamento: yup.date().required('Preencha o campo para continuar'),
    Colaborador_Id: yup.object().required('Preencha o campo para continuar'),
    Responsavel: yup.string().required('Preencha o campo para continuar'),
    Telefone: yup.string().required('Preencha o campo para continuar'),
    Cep: yup.string().required('Preencha o campo para continuar'),
    Numero: yup.string().required('Preencha o campo para continuar')
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
        serviceOrdersSchema,
        rejectSchema,
        slidePanelState,
        setSlidePanelState,
        serviceOrderActivitiesData:
          serviceOrderActivitiesData?.operacional_OrdemDeServico_Atividades,
        serviceOrderActivitiesRefetch,
        serviceOrderActivitiesLoading,
        collaboratorsData: collaboratorsData?.identidades_Colaboradores,
        collaboratorsRefetch,
        client,
        setClient,
        productItens,
        setProductItens,
        activeEdit,
        setActiveEdit,
        vehicle,
        setVehicle
      }}
    >
      {children}
    </UpdateContext.Provider>
  )
}

export const useUpdate = () => {
  return useContext(UpdateContext)
}
