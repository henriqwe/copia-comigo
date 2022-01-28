import { GraphQLTypes } from '&erp/graphql/generated/zeus'
import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as installationKits from '&erp/domains/production/Kits/InstallationKits'
import * as utils from '@comigo/utils'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['producao_KitsDeInstalacao']
}) {
  const { installationKitsRefetch, softDeleteInstallationKit } =
    installationKits.useList()
  const actions = [
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteInstallationKit({
          variables: {
            Id: item.Id,
            Item_Id: item.Item.Id,
            ItemRastreador_Id: item.Rastreador.Item?.Id,
            ItemKitDeInsumo_Id: item.KitDeInsumo.Item.Id
          }
        })
          .then(() => {
            installationKitsRefetch()
            utils.notification(
              item.CodigoReferencia + ' excluido com sucesso',
              'success'
            )
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
