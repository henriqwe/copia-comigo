import { GraphQLTypes } from '&test/graphql/generated/zeus'
import rotas from '&test/components/domains/routes'

import * as table from '&test/components/blocks/Table/itens'
import * as clients from '&test/components/domains/erp/identities/Clients'
import * as icons from '&test/components/common/Icons'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['identidades_Clientes']
}) {
  const { softDeleteClient, clientsRefetch } = clients.useList()
  const actions = [
    {
      title: 'Editar',
      url: rotas.erp.identidades.clientes.index + '/' + item.Id,
      icon: <icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteClient({
          variables: {
            Id: item.Id
          }
        })
          .then(() => {
            clientsRefetch()
            notification(item.Pessoa.Nome + ' excluido com sucesso', 'success')
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
