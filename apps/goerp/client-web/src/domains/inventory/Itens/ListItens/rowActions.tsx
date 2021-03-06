import { GraphQLTypes } from '&erp/graphql/generated/zeus';

import * as itens from '&erp/domains/inventory/Itens';
import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';
import * as utils from '@comigo/utils';

import rotas from '&erp/domains/routes';

export function RowActions({ item }: { item: GraphQLTypes['estoque_Itens'] }) {
  const { itensRefetch, softDeleteItem } = itens.useList();
  const actions = [
    {
      title: 'Editar',
      url: rotas.estoque.itens.index + '/' + item.Id,
      icon: <common.icons.EditIcon />,
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();
        await softDeleteItem({
          variables: { Id: item.Id },
        })
          .then(() => {
            itensRefetch();
            utils.notification(
              item.Produto.Nome + ' excluido com sucesso',
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
