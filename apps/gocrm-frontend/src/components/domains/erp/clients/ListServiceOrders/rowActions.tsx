import { GraphQLTypes } from 'graphql/generated/zeus'
import * as table from '@/blocks/Table/itens'
import * as icons from '@/common/Icons'
import rotas from '@/domains/routes'

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
