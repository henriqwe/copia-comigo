import { GraphQLTypes } from '&erp/graphql/generated/zeus';
import * as blocks from '@comigo/ui-blocks';
import * as common from '@comigo/ui-common';
import * as utils from '@comigo/utils';
import * as operators from '&erp/domains/production/identifiable/Chips/Operators';

export function RowActions({ item }: { item: GraphQLTypes['Operadoras'] }) {
  const { operatorsRefetch, softDeleteOperator, setSlidePanelState } =
    operators.useOperator();
  const actions = [
    {
      title: 'Editar',
      handler: async () => {
        event?.preventDefault();
        setSlidePanelState({ open: true, type: 'update', data: item });
      },
      icon: <common.icons.EditIcon />,
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();
        await softDeleteOperator({
          variables: { Id: item.Id },
        })
          .then(() => {
            operatorsRefetch();
            utils.notification(item.Nome + ' excluido com sucesso', 'success');
          })
          .catch((err) => {
            utils.notification(err.message, 'error');
          });
      },
      icon: <common.icons.DeleteIcon />,
    },
  ];
  return (
    <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
  );
}
