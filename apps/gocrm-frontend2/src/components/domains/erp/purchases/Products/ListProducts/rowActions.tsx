import { GraphQLTypes } from '&test/graphql/generated/zeus'

import * as products from '&test/components/domains/erp/purchases/Products'
import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'

import rotas from '&test/components/domains/routes'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['Produtos']
}) {
  const { productsRefetch, softDeleteProduct } = products.useList()
  const actions = [
    {
      title: 'Editar',
      url: rotas.erp.compras.produtos.index + '/' + item.Id,
      icon: <icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteProduct({
          variables: { Id: item.Id }
        })
          .then(() => {
            productsRefetch()
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
