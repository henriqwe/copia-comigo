import { GraphQLTypes } from '&test/graphql/generated/zeus'
import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'
import * as plans from '&test/components/domains/erp/commercial/Plans'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'
import rotas from '&test/components/domains/routes'

export default function rowActions({
  item
}: {
  item: GraphQLTypes['comercial_Planos']
}) {
  const { plansRefetch, softDeletePlan } = plans.useList()
  const actions = [
    {
      title: 'Editar',
      url: rotas.erp.comercial.planos.index + '/' + item.Id,
      icon: <icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeletePlan({
          variables: { Id: item.Id }
        })
          .then(() => {
            plansRefetch()
            notification('Plano excluido com sucesso', 'success')
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
