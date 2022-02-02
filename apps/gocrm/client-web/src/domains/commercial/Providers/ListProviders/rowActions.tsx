import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';

import * as providers from '&crm/domains/commercial/Providers';
import * as utils from '@comigo/utils';

import rotas from '&crm/domains/routes';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['comercial_Fornecedores'];
}) {
  const { providersRefetch, softDeleteProvider } = providers.useProvider();
  const actions = [
    {
      title: 'Editar',
      url: rotas.comercial.fornecedores + '/' + item.Id,
      icon: <common.icons.EditIcon />,
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();
        await softDeleteProvider({
          variables: { Id: item.Id },
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
  return (
    <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
  );
}
