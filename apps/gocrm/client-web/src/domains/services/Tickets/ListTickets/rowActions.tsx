import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as blocks from '@comigo/ui-blocks';
import * as common from '@comigo/ui-common';
import * as tickets from '&crm/domains/services/Tickets';
import * as utils from '@comigo/utils';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['atendimentos_Tickets'];
}) {
  const { ticketsRefetch, softDeleteTicket, setSlidePanelState } =
    tickets.useTicket();
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
        await softDeleteTicket({
          variables: { Id: item.Id },
        })
          .then(() => {
            ticketsRefetch();
            utils.notification('Ticket excluido com sucesso', 'success');
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
