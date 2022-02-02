import rotas from '&crm/domains/routes';
import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';
import * as collaborators from '&crm/domains/identities/Collaborators';
import * as utils from '@comigo/utils';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['identidades_Colaboradores'];
}) {
  const { collaboratorsRefetch, softDeleteCollaborator } =
    collaborators.useCollaborator();
  const actions = [
    {
      title: 'Editar',
      url: rotas.identidades.colaboradores + '/' + item.Id,
      icon: <common.icons.ViewIcon />,
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();
        await softDeleteCollaborator({
          variables: { Id: item.Id },
        })
          .then(() => {
            collaboratorsRefetch();
            utils.notification(
              item.Pessoa.Nome + ' excluido com sucesso',
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
