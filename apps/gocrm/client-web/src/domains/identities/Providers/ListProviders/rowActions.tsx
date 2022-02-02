import { GraphQLTypes } from '&crm/graphql/generated/zeus';
import rotas from '&crm/domains/routes';

import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';
import * as providers from '&crm/domains/identities/Providers';

import * as utils from '@comigo/utils';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['identidades_Pessoas'];
}) {
  const { softDeleteProvider, providersRefetch } = providers.useList();
  const actions = [
    {
      title: 'Editar',
      url: rotas.identidades.fornecedores.index + '/' + item.Id,
      icon: <common.icons.EditIcon />,
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();
        await softDeleteProvider({
          variables: {
            Id: item.Id,
          },
        })
          .then(() => {
            providersRefetch();
            utils.notification(item.Nome + ' excluido com sucesso', 'success');
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
