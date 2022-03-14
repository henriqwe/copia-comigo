import {
  ApolloCache,
  ApolloError,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client';
import { GraphQLTypes, order_by } from '&crm/graphql/generated/zeus';
import {
  $,
  useTypedMutation,
  useTypedQuery,
} from '&crm/graphql/generated/zeus/apollo';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import * as utils from '@comigo/utils';
import * as yup from 'yup';

//   type DataReturn = Pick<
//     GraphQLTypes['estoque_Grupos'],
//     'Nome' | 'Descricao' | 'Id'
//   >

type RepresentativeProps = {
  slidePanelState: SlidePanelStateType;
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>;
  representativesData?: {
    Id: string;
  }[];
  representativesDataLoading: boolean;
  representativesDataRefetch: () => void;
  createRepresentative: (
    options?: MutationFunctionOptions<
      {
        CadastrarRepresentante?: {
          Id: string;
        };
      },
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult['data']>;
  createRepresentativeLoading: boolean;
  createRepresentativeError?: ApolloError;
  // editarRepresentante: (
  //   options?: MutationFunctionOptions<
  //     {
  //       update_identidadeso_Representantes?: {
  //         Id: string
  //       }
  //     },
  //     OperationVariables,
  //     DefaultContext,
  //     ApolloCache<unknown>
  //   >
  // ) => Promise<FetchResult['data']>
  // editarRepresentanteLoading: boolean
  // editarRepresentanteError?: ApolloError
  // excluirRepresentante: (
  //   options?: MutationFunctionOptions<
  //     {
  //       update_identidadeso_Representantes?: {
  //         Id: string
  //       }
  //     },
  //     OperationVariables,
  //     DefaultContext,
  //     ApolloCache<unknown>
  //   >
  // ) => Promise<FetchResult['data']>
  representativeSchema: yup.AnyObjectSchema;
  CPFSchema: yup.AnyObjectSchema;
  CNPJSchema: yup.AnyObjectSchema;
};

type SlidePanelStateType = {
  type: 'create' | 'update';
  data?: GraphQLTypes['identidades_Representantes'] | null;
  open: boolean;
};

type ProvedorProps = {
  children: ReactNode;
};

export const RepresentativeContext = createContext<RepresentativeProps>(
  {} as RepresentativeProps
);

export const RepresentativeProvider = ({ children }: ProvedorProps) => {
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelStateType>({
    type: 'create',
    open: false,
  });

  const {
    data: representativesData,
    loading: representativesDataLoading,
    refetch: representativesDataRefetch,
  } = useTypedQuery(
    {
      identidades_Representantes: [
        {
          order_by: [{ created_at: order_by.desc }],
          where: {
            deleted_at: { _is_null: true },
            PessoaRepresentada_Id: {
              _eq: $`IdDoCliente`,
            },
          },
        },
        {
          Id: true,
          Pessoa_Id: true,
          PessoaRepresentada_Id: true,
          Pessoa: {
            Nome: true,
          },
          PessoaRepresentada: {
            Nome: true,
          },
        },
      ],
    },
    {
      variables: {
        IdDoCliente: 'f4b6a615-dc90-4355-9b00-79be0d69645b',
      },
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
    }
  );

  const [
    createRepresentative,
    { loading: createRepresentativeLoading, error: createRepresentativeError },
  ] = useTypedMutation({
    CadastrarRepresentante: [
      {
        Identificador: $`Identificador`,
        PessoaJuridica: $`PessoaJuridica`,
        PessoaRepresentada: $`PessoaRepresentada`,
      },
      {
        Id: true,
      },
    ],
  });

  const CPFSchema = yup.object().shape({
    Identificador: yup
      .string()
      .required('Preencha o campo para continuar')
      .test('equal', 'Complete todos os campos', (val: string | undefined) => {
        return val?.toString().substring(13, 15) !== '_';
      })
      .test('equal', 'Digite um cpf válido', (val: string | undefined) => {
        return utils.CPFValidation(val as string);
      }),
  });

  const CNPJSchema = yup.object().shape({
    Identificador: yup
      .string()
      .required('Preencha o campo para continuar')
      .test('equal', 'Complete todos os campos', (val: string | undefined) => {
        return val?.toString().substring(17, 18) !== '_';
      })
      .test('equal', 'Digite um cnpj válido', (val: string | undefined) => {
        return utils.CNPJValidation(val as string);
      }),
  });

  const representativeSchema = yup.object().shape({
    Telefone: yup.string().required('Preencha o campo para continuar'),
    NomeDoResponsavel: yup.string().required('Preencha o campo para continuar'),
  });

  return (
    <RepresentativeContext.Provider
      value={{
        slidePanelState,
        setSlidePanelState,
        representativesData: representativesData?.identidades_Representantes,
        representativesDataLoading,
        representativesDataRefetch,
        CPFSchema,
        CNPJSchema,
        createRepresentative,
        createRepresentativeLoading,
        createRepresentativeError,
        representativeSchema,
      }}
    >
      {children}
    </RepresentativeContext.Provider>
  );
};

export const useRepresentative = () => {
  return useContext(RepresentativeContext);
};
