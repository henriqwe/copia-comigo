import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'

import * as attribute from '&crm/domains/commercial/Registration/Attributes'
 import * as utils from '@comigo/utils'
  

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Atributos']
}) {
  const { attributeRefetch, softDeleteAttribute, setSlidePanelState } =
    attribute.useAttribute()
  const actions = [
    {
      title: 'Editar',
      handler: async () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'update', data: item })
      },
      icon: <common.icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteAttribute({
          variables: { Id: item.Id }
        })
          .then(() => {
            attributeRefetch()
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
