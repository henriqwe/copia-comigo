import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as common from '@comigo/ui-common';

import * as blocks from '@comigo/ui-blocks';
import * as identifiers from '&crm/domains/production/identifiable/Identifiers';
import * as utils from '@comigo/utils';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['producao_Identificadores'];
}) {
  const { identifiersRefetch, softDeleteIdentifier, setSlidePanelState } =
    identifiers.useIdentifier();
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
        await softDeleteIdentifier({
          variables: { Id: item.Id },
        })
          .then(() => {
            identifiersRefetch();
            utils.notification(
              item.CodigoIdentificador + ' excluido com sucesso',
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
