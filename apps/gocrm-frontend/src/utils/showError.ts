import { ApolloError } from '@apollo/client'
import { GraphQLError } from '&crm/graphql'
import { notification } from './notification'

function handleGraphqlError(errors: readonly GraphQLError[]) {
  errors.map((erroGraphQl) => {
    let message = erroGraphQl.message
    if (erroGraphQl.message.search('duplicate key') != -1) {
      message = 'Ops! Registro já existente no banco de dados'
    }
      utils.notification(message, 'error')
  })
}

export function utils.showError(erro: ApolloError) {
  if (erro.graphQLErrors?.length) {
    handleGraphqlError(erro.graphQLErrors)
    return
  }

    utils.notification(erro.message, 'error')
}
