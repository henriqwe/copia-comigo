import { GraphQLTypes } from '&crm/graphql/generated/zeus'
import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'

import * as combos from '&crm/domains/commercial/Combos'
import * as utils from '@comigo/utils'

import rotas from '&crm/domains/routes'

export function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Combos']
}) {
  const { combosRefetch, softDeleteCombo } = combos.useList()
  const actions = [
    {
      title: 'Vizualizar',
      url: rotas.comercial.combos + '/' + item.Id,
      icon: <common.icons.ViewIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteCombo({
          variables: {
            Id: item.Id
          }
        })
          .then(() => {
            combosRefetch()
            utils.notification(item.Nome + ' excluido com sucesso', 'success')
          })
          .catch((err) => {
            utils.showError(err)
          })
      },
      icon: <common.icons.DeleteIcon />
    }
  ]
  return (
    <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
  )
}
