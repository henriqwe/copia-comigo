import { useTypedQuery, $ } from '&crm/graphql/generated/zeus/apollo'
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
import { identidades_Clientes_Documentos_Situacoes_enum } from '&crm/graphql/generated/zeus'
import { ClientType } from './types/client'

type UpdateContextProps = {
  slidePanelState: SlidePanelStateType
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>

  totalValue: number
  setTotalValue: Dispatch<SetStateAction<number>>

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

  clientData?: ClientType
  clientRefetch: () => void
  clientLoading: boolean
  vehiclesData?: {
    Id: string
    Apelido?: string
    NumeroDoChassi?: string
    Placa?: string
    VeiculosAtivos: {
      Id: string
      Situacao_Id: string
    }[]
  }[]
  vehiclesLoading: boolean
  vehiclesRefetch: () => void
  phonesData: {
    Id: string
    Telefone: string
  }[]
  phonesLoading: boolean
  phonesRefetch: () => void
  addressData: {
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
  addressLoading: boolean
  addressRefetch: () => void
  emailsData: {
    Id: string
    Email: string
  }[]
  emailsRefetch: () => void
  emailsLoading: boolean
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
}

type ProviderProps = {
  children: ReactNode
}

type SlidePanelStateType = {
  type:
    | 'ownership'
    | 'ownershipSingle'
    | 'vehicle'
    | 'proposal'
    | 'createVehicle'
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
  const [totalValue, setTotalValue] = useState(0)

  const [categories, setCategories] = useState([])

  const [selectedCategory, setSelectedCategory] = useState(categories?.[0])

  const router = useRouter()

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
            Id: true,
            Nome: true,
            Identificador: true,
            PessoaJuridica: true,
            Profissao: true,
            DataCriacao: true,
            DataNascimento: true,
            Sexo: true,
            DadosDaApi: [{}, true],
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
            ]
          },
          VeiculosAtivos: [
            {
              where: {
                deleted_at: { _is_null: true }
              }
            },
            {
              PossuiGNV: true,
              Id: true,
              OS_Id: true,
              Situacao_Id: true,
              Planos: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Plano_Id: true,
                  PlanoPreco_Id: true,
                  DataDeAtivacao: true,
                  DataDeDesativacao: true,
                  VeiculoAtivoCombo_Id: true,
                  Ativo: true,
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
                      TipoItem_Id: true,
                      DataDeAtivacao: true,
                      DataDeDesativacao: true,
                      Quantidade: true,
                      VeiculoAtivoCombo_Id: true,
                      VeiculoAtivoPlano_Id: true
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
                      PrecoDeRecorrencia_Id: true,
                      DataDeAtivacao: true,
                      DataDeDesativacao: true,
                      Beneficio: true,
                      VeiculoAtivoCombo_Id: true,
                      VeiculoAtivoPlano_Id: true
                    }
                  ]
                }
              ],
              Combos: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Combo_Id: true,
                  ComboPreco_Id: true,
                  DataDeAtivacao: true,
                  DataDeDesativacao: true,
                  Ativo: true,
                  Planos: [
                    { where: { deleted_at: { _is_null: true } } },
                    {
                      Plano_Id: true,
                      PlanoPreco_Id: true,
                      DataDeAtivacao: true,
                      DataDeDesativacao: true,
                      VeiculoAtivoCombo_Id: true,
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
                          TipoItem_Id: true,
                          DataDeAtivacao: true,
                          DataDeDesativacao: true,
                          Quantidade: true,
                          VeiculoAtivoCombo_Id: true,
                          VeiculoAtivoPlano_Id: true
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
                          PrecoDeRecorrencia_Id: true,
                          DataDeAtivacao: true,
                          DataDeDesativacao: true,
                          Beneficio: true,
                          VeiculoAtivoCombo_Id: true,
                          VeiculoAtivoPlano_Id: true
                        }
                      ]
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
                      TipoItem_Id: true,
                      DataDeAtivacao: true,
                      DataDeDesativacao: true,
                      Quantidade: true,
                      VeiculoAtivoCombo_Id: true,
                      VeiculoAtivoPlano_Id: true
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
                      PrecoDeRecorrencia_Id: true,
                      DataDeAtivacao: true,
                      DataDeDesativacao: true,
                      Beneficio: true,
                      VeiculoAtivoCombo_Id: true,
                      VeiculoAtivoPlano_Id: true
                    }
                  ]
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
                  TipoItem_Id: true,
                  DataDeAtivacao: true,
                  DataDeDesativacao: true,
                  Quantidade: true,
                  VeiculoAtivoCombo_Id: true,
                  VeiculoAtivoPlano_Id: true,
                  Ativo: true,
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
                  PrecoDeRecorrencia_Id: true,
                  DataDeAtivacao: true,
                  DataDeDesativacao: true,
                  Beneficio: true,
                  VeiculoAtivoCombo_Id: true,
                  VeiculoAtivoPlano_Id: true,
                  Ativo: true,
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
          ],
          FormaDePagamento_Id: true,
          DiaDeFaturamento_Id: true
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
          Placa: true,
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

  const {
    data: phonesData,
    loading: phonesLoading,
    refetch: phonesRefetch
  } = useTypedQuery(
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
      variables: {
        cliente: { cliente: router.query.id }
      },
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true
    }
  )

  const {
    data: addressData,
    loading: addressLoading,
    refetch: addressRefetch
  } = useTypedQuery(
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
      variables: {
        cliente: { cliente: router.query.id },
        fetchPolicy: 'no-cache',
        notifyOnNetworkStatusChange: true
      }
    }
  )

  const {
    data: emailsData,
    refetch: emailsRefetch,
    loading: emailsLoading
  } = useTypedQuery(
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
      variables: {
        cliente: { cliente: router.query.id }
      },
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true
    }
  )

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
        slidePanelState,
        setSlidePanelState,
        clientData: clientData?.identidades_Clientes_by_pk,
        clientRefetch,
        clientLoading,
        userAndTicketData,
        userAndTicketLoading,
        userAndTicketRefetch,
        changeVehicleSchema,
        vehiclesData: vehiclesData?.clientes_Veiculos,
        vehiclesLoading,
        vehiclesRefetch,
        createVehicleSchema,
        categories,
        setCategories,
        selectedCategory,
        setSelectedCategory,
        phonesData: phonesData?.contatos_Telefones,
        phonesLoading,
        phonesRefetch,
        addressData: addressData?.contatos_Enderecos,
        addressLoading,
        addressRefetch,
        emailsData: emailsData?.contatos_Emails,
        emailsRefetch,
        emailsLoading,
        totalValue,
        setTotalValue
      }}
    >
      {children}
    </UpdateContext.Provider>
  )
}

export const useUpdate = () => {
  return useContext(UpdateContext)
}
