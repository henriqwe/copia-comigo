import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as upSelling from '&crm/domains/commercial/Products/Tabs/UpSelling'
 import * as utils from '@comigo/utils'
 

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Produtos_Oportunidades']
}) {
  const { softDeleteUpSelling, upSellingRefetch, setSlidePanelState } =
    upSelling.useUpSelling()
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
        await softDeleteUpSelling({
          variables: { Id: item.Id }
        })
          .then(() => {
            upSellingRefetch()
              utils.notification('Oportunidade excluida com sucesso', 'success')
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
