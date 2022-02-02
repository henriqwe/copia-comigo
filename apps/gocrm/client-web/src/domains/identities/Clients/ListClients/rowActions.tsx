import { GraphQLTypes } from '&crm/graphql/generated/zeus';
import rotas from '&crm/domains/routes';

import * as clients from '&crm/domains/identities/Clients';

import * as utils from '@comigo/utils';
import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['identidades_Clientes'];
}) {
  const { softDeleteClient, clientsRefetch } = clients.useList();
  const actions = [
    {
      title: 'Editar',
      url: rotas.identidades.clientes.index + '/' + item.Id,
      icon: <common.icons.EditIcon />,
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();
        await softDeleteClient({
          variables: {
            Id: item.Id,
          },
        })
          .then(() => {
            clientsRefetch();
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

  return <blocks.table.ActionsRow actions={actions} />;
}
