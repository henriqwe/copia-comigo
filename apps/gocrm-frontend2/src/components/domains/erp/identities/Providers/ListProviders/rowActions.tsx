import { GraphQLTypes } from '&test/graphql/generated/zeus'
import rotas from '&test/components/domains/routes'

import * as table from '&test/components/blocks/Table/itens'
import * as providers from '&test/components/domains/erp/identities/Providers'
import * as icons from '&test/components/common/Icons'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['identidades_Pessoas']
}) {
  const { softDeleteProvider, providersRefetch } = providers.useList()
  const actions = [
    {
      title: 'Editar',
      url: rotas.erp.identidades.fornecedores.index + '/' + item.Id,
      icon: <icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteProvider({
          variables: {
            Id: item.Id
          }
        })
          .then(() => {
            providersRefetch()
            notification(item.Nome + ' excluido com sucesso', 'success')
          })
          .catch((err) => {
            showError(err)
          })
      },
      icon: <icons.DeleteIcon />
    }
  ]

  return <table.ActionsRow actions={actions} />
}
