import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as utils from '@comigo/utils'
import * as attributes from '&crm/domains/commercial/Products/Tabs/Attributes'
 
 

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Produtos_Atributos']
}) {
  const { softDeleteAttribute, attributesRefetch } = attributes.useAttribute()
  const actions = [
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteAttribute({
          variables: { Id: item.Id }
        })
          .then(() => {
            attributesRefetch()
              utils.notification('Atributo excluido com sucesso', 'success')
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
