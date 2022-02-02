import { GraphQLTypes } from '&erp/graphql/generated/zeus';

import * as products from '&erp/domains/purchases/Products';
import * as blocks from '@comigo/ui-blocks';
import * as common from '@comigo/ui-common';

import rotas from '&erp/domains/routes';
import * as utils from '@comigo/utils';

export function RowActions({ item }: { item: GraphQLTypes['Produtos'] }) {
  const { productsRefetch, softDeleteProduct } = products.useList();
  const actions = [
    {
      title: 'Editar',
      url: rotas.compras.produtos.index + '/' + item.Id,
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
