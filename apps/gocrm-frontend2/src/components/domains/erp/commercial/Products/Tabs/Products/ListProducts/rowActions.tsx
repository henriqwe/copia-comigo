import { GraphQLTypes } from '&test/graphql/generated/zeus'
import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'
import * as products from '&test/components/domains/erp/commercial/Products/Tabs/Products'
import { showError } from '&test/utils/showError'
import { notification } from '&test/utils/notification'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Produtos_Produtos']
}) {
  const { softDeleteProduct, productsRefetch } = products.useProduct()
  const actions = [
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteProduct({
          variables: { Id: item.Id }
        })
          .then(() => {
            productsRefetch()
            notification('Produto excluido com sucesso', 'success')
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
