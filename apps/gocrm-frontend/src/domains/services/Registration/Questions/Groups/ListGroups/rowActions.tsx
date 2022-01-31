import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as questionsGroups from '&crm/domains/services/Registration/Questions/Groups'
 import * as utils from '@comigo/utils'
 
import rotas from '&crm/domains/routes'

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
        rotas.atendimento.cadastros.perguntas.grupos.index + '/' + item.Id,
      icon: <common.icons.EditIcon />
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
