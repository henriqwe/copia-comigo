import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as blocks from '@comigo/ui-blocks';
import * as common from '@comigo/ui-common';
import * as services from '&crm/domains/commercial/Products/Tabs/Services';
import * as utils from '@comigo/utils';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['comercial_Produtos_Servicos'];
}) {
  const { softDeleteService, servicesRefetch } = services.useService();
  const actions = [
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();
        await softDeleteService({
          variables: { Id: item.Id },
        })
          .then(() => {
            servicesRefetch();
            utils.notification('Produto excluido com sucesso', 'success');
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
