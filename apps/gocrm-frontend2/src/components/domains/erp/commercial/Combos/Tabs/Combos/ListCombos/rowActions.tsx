import { GraphQLTypes } from '&test/graphql/generated/zeus'
import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'
import * as combos from '&test/components/domains/erp/commercial/Combos/Tabs/Combos'
import * as mainCombo from '&test/components/domains/erp/commercial/Combos'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Combos_Combos']
}) {
  const {
    dependenciesCombosRefetch,
    softDeleteDependenceCombo,
    setSlidePanelState
  } = combos.useDependenceCombo()
  const { comboRefetch } = mainCombo.useView()
  const actions = [
    {
      title: 'Editar',
      handler: async () => {
        setSlidePanelState({ open: true, data: item, type: 'update' })
        event?.preventDefault()
      },
      icon: <icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteDependenceCombo({
          variables: {
            Id: item.Id
          }
        })
          .then(() => {
            dependenciesCombosRefetch()
            comboRefetch()
            notification(item.Combo.Nome + ' excluido com sucesso', 'success')
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
