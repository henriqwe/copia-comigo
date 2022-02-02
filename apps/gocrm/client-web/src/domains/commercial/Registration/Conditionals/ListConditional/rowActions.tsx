import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as blocks from '@comigo/ui-blocks';
import * as common from '@comigo/ui-common';
import * as conditionals from '&crm/domains/commercial/Registration/Conditionals';
import * as utils from '@comigo/utils';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['comercial_Condicionais'];
}) {
  const { conditionalRefetch, softDeleteConditional, setSlidePanelState } =
    conditionals.useConditional();
  const actions = [
    {
      title: 'Editar',
      handler: async () => {
        event?.preventDefault();
        setSlidePanelState({ open: true, type: 'update', data: item });
      },
      icon: <common.icons.EditIcon />,
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();
        await softDeleteConditional({
          variables: { Id: item.Id },
        })
          .then(() => {
            conditionalRefetch();
            utils.notification(item.Nome + ' excluido com sucesso', 'success');
          })
          .catch((err) => {
            utils.showError(err);
          });
      },
      icon: <common.icons.DeleteIcon />,
    },
  ];
  return (
    <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
  );
}
