import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'

import * as contracts from '&crm/domains/commercial/Contracts'
 import * as utils from '@comigo/utils'
 
import rotas from '&crm/domains/routes'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_ContratosBase']
}) {
  const { baseContractsRefetch, softDeleteProduct } = contracts.useContract()
  const actions = [
    {
      title: 'Editar',
      url: rotas.comercial.contratos + '/' + item.Id,
      icon: <common.icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteProduct({
          variables: { Id: item.Id }
        })
          .then(() => {
            baseContractsRefetch()
              utils.notification(item.Nome + ' excluido com sucesso', 'success')
          })
          .catch((err) => {
            utils.showError(err)
          })
      },
      icon: <common.icons.DeleteIcon />
    }
  ]
  return <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
}
