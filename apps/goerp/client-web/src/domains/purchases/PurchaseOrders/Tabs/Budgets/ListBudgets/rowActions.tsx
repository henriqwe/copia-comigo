import { GraphQLTypes } from '&erp/graphql/generated/zeus';

import * as blocks from '@comigo/ui-blocks';
import * as purchaseOrders from '&erp/domains/purchases/PurchaseOrders';

import * as common from '@comigo/ui-common';
import * as utils from '@comigo/utils';

export function RowActions({
  item,
}: {
  item: GraphQLTypes['pedidosDeCompra_Orcamentos'];
}) {
  const { softDeleteBudget, budgetsRefetch, setSlidePanelState } =
    purchaseOrders.budgets.useBudget();
  const { purchaseOrderData } = purchaseOrders.useUpdate();
  const actions = [
    {
      title: 'Autorizar',
      handler: async () => {
        event?.preventDefault();
        if (!item.Aprovado) {
          setSlidePanelState({
            open: true,
            type: 'authorize',
            data: item,
            showModal: false,
          });
        }
      },
      icon: <common.icons.AuthorizationIcon />,
    },
    {
      title: 'Visualizar',
      handler: async () => {
        event?.preventDefault();
        setSlidePanelState({
          open: true,
          type: 'view',
          data: item,
          showModal: false,
        });
      },
      icon: <common.icons.ViewIcon />,
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();
        await softDeleteBudget({
          variables: {
            Id: item.Id,
          },
        })
          .then(() => {
            budgetsRefetch();
            utils.notification('Orçamento excluido com sucesso', 'success');
          })
          .catch((err) => {
            utils.showError(err);
          });
      },
      icon: <common.icons.DeleteIcon />,
    },
  ];
  if (purchaseOrderData?.Situacao.Comentario !== 'Aberto') {
    actions.pop();
    if (!item.Aprovado) {
      actions.shift();
    }
  }

  return <blocks.table.ActionsRow actions={actions} />;
}
