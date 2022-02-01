import { GraphQLTypes } from '&test/graphql/generated/zeus'
import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'
import * as tariffs from '&test/components/domains/erp/commercial/Services/Tabs/Tariffs'
import { showError } from '&test/utils/showError'
import { notification } from '&test/utils/notification'

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
            notification('Tarifa excluida com sucesso', 'success')
          })
          .catch((err) => {
            showError(err)
          })
      },
      icon: <icons.DeleteIcon />
    }
  ]
  return <table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
}
