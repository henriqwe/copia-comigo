import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';
import * as businessProfiles from '&crm/domains/services/BusinessProfiles';
import * as utils from '@comigo/utils';

export default function rowActions({
  item,
}: {
  item: GraphQLTypes['clientes_PerfisComerciais'];
}) {
  const {
    businessProfilesRefetch,
    softDeleteBusinessProfile,
    setSlidePanelState,
  } = businessProfiles.useBusinessProfile();
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
        await softDeleteBusinessProfile({
          variables: {
            Lead_Id: item.Lead.Id,
            Grupo_Id: item.GrupoDePergunta.Id,
          },
        })
          .then(() => {
            businessProfilesRefetch();
            utils.notification(
              'Perfil comercial excluido com sucesso',
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
