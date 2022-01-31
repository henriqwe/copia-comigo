import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as tariffs from '&crm/domains/commercial/Services/Tabs/Tariffs'
  
 import * as utils from '@comigo/utils'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Servicos_Atributos']
}) {
  const { softDeleteTariff, tariffsRefetch } = tariffs.useTariff()
  const actions = [
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteTariff({
          variables: { Id: item.Id }
        })
          .then(() => {
            tariffsRefetch()
              utils.notification('Tarifa excluida com sucesso', 'success')
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
