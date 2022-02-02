import { GraphQLTypes } from '&crm/graphql/generated/zeus';
import * as blocks from '@comigo/ui-blocks';

import * as common from '@comigo/ui-common';
import * as combos from '&crm/domains/commercial/Combos/Tabs/Combos';
import * as mainCombo from '&crm/domains/commercial/Combos';
import * as utils from '@comigo/utils';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['comercial_Combos_Combos'];
}) {
  const {
    dependenciesCombosRefetch,
    softDeleteDependenceCombo,
    setSlidePanelState,
  } = combos.useDependenceCombo();
  const { comboRefetch } = mainCombo.useView();
  const actions = [
    {
      title: 'Editar',
      handler: async () => {
        setSlidePanelState({ open: true, data: item, type: 'update' });
        event?.preventDefault();
      },
      icon: <common.icons.EditIcon />,
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();
        await softDeleteDependenceCombo({
          variables: {
            Id: item.Id,
          },
        })
          .then(() => {
            dependenciesCombosRefetch();
            comboRefetch();
            utils.notification(
              item.Combo.Nome + ' excluido com sucesso',
              'success'
            );
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
