import { GraphQLTypes } from '&erp/graphql/generated/zeus'
import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as kitsTypes from '&erp/domains/production/Kits/InputKits/KitsTypes'
import * as utils from '@comigo/utils'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['producao_TiposDeKitDeInsumo']
}) {
  const { kitsTypesRefetch, softDeleteKitType } = kitsTypes.useList()
  const actions = [
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteKitType({
          variables: {
            Id: item.Id
          }
        })
          .then(() => {
            kitsTypesRefetch()
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
