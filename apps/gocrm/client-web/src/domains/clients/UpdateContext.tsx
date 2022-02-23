import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client'
import {
  useTypedClientQuery,
  useTypedMutation,
  useTypedQuery,
  $
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
import {
  order_by,
  propostas_Propostas_Situacoes_enum
} from '&crm/graphql/generated/zeus'
import axios from 'axios'

type UpdateContextProps = {
  slidePanelState: SlidePanelStateType
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>

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

  clientData?: {
    Id: string
    Pessoa: {
      Nome: string
      Identificador: string
      PessoaJuridica: boolean
    }
    VeiculosAtivos: {
      Id: string
      OS_Id?: string
      Situacao_Id: string
      Beneficios: {
        Id: string
        Portfolio_Id: string
        TipoPortfolio: string
        PortfolioPreco_Id?: string
        PrecoDeAdesao_Id?: string
        PrecoDeRecorrencia_Id?: string
      }[]
      Produtos: {
        PrecoDeAdesao_Id?: string
        PrecoDeRecorrencia_Id?: string
        Produto_Id: string
        Identificador?: string
        TipoItem_Id?: string
      }[]
      Servicos: {
        PrecoDeAdesao_Id?: string
        PrecoDeRecorrencia_Id?: string
        Servico_Id: string
      }[]
      Situacao: {
        Comentario: string
        Valor: string
      }
      Franquia_Id?: string
      Veiculo: {
        Id: string
        Apelido?: string
        Placa?: string
        NumeroDoChassi?: string
      }
    }[]
  }
  clientRefetch: () => void
  clientLoading: boolean
  vehiclesData?: {
    Id: string
    Apelido?: string
    NumeroDoChassi?: string
    Placa?: string
  }[]
  vehiclesLoading: boolean
  vehiclesRefetch: () => void
  getFranquiaById: (Id: string) => Promise<
    | {
        Nome: string
        Id: string
      }
    | undefined
  >
  getServiceById: (
    serviceId: string,
    priceId: string,
    secondPriceId?: string
  ) => Promise<{
    service: {
      Id: string
      Nome: string
      GeraOS: boolean
    }
    price: {
      Id: string
      Valor: string
      TipoDePreco?: {
        Valor: string
      }
    }
    secondPrice: {
      Id: string
      Valor: string
      TipoDePreco?: {
        Valor: string
      }
    }
  }>
  getProductById: (
    productId: string,
    priceId: string,
    secondPriceId?: string
  ) => Promise<{
    product: {
      Nome: string
      Id: string
    }
    price: {
      Id: string
      Valor: string
      TipoDePreco?: {
        Valor: string
      }
    }
    secondPrice: {
      Id: string
      Valor: string
      TipoDePreco?: {
        Valor: string
      }
    }
  }>
  getPlanById: (
    planId: string,
    priceId: string
  ) => Promise<{
    plan: {
      Id: string
      Nome: string
    }
    price: {
      Id: string
      ValorDeAdesao: string
      ValorDeRecorrencia: string
    }
  }>
  getComboById: (
    comboId: string,
    priceId: string
  ) => Promise<{
    combo?: {
      Id: string
      Nome: string
      Planos: {
        Plano_Id: string
      }[]
      Produtos: {
        Produto_Id: string
      }[]
      Servicos: {
        Servico_Id: string
      }[]
    }
    price?: {
      Id: string
      ValorDeAdesao: string
      ValorDeRecorrencia: string
    }
  }>
  getUserByClientId: (Id: string) => Promise<
    {
      Id: string
    }[]
  >
  createProposal: (
    options?: MutationFunctionOptions<
      {
        insert_propostas_Propostas_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createProposalLoading: boolean
  userAndTicketData?: {
    atendimentos_Tickets?: {
      Id: string
    }[]
    autenticacao_Usuarios?: {
      Id: string
    }[]
  }
  userAndTicketLoading: boolean
  userAndTicketRefetch: () => void
  changeVehicleSchema: yup.AnyObjectSchema
  createVehicleSchema: yup.AnyObjectSchema
  getItemIdentifier: (
    IdentifierType: string,
    Identifier: string
  ) => Promise<string>
}

type ProviderProps = {
  children: ReactNode
}

type SlidePanelStateType = {
  type: 'ownership' | 'vehicle' | 'proposal' | 'createVehicle'
  open: boolean
}

export const UpdateContext = createContext<UpdateContextProps>(
  {} as UpdateContextProps
)

export const UpdateProvider = ({ children }: ProviderProps) => {
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelStateType>({
    open: false,
    type: 'ownership'
  })

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

  const router = useRouter()

  const [createProposal, { loading: createProposalLoading }] = useTypedMutation(
    {
      insert_propostas_Propostas_one: [
        {
          object: {
            Id: $`Id`,
            Veiculos: {
              data: $`veiculosData`
            },
            Lead_Id: $`Lead_Id`,
            Ticket_Id: $`Ticket_Id`,
            Usuario_Id: $`Usuario_Id`,
            Situacao_Id: propostas_Propostas_Situacoes_enum.criado,
            Cliente_Id: $`Cliente_Id`
          }
        },
        { Id: true }
      ]
    }
  )

  const {
    data: clientData,
    refetch: clientRefetch,
    loading: clientLoading
  } = useTypedQuery(
    {
      identidades_Clientes_by_pk: [
        {
          Id: router.query.id
        },
        {
          Id: true,
          Pessoa: {
            Nome: true,
            Identificador: true,
            PessoaJuridica: true
          },
          VeiculosAtivos: [
            {
              where: {
                deleted_at: { _is_null: true }
              }
            },
            {
              Id: true,
              OS_Id: true,
              Situacao_Id: true,
              Beneficios: [
                {
                  where: {
                    deleted_at: { _is_null: true }
                  }
                },
                {
                  Id: true,
                  Portfolio_Id: true,
                  TipoPortfolio: true,
                  PortfolioPreco_Id: true,
                  PrecoDeAdesao_Id: true,
                  PrecoDeRecorrencia_Id: true
                }
              ],
              Produtos: [
                {
                  where: {
                    deleted_at: { _is_null: true }
                  }
                },
                {
                  PrecoDeAdesao_Id: true,
                  PrecoDeRecorrencia_Id: true,
                  Produto_Id: true,
                  Identificador: true,
                  TipoItem_Id: true
                }
              ],
              Servicos: [
                {
                  where: {
                    deleted_at: { _is_null: true }
                  }
                },
                {
                  Servico_Id: true,
                  PrecoDeAdesao_Id: true,
                  PrecoDeRecorrencia_Id: true
                }
              ],
              Situacao: {
                Comentario: true,
                Valor: true
              },
              Franquia_Id: true,
              Veiculo: {
                Id: true,
                Apelido: true,
                Placa: true,
                NumeroDoChassi: true
              }
            }
          ]
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const {
    data: vehiclesData,
    loading: vehiclesLoading,
    refetch: vehiclesRefetch
  } = useTypedQuery(
    {
      clientes_Veiculos: [
        {
          where: {
            deleted_at: { _is_null: true },
            _not: { VeiculosAtivos: {} }
          }
        },
        {
          Id: true,
          Apelido: true,
          NumeroDoChassi: true,
          Placa: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const {
    data: userAndTicketData,
    refetch: userAndTicketRefetch,
    loading: userAndTicketLoading
  } = useTypedQuery(
    {
      autenticacao_Usuarios: [
        {
          where: { deleted_at: { _is_null: true } }
        },
        {
          Id: true
        }
      ],
      atendimentos_Tickets: [
        {
          where: { deleted_at: { _is_null: true } }
        },
        {
          Id: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  async function getUserByClientId(Id: string) {
    const { data } = await useTypedClientQuery(
      {
        autenticacao_Usuarios: [
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
    return data.autenticacao_Usuarios
  }

  async function getProductById(
    productId: string,
    priceId: string,
    secondPriceId?: string
  ) {
    const { data } = await useTypedClientQuery({
      comercial_Produtos_by_pk: [
        {
          Id: productId
        },
        {
          Id: true,
          Nome: true
        }
      ]
    })

    return {
      product: data.comercial_Produtos_by_pk,
      price: priceId ? await getProductPriceById(priceId) : null,
      secondPrice: secondPriceId
        ? await getProductPriceById(secondPriceId)
        : null
    }
  }

  async function getProductPriceById(priceId: string) {
    const { data } = await useTypedClientQuery({
      comercial_PrestadoresDeServicos_Produtos_Precos_by_pk: [
        {
          Id: priceId
        },
        {
          Id: true,
          Valor: true,
          TipoDePreco: { Valor: true }
        }
      ]
    })

    return data.comercial_PrestadoresDeServicos_Produtos_Precos_by_pk
  }

  async function getPlanById(planId: string, priceId: string) {
    const { data } = await useTypedClientQuery({
      comercial_Planos_by_pk: [
        {
          Id: planId
        },
        {
          Id: true,
          Nome: true
        }
      ],
      comercial_Planos_Precos_by_pk: [
        {
          Id: priceId
        },
        {
          Id: true,
          ValorDeAdesao: true,
          ValorDeRecorrencia: true
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
          Id: true,
          Nome: true,
          Planos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Plano_Id: true
            }
          ],
          Produtos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Produto_Id: true
            }
          ],
          Servicos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Servico_Id: true
            }
          ]
        }
      ],
      comercial_Combos_Precos_by_pk: [
        {
          Id: priceId
        },
        {
          Id: true,
          ValorDeAdesao: true,
          ValorDeRecorrencia: true
        }
      ]
    })

    return {
      combo: data.comercial_Combos_by_pk,
      price: data.comercial_Combos_Precos_by_pk
    }
  }

  async function getServiceById(
    serviceId: string,
    priceId: string,
    secondPriceId?: string
  ) {
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
      ]
    })

    return {
      service: data.comercial_Servicos_by_pk,
      price: priceId ? await getServicePriceById(priceId) : null,
      secondPrice: secondPriceId
        ? await getServicePriceById(secondPriceId)
        : null
    }
  }

  async function getServicePriceById(priceId: string) {
    const { data } = await useTypedClientQuery({
      comercial_PrestadoresDeServicos_Servicos_Precos_by_pk: [
        {
          Id: priceId
        },
        {
          Id: true,
          Valor: true,
          TipoDePreco: { Valor: true }
        }
      ]
    })

    return data.comercial_PrestadoresDeServicos_Servicos_Precos_by_pk
  }

  async function getFranquiaById(Id: string) {
    const { data } = await useTypedClientQuery({
      comercial_PrestadoresDeServicos_by_pk: [
        {
          Id
        },
        {
          Id: true,
          Nome: true
        }
      ]
    })

    return data.comercial_PrestadoresDeServicos_by_pk
  }

  async function getItemIdentifier(IdentifierType: string, Identifier: string) {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname
      let value = ''
      switch (IdentifierType) {
        case 'chips':
          await axios
            .get(
              `http://${hostname}:3002/api/identificaveis/chips?Id=${Identifier}`
            )
            .then(({ data }) => {
              value = data.data.NumeroDaLinha
            })
          break
        case 'equipamentos':
          await axios
            .get(
              `http://${hostname}:3002/api/identificaveis/equipment?Id=${Identifier}`
            )
            .then(({ data }) => {
              value = data.data.Imei
            })
          break
        case 'identificadores':
          await axios
            .get(
              `http://${hostname}:3002/api/identificaveis/identifier?Id=${Identifier}`
            )
            .then(({ data }) => {
              value = data.data.CodigoIdentificador
            })
          break
        case 'rastreadores':
          await axios
            .get(
              `http://${hostname}:3002/api/identificaveis/tracker?Id=${Identifier}`
            )
            .then(({ data }) => {
              value =
                'RTDR - ' +
                data.data.CodigoReferencia +
                ' - ' +
                data.data.Chip.NumeroDaLinha +
                ' - ' +
                data.data.Equipamento.Imei
            })
          break
        case 'kitsDeInsumo':
          await axios
            .get(
              `http://${hostname}:3002/api/identificaveis/inputKits?Id=${Identifier}`
            )
            .then(({ data }) => {
              value = 'KTISM - ' + data.data.CodigoReferencia
            })
          break
        case 'kitsDeInstalacao':
          await axios
            .get(
              `http://${hostname}:3002/api/identificaveis/installationKits?Id=${Identifier}`
            )
            .then(({ data }) => {
              value =
                'KTIST - ' +
                data.data.CodigoReferencia +
                ' - ' +
                data.data.Rastreador.Chip.NumeroDaLinha +
                ' - ' +
                data.data.Rastreador.Equipamento.Imei
            })
          break
      }
      return value
    }
  }

  const changeVehicleSchema = yup.object().shape({
    Veiculo1: yup.object().required('Preencha o campo para continuar'),
    Veiculo2: yup.object().required('Preencha o campo para continuar')
  })

  const createVehicleSchema = yup.object().shape({
    Ticket_Id: yup.object().required('Preencha o campo para continuar')
  })

  return (
    <UpdateContext.Provider
      value={{
        getServiceById,
        slidePanelState,
        setSlidePanelState,
        clientData: clientData?.identidades_Clientes_by_pk,
        clientRefetch,
        clientLoading,
        getFranquiaById,
        getProductById,
        getPlanById,
        getComboById,
        createProposal,
        createProposalLoading,
        userAndTicketData,
        userAndTicketLoading,
        userAndTicketRefetch,
        getUserByClientId,
        changeVehicleSchema,
        vehiclesData: vehiclesData?.clientes_Veiculos,
        vehiclesLoading,
        vehiclesRefetch,
        createVehicleSchema,
        categories,
        setCategories,
        selectedCategory,
        setSelectedCategory,
        getItemIdentifier
      }}
    >
      {children}
    </UpdateContext.Provider>
  )
}

export const useUpdate = () => {
  return useContext(UpdateContext)
}
