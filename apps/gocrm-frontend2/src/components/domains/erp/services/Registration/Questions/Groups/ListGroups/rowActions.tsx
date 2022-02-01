import { GraphQLTypes } from '&test/graphql/generated/zeus'
import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'
import * as questionsGroups from '&test/components/domains/erp/services/Registration/Questions/Groups'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'
import rotas from '&test/components/domains/routes'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['vendas_GruposDePerguntas']
}) {
  const { questionsGroupsRefetch, softDeleteQuestionsGroup } =
    questionsGroups.useList()
  const actions = [
    {
      title: 'Editar',
      url:
        rotas.erp.atendimento.cadastros.perguntas.grupos.index + '/' + item.Id,
      icon: <icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteQuestionsGroup({
          variables: { Id: item.Id }
        })
          .then(() => {
            questionsGroupsRefetch()
            notification(item.Nome + ' excluido com sucesso', 'success')
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
