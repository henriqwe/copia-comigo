/* eslint-disable */

import { Zeus, GraphQLTypes, InputType, ValueTypes, $ } from './index';
import {
  gql,
  useMutation,
  useQuery,
  useLazyQuery,
  useSubscription,
  QueryOptions,
  MutationOptions,
} from '@apollo/client';
import type {
  MutationHookOptions,
  QueryHookOptions,
  LazyQueryHookOptions,
  SubscriptionHookOptions,
} from '@apollo/client';
import { initializeApollo } from '../../../utils/apollo';

export { $ as $ };

const client = initializeApollo(undefined, undefined);

// export function useTypedMutation<Z>(
//   mutation: Z | ValueTypes['mutation_root'],
//   options?: MutationHookOptions<InputType<GraphQLTypes['mutation_root'], Z>>
// ) {
//   return useMutation<InputType<GraphQLTypes['mutation_root'], Z>>(
//     gql(Zeus.mutation(mutation)),
//     options
//   );
// }
export function useTypedMutation<Z extends ValueTypes[O], O extends "mutation_root">(
  mutation: Z | ValueTypes[O],
  options?: MutationHookOptions<InputType<GraphQLTypes[O], Z>>,
  operationName?: string,
) {
  return useMutation<InputType<GraphQLTypes[O], Z>>(gql(Zeus("mutation",mutation, operationName)), options);
}

// export function useTypedQuery<Z>(
//   query: Z | ValueTypes['query_root'],
//   options?: QueryHookOptions<InputType<GraphQLTypes['query_root'], Z>>
// ) {
//   return useQuery<InputType<GraphQLTypes['query_root'], Z>>(
//     gql(Zeus.query(query)),
//     options
//   );
// }

export function useTypedQuery<Z extends ValueTypes[O], O extends "query_root">(
  query: Z | ValueTypes[O],
  options?: QueryHookOptions<InputType<GraphQLTypes[O], Z>>,
  operationName?: string,
) {
  return useQuery<InputType<GraphQLTypes[O], Z>>(gql(Zeus("query",query, operationName)), options);
}

// export function useTypedLazyQuery<Z>(
//   LazyQuery: Z | ValueTypes['query_root'],
//   options?: LazyQueryHookOptions<InputType<GraphQLTypes['query_root'], Z>>
// ) {
//   return useLazyQuery<InputType<GraphQLTypes['query_root'], Z>>(
//     gql(Zeus.query(LazyQuery)),
//     options
//   );
// }

export function useTypedLazyQuery<Z extends ValueTypes[O], O extends "query_root">(
  LazyQuery: Z | ValueTypes[O],
  options?: LazyQueryHookOptions<InputType<GraphQLTypes[O], Z>>,
  operationName?: string,
) {
  return useLazyQuery<InputType<GraphQLTypes[O], Z>>(gql(Zeus("query",LazyQuery, operationName)), options);
}

// export function useTypedSubscription<Z>(
//   subscription: Z | ValueTypes['subscription_root'],
//   options?: SubscriptionHookOptions<
//     InputType<GraphQLTypes['subscription_root'], Z>
//   >
// ) {
//   return useSubscription<InputType<GraphQLTypes['subscription_root'], Z>>(
//     gql(Zeus.subscription(subscription)),
//     options
//   );
// }

export function useTypedSubscription<Z extends ValueTypes[O], O extends "subscription_root">(
  subscription: Z | ValueTypes[O],
  options?: SubscriptionHookOptions<InputType<GraphQLTypes[O], Z>>,
  operationName?: string,
) {
  return useSubscription<InputType<GraphQLTypes[O], Z>>(gql(Zeus("subscription",subscription, operationName)), options);
}

export function useTypedClientMutation<Z extends ValueTypes[O], O extends "mutation_root">(
  mutation: Z | ValueTypes[O],
  variables?: any,
  options?: MutationOptions<
    InputType<GraphQLTypes[O], Z>,
    Record<string, any>
  >
) {
  return client.mutate<InputType<GraphQLTypes[O], Z>>({
    mutation: gql(Zeus("mutation",mutation)),
    variables: {
      ...variables,
    },
    ...options,
  });
}

export function useTypedClientQuery<Z extends ValueTypes[O], O extends "query_root">(
  query: Z | ValueTypes[O],
  variables?: any,
  options?: Omit<QueryOptions<
    InputType<GraphQLTypes[O], Z>,
    Record<string, any>
  >, 'query'>
) {
  return client.query<InputType<GraphQLTypes[O], Z>>({
    query: gql(Zeus("query",query)),
    variables: {
      ...variables,
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    ...options,
  });
}
