import { GraphQLTypes } from '&test/graphql/generated/zeus'
import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'
import * as attributes from '&test/components/domains/erp/commercial/Products/Tabs/Attributes'
import { showError } from '&test/utils/showError'
import { notification } from '&test/utils/notification'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Produtos_Atributos']
}) {
  const { softDeleteAttribute, attributesRefetch } = attributes.useAttribute()
  const actions = [
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteAttribute({
          variables: { Id: item.Id }
        })
          .then(() => {
            attributesRefetch()
            notification('Atributo excluido com sucesso', 'success')
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
