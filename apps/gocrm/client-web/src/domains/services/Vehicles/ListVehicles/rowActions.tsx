import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as vehicles from '&crm/domains/services/Vehicles';
import * as utils from '@comigo/utils';
import * as blocks from '@comigo/ui-blocks';
import * as common from '@comigo/ui-common';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['clientes_Veiculos'];
}) {
  const { vehiclesRefetch, softDeleteTicket, setSlidePanelState } =
    vehicles.useVehicle();
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
            vehiclesRefetch();
            utils.notification(item.Placa + ' excluido com sucesso', 'success');
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
