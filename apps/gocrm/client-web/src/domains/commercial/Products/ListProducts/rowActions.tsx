import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as blocks from '@comigo/ui-blocks';
import * as common from '@comigo/ui-common';
import * as utils from '@comigo/utils';

import * as products from '&crm/domains/commercial/Products';

import rotas from '&crm/domains/routes';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['comercial_Produtos'];
}) {
  const { productsRefetch, softDeleteProduct } = products.useProduct();
  const actions = [
    {
      title: 'Editar',
      url: rotas.comercial.produtos + '/' + item.Id,
      icon: <common.icons.EditIcon />,
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();
        await softDeleteProduct({
          variables: { Id: item.Id },
        })
          .then(() => {
            productsRefetch();
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
