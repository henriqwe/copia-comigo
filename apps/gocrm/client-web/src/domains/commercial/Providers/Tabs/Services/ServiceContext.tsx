import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client'
import { GraphQLTypes, order_by } from '&crm/graphql/generated/zeus'
import {
  $,
  useTypedClientQuery,
  useTypedMutation,
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
import * as yup from 'yup'

type ServiceContextProps = {
  servicesData?: {
    Id: string
    Nome: string
    PrestadoresDeServicos: {
      Id: string
      Servico_Id: string
      Prestador_Id: string
      deleted_at?: Date
    }[]
    Tarifas: {
      Id: string
      Tarifa: {
        Id: string
        Nome: string
      }
    }[]
  }[]
  servicesRefetch: () => void
  servicesLoading: boolean
  recurrenceTypeData?: {
    Valor: string
    Comentario: string
  }[]
  recurrenceTypeRefetch: () => void
  recurrenceTypeLoading: boolean
  priceTypeData?: {
    Valor: string
    Comentario: string
  }[]
  priceTypeRefetch: () => void
  priceTypeLoading: boolean
  slidePanelState: SlidePanelStateType
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>
  activeService: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_PrestadoresDeServicos_Servicos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  activeServiceLoading: boolean
  createServiceTariff: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_PrestadoresDeServicos_Servicos_Tarifas_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createServiceTariffLoading: boolean
  updateServiceTariff: (
    options?: MutationFunctionOptions<
      {
        update_comercial_PrestadoresDeServicos_Servicos_Tarifas_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  updateServiceTariffLoading: boolean
  removeService: (
    options?: MutationFunctionOptions<
      {
        update_comercial_PrestadoresDeServicos_Servicos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  removeServiceLoading: boolean
  reactivateService: (
    options?: MutationFunctionOptions<
      {
        update_comercial_PrestadoresDeServicos_Servicos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  reactivateServiceLoading: boolean
  createServicePrice: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_PrestadoresDeServicos_Servicos_Precos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createServicePriceLoading: boolean
  getServiceProviderByServiceId: (Id: string) => Promise<
    {
      Id: string
      Tarifas: {
        Id: string
        Valor: string
        Tarifa: { Id: string; Nome: string }
      }[]
      Precos: {
        Id: string
        Valor: string
        created_at: Date
        TipoDeRecorrencia?: { Comentario: string; Valor: string }
        TipoDePreco?: { Comentario: string; Valor: string }
      }[]
    }[]
  >
  pricingSchema: yup.AnyObjectSchema
}

type ProviderProps = {
  children: ReactNode
}

export const ServiceContext = createContext<ServiceContextProps>(
  {} as ServiceContextProps
)

type SlidePanelStateType = {
  data?: GraphQLTypes['comercial_Servicos'] | null
  type: 'tariff' | 'pricing'
  open: boolean
}

export const ServiceProvider = ({ children }: ProviderProps) => {
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelStateType>({
    type: 'tariff',
    open: false
  })
  const router = useRouter()
  const [activeService, { loading: activeServiceLoading }] = useTypedMutation({
    insert_comercial_PrestadoresDeServicos_Servicos_one: [
      {
        object: {
          Prestador_Id: router.query.id,
          Servico_Id: $`Servico_Id`
        }
      },
      { Id: true }
    ]
  })

  const [reactivateService, { loading: reactivateServiceLoading }] =
    useTypedMutation({
      update_comercial_PrestadoresDeServicos_Servicos_by_pk: [
        {
          pk_columns: { Id: $`Id` },
          _set: {
            deleted_at: null
          }
        },
        { Id: true }
      ]
    })

  const [removeService, { loading: removeServiceLoading }] = useTypedMutation({
    update_comercial_PrestadoresDeServicos_Servicos_by_pk: [
      {
        pk_columns: { Id: $`Id` },
        _set: {
          deleted_at: new Date()
        }
      },
      { Id: true }
    ]
  })

  const [createServiceTariff, { loading: createServiceTariffLoading }] =
    useTypedMutation({
      insert_comercial_PrestadoresDeServicos_Servicos_Tarifas_one: [
        {
          object: {
            Fornecedor_Servico_Id: $`Fornecedor_Servico_Id`,
            Tarifa_Id: $`Tarifa_Id`,
            Valor: $`Valor`
          }
        },
        { Id: true }
      ]
    })

  const [updateServiceTariff, { loading: updateServiceTariffLoading }] =
    useTypedMutation({
      update_comercial_PrestadoresDeServicos_Servicos_Tarifas_by_pk: [
        {
          pk_columns: { Id: $`Id` },
          _set: {
            Valor: $`Valor`,
            updated_at: new Date()
          }
        },
        { Id: true }
      ]
    })

  const [createServicePrice, { loading: createServicePriceLoading }] =
    useTypedMutation({
      insert_comercial_PrestadoresDeServicos_Servicos_Precos_one: [
        {
          object: {
            Fornecedor_Servico_Id: $`Fornecedor_Servico_Id`,
            TipoDeRecorrencia_Id: $`TipoDeRecorrencia_Id`,
            TipoDePreco_Id: $`TipoDePreco_Id`,
            Valor: $`Valor`
          }
        },
        { Id: true }
      ]
    })

  const {
    data: servicesData,
    refetch: servicesRefetch,
    loading: servicesLoading
  } = useTypedQuery(
    {
      comercial_Servicos: [
        {
          order_by: [{ created_at: order_by.desc }],
          where: { deleted_at: { _is_null: true } }
        },
        {
          Id: true,
          Nome: true,
          PrestadoresDeServicos: [
            {},
            {
              Id: true,
              Servico_Id: true,
              Prestador_Id: true,
              deleted_at: true
            }
          ],
          Tarifas: [
            { where: { deleted_at: { _is_null: true } } },
            { Id: true, Tarifa: { Id: true, Nome: true } }
          ]
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  const {
    data: recurrenceTypeData,
    refetch: recurrenceTypeRefetch,
    loading: recurrenceTypeLoading
  } = useTypedQuery(
    {
      vendas_TiposDeRecorrencia: [
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
    data: priceTypeData,
    refetch: priceTypeRefetch,
    loading: priceTypeLoading
  } = useTypedQuery(
    {
      vendas_TiposDePrecos: [
        {},
        {
          Valor: true,
          Comentario: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  async function getServiceProviderByServiceId(Id: string) {
    const { data: servicesData } = await useTypedClientQuery({
      comercial_PrestadoresDeServicos_Servicos: [
        {
          where: {
            deleted_at: { _is_null: true },
            Servico_Id: { _eq: Id },
            Fornecedor_Id: { _eq: router.query.id }
          }
        },
        {
          Id: true,
          Precos: [
            { order_by: [{ created_at: order_by.desc }] },
            {
              Id: true,
              Valor: true,
              created_at: true,
              TipoDeRecorrencia: { Comentario: true, Valor: true },
              TipoDePreco: { Comentario: true, Valor: true }
            }
          ],
          Tarifas: [
            {},
            { Id: true, Valor: true, Tarifa: { Id: true, Nome: true } }
          ]
        }
      ]
    })

    return servicesData.comercial_PrestadoresDeServicos_Servicos
  }

  const pricingSchema = yup.object().shape({
    Valor: yup.string().required('Preencha o campo para continuar'),
    TipoDeRecorrencia_Id: yup.object(),
    TipoDePreco_Id: yup
      .object()
      .required('Selecione o tipo de pre??o para continuar')
  })

  return (
    <ServiceContext.Provider
      value={{
        slidePanelState,
        setSlidePanelState,
        recurrenceTypeData: recurrenceTypeData?.vendas_TiposDeRecorrencia,
        recurrenceTypeRefetch,
        recurrenceTypeLoading,
        servicesData: servicesData?.comercial_Servicos,
        servicesRefetch,
        servicesLoading,
        activeService,
        activeServiceLoading,
        createServiceTariff,
        createServiceTariffLoading,
        updateServiceTariff,
        updateServiceTariffLoading,
        removeService,
        removeServiceLoading,
        reactivateService,
        reactivateServiceLoading,
        createServicePrice,
        createServicePriceLoading,
        getServiceProviderByServiceId,
        pricingSchema,
        priceTypeData: priceTypeData?.vendas_TiposDePrecos,
        priceTypeRefetch,
        priceTypeLoading
      }}
    >
      {children}
    </ServiceContext.Provider>
  )
}

export const useService = () => {
  return useContext(ServiceContext)
}
