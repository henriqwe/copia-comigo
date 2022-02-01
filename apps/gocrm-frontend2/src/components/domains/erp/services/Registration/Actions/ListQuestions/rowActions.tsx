import { GraphQLTypes } from '&test/graphql/generated/zeus'
import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'
import * as action from '&test/components/domains/erp/services/Registration/Actions'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Acoes']
}) {
  const { actionsRefetch, softDeleteAction, setSlidePanelState } =
    action.useAction()
  const actions = [
    {
      title: 'Editar',
      handler: async () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'update', data: item })
      },
      icon: <icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteAction({
          variables: { Id: item.Id }
        })
          .then(() => {
            actionsRefetch()
            notification('Ação excluida com sucesso', 'success')
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
