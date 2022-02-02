import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as common from '@comigo/ui-common';

import * as blocks from '@comigo/ui-blocks';
import * as equipments from '&crm/domains/production/identifiable/Equipments';
import * as utils from '@comigo/utils';

export default function rowActions({
  item,
}: {
  item: GraphQLTypes['producao_Equipamentos'];
}) {
  const { equipmentRefetch, softDeleteEquipment, setSlidePanelState } =
    equipments.useEquipment();
  const actions = [
    {
      title: 'Editar',
      handler: async () => {
        event?.preventDefault();
        setSlidePanelState({ open: true, data: item });
      },
      icon: <common.icons.EditIcon />,
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();
        await softDeleteEquipment({
          variables: { Id: item.Id },
        })
          .then(() => {
            equipmentRefetch();
            utils.notification(item.Imei + ' excluido com sucesso', 'success');
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
