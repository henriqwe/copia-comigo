import rotas from '&test/components/domains/routes'
import { GraphQLTypes } from '&test/graphql/generated/zeus'
import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'
import * as collaborators from '&test/components/domains/erp/identities/Collaborators'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['identidades_Colaboradores']
}) {
  const { collaboratorsRefetch, softDeleteCollaborator } =
    collaborators.useCollaborator()
  const actions = [
    {
      title: 'Editar',
      url: rotas.erp.identidades.colaboradores + '/' + item.Id,
      icon: <icons.ViewIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteCollaborator({
          variables: { Id: item.Id }
        })
          .then(() => {
            collaboratorsRefetch()
            notification(item.Pessoa.Nome + ' excluido com sucesso', 'success')
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
