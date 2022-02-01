import { GraphQLTypes } from '&crm/graphql/generated/zeus'


import * as addressingTypes from '&crm/domains/inventory/Registration/Addresses/AddressingTypes'
 import * as utils from '@comigo/utils'
  
 import * as common from '@comigo/ui-common'
 import * as blocks from '@comigo/ui-blocks'
export default function RowActions({
  item
}: {
  item: GraphQLTypes['estoque_TiposDeEnderecamentos']
}) {
  const {
    addressingTypesRefetch,
    softDeleteAddressingType,
    setSlidePanelState
  } = addressingTypes.useAddressingType()
  const actions = [
    {
      title: 'Editar',
      handler: async () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'update', data: item })
      },
      icon: <common.icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteAddressingType({
          variables: { Id: item.Id }
        })
          .then(() => {
            addressingTypesRefetch()
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
