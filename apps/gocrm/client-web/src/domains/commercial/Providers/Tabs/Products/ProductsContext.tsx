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
  recurrenceTypeRefetch: () => void
  recurrenceTypeLoading: boolean
  priceTypeData?: {
    Valor: string
    Comentario: string
  }[]
  priceTypeRefetch: () => void
  priceTypeLoading: boolean
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
  pricingSchema: yup.AnyObjectSchema
  getProductProviderByProductId: (Id: string) => Promise<
    {
      Id: string
      Precos: {
        Id: string
        Valor: string
        created_at: Date
        TipoDePreco?: { Comentario: string; Valor: string }
        TiposDeRecorrencia?: { Comentario: string; Valor: string }
      }[]
    }[]
  >
}

type ProviderProps = {
  children: ReactNode
}

export const ProductContext = createContext<ProductContextProps>(
  {} as ProductContextProps
)

type SlidePanelStateType = {
  data?: GraphQLTypes['comercial_Produtos'] | null
  open: boolean
}

export const ProductProvider = ({ children }: ProviderProps) => {
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelStateType>({
    open: false
  })
  const router = useRouter()
  const [activeProduct, { loading: activeProductLoading }] = useTypedMutation({
    insert_comercial_PrestadoresDeServicos_Produtos_one: [
      {
        object: {
          Fornecedor_Id: router.query.id,
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
            TipoDePreco_Id: $`TipoDePreco_Id`,
            Valor: $`Valor`
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
          order_by: [{ created_at: order_by.desc }],
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
              TipoDePreco: { Comentario: true, Valor: true },
              TiposDeRecorrencia: { Comentario: true, Valor: true }
            }
          ]
        }
      ]
    })

    return productData.comercial_PrestadoresDeServicos_Produtos
  }

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

  const pricingSchema = yup.object().shape({
    Valor: yup.string().required('Preencha o campo para continuar'),
    TipoDePreco_Id: yup
      .object()
      .required('Selecione o tipo de preço para continuar')
  })

  return (
    <ProductContext.Provider
      value={{
        slidePanelState,
        setSlidePanelState,
        productsData: productsData?.comercial_Produtos,
        productsRefetch,
        productsLoading,
        recurrenceTypeData: recurrenceTypeData?.vendas_TiposDeRecorrencia,
        recurrenceTypeRefetch,
        recurrenceTypeLoading,
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
        priceTypeData: priceTypeData?.vendas_TiposDePrecos,
        priceTypeRefetch,
        priceTypeLoading
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => {
  return useContext(ProductContext)
}
