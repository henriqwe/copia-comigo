import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';

import rotas from '&crm/domains/routes';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['identidades_Clientes'];
}) {
  const actions = [
    {
      title: 'Editar',
      url: rotas.clientes + '/' + item.Id,
      icon: <common.icons.ViewIcon />,
    },
  ];
  return (
    <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
  );
}
