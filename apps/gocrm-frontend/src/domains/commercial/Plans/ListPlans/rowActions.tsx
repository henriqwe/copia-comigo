import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as utils from '@comigo/utils'

import * as plans from '&crm/domains/commercial/Plans'
 
import rotas from '&crm/domains/routes'

export default function rowActions({
  item
}: {
  item: GraphQLTypes['comercial_Planos']
}) {
  const { plansRefetch, softDeletePlan } = plans.useList()
  const actions = [
    {
      title: 'Editar',
      url: rotas.comercial.planos.index + '/' + item.Id,
      icon: <common.icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeletePlan({
          variables: { Id: item.Id }
        })
          .then(() => {
            plansRefetch()
              utils.notification('Plano excluido com sucesso', 'success')
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
