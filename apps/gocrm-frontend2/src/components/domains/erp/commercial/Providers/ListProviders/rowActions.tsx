import { GraphQLTypes } from '&test/graphql/generated/zeus'
import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'
import * as providers from '&test/components/domains/erp/commercial/Providers'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'
import rotas from '&test/components/domains/routes'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Fornecedores']
}) {
  const { providersRefetch, softDeleteProvider } = providers.useProvider()
  const actions = [
    {
      title: 'Editar',
      url: rotas.erp.comercial.fornecedores + '/' + item.Id,
      icon: <icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteProvider({
          variables: { Id: item.Id }
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
  return <table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
}
