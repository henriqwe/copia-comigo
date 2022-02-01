import { GraphQLTypes } from '&test/graphql/generated/zeus'
import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'
import rotas from '&test/components/domains/routes'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['identidades_Clientes']
}) {
  const actions = [
    {
      title: 'Editar',
      url: rotas.erp.clientes + '/' + item.Id,
      icon: <icons.ViewIcon />
    }
  ]
  return <table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
}
