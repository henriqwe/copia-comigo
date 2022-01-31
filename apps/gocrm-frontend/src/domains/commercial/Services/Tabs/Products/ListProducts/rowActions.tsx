import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as products from '&crm/domains/commercial/Services/Tabs/Products'
  
 import * as utils from '@comigo/utils'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Servicos_Produtos']
}) {
  const { softDeleteProduct, productsRefetch } = products.useProduct()
  const actions = [
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteProduct({
          variables: { Id: item.Id }
        })
          .then(() => {
            productsRefetch()
              utils.notification('Produto excluido com sucesso', 'success')
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
