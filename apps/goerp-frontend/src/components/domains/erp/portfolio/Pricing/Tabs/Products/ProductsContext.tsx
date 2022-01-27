import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client'
import { GraphQLTypes, order_by } from 'graphql/generated/zeus'
import {
  $,
  useTypedClientQuery,
  useTypedMutation,
  useTypedQuery
} from 'graphql/generated/zeus/apollo'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'
import * as yup from 'yup'
import * as providers from '@/domains/erp/portfolio/Pricing'

type ProductContextProps = {
  slidePanelState: SlidePanelStateType
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>
  productsData?: {
    Id: string
    Nome: string
    Fornecedores: {
      Id: string
      Produto_Id: string
      Fornecedor_Id: string
      deleted_at?: Date
    }[]
  }[]

  productsRefetch: () => void
  productsLoading: boolean
  recurrenceTypeData?: {
    Valor: string
    Comentario: string
  }[]
  pricesTypeData?: {
    Valor: string
    Comentario: string
  }[]
  TypesRefetch: () => void
  TypesLoading: boolean
  activeProduct: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_PrestadoresDeServicos_Produtos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  activeProductLoading: boolean
  reactivateProduct: (
    options?: MutationFunctionOptions<
      {
        update_comercial_PrestadoresDeServicos_Produtos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  reactivateProductLoading: boolean
  removeProductLoading: boolean
  removeProduct: (
    options?: MutationFunctionOptions<
      {
        update_comercial_PrestadoresDeServicos_Produtos_by_pk?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createProductPrice: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_PrestadoresDeServicos_Produtos_Precos_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createProductPriceLoading: boolean
  createProductItem: (
    options?: MutationFunctionOptions<
      {
        insert_comercial_PrestadoresDeServicos_Produtos_Itens_one?: {
          Id: string
        }
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>
  createProductItemLoading: boolean
  pricingSchema: yup.AnyObjectSchema
  getProductProviderByProductId: (Id: string) => Promise<
    {
      Id: string
      Precos: {
        Id: string
        Valor: string
        created_at: Date
        TipoDeRecorrencia_Id?: string
        TipoDePreco?: { Comentario: string }
      }[]
      Itens: { Id: string; Item_Id: string }[]
    }[]
  >
  getProductProviderRecurrencyType: (Value: string) => Promise<
    | {
        Comentario: string
        Valor: string
      }
    | undefined
  >
  getItemById: (Id: string) => Promise<
    | {
        Id: string
        Produto: {
          Nome: string
        }
        Familia: {
          Nome: string
        }
        Modelo?: {
          Nome: string
        }
      }
    | undefined
  >
  linkItemSchema: yup.AnyObjectSchema
}

type ProviderProps = {
  children: ReactNode
}

export const ProductContext = createContext<ProductContextProps>(
  {} as ProductContextProps
)

type SlidePanelStateType = {
  data?: GraphQLTypes['comercial_Produtos'] | null
  type: 'pricing' | 'item'
  open: boolean
}

export const ProductProvider = ({ children }: ProviderProps) => {
  const { configData } = providers.useUpdate()
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelStateType>({
    type: 'pricing',
    open: false
  })
  const [activeProduct, { loading: activeProductLoading }] = useTypedMutation({
    insert_comercial_PrestadoresDeServicos_Produtos_one: [
      {
        object: {
          Fornecedor_Id: configData?.Valor[0],
          Produto_Id: $`Produto_Id`
        }
      },
      { Id: true }
    ]
  })

  const [reactivateProduct, { loading: reactivateProductLoading }] =
    useTypedMutation({
      update_comercial_PrestadoresDeServicos_Produtos_by_pk: [
        {
          pk_columns: { Id: $`Id` },
          _set: { deleted_at: null }
        },
        {
          Id: true
        }
      ]
    })

  const [removeProduct, { loading: removeProductLoading }] = useTypedMutation({
    update_comercial_PrestadoresDeServicos_Produtos_by_pk: [
      {
        pk_columns: { Id: $`Id` },
        _set: { deleted_at: new Date() }
      },
      {
        Id: true
      }
    ]
  })

  const [createProductPrice, { loading: createProductPriceLoading }] =
    useTypedMutation({
      insert_comercial_PrestadoresDeServicos_Produtos_Precos_one: [
        {
          object: {
            Fornecedor_Produto_Id: $`Fornecedor_Produto_Id`,
            TipoDeRecorrencia_Id: $`TipoDeRecorrencia_Id`,
            Valor: $`Valor`,
            TipoDePreco_Id: $`TipoDePreco_Id`
          }
        },
        { Id: true }
      ]
    })

  const [createProductItem, { loading: createProductItemLoading }] =
    useTypedMutation({
      insert_comercial_PrestadoresDeServicos_Produtos_Itens_one: [
        {
          object: {
            Item_Id: $`Item_Id`,
            PrestadoresDeServicos_Produtos_Id: $`PrestadoresDeServicos_Produtos_Id`
          }
        },
        { Id: true }
      ]
    })

  const {
    data: productsData,
    refetch: productsRefetch,
    loading: productsLoading
  } = useTypedQuery(
    {
      comercial_Produtos: [
        {
          order_by: [{ created_at: 'desc' }],
          where: { deleted_at: { _is_null: true } }
        },
        {
          Id: true,
          Nome: true,
          Fornecedores: [
            {},
            {
              Id: true,
              Produto_Id: true,
              Fornecedor_Id: true,
              deleted_at: true
            }
          ]
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  async function getProductProviderByProductId(Id: string) {
    const { data: productData } = await useTypedClientQuery({
      comercial_PrestadoresDeServicos_Produtos: [
        {
          where: {
            deleted_at: { _is_null: true },
            Produto_Id: { _eq: Id },
            Fornecedor_Id: { _eq: configData?.Valor[0] }
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
              TipoDeRecorrencia_Id: true,
              TipoDePreco: { Comentario: true }
            }
          ],
          Itens: [
            { order_by: [{ created_at: order_by.desc }] },
            { Id: true, Item_Id: true }
          ]
        }
      ]
    })

    return productData.comercial_PrestadoresDeServicos_Produtos
  }

  async function getProductProviderRecurrencyType(Value: string) {
    const { data: recurrencyTypeData } = await useTypedClientQuery({
      vendas_TiposDeRecorrencia_by_pk: [
        {
          Valor: Value
        },
        {
          Comentario: true,
          Valor: true
        }
      ]
    })

    return recurrencyTypeData.vendas_TiposDeRecorrencia_by_pk
  }

  async function getItemById(Id: string) {
    const { data } = await useTypedClientQuery({
      estoque_Itens_by_pk: [
        {
          Id
        },
        {
          Id: true,
          Produto: { Nome: true },
          Familia: { Nome: true },
          Modelo: { Nome: true }
        }
      ]
    })

    return data.estoque_Itens_by_pk
  }

  const {
    data: TypesData,
    refetch: TypesRefetch,
    loading: TypesLoading
  } = useTypedQuery(
    {
      vendas_TiposDeRecorrencia: [
        {},
        {
          Valor: true,
          Comentario: true
        }
      ],
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

  const pricingSchema = yup.object().shape({
    Valor: yup.string().required('Preencha o campo para continuar'),
    TipoDePreco_Id: yup.object().required('Preencha o campo para continuar')
  })

  const linkItemSchema = yup.object().shape({
    Item_Id: yup.object().required('Selecione um item para continuar')
  })

  return (
    <ProductContext.Provider
      value={{
        slidePanelState,
        setSlidePanelState,
        productsData: productsData?.comercial_Produtos,
        productsRefetch,
        productsLoading,
        recurrenceTypeData: TypesData?.vendas_TiposDeRecorrencia,
        pricesTypeData: TypesData?.vendas_TiposDePrecos,
        TypesRefetch,
        TypesLoading,
        activeProduct,
        activeProductLoading,
        reactivateProduct,
        reactivateProductLoading,
        removeProductLoading,
        removeProduct,
        createProductPrice,
        createProductPriceLoading,
        getProductProviderByProductId,
        pricingSchema,
        getProductProviderRecurrencyType,
        createProductItem,
        createProductItemLoading,
        getItemById,
        linkItemSchema
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => {
  return useContext(ProductContext)
}
