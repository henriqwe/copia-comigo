import { GraphQLTypes } from '&erp/graphql/generated/zeus';
import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';
import * as utils from '@comigo/utils';
import * as addresses from '&erp/domains/inventory/Registration/Addresses';

export function RowActions({
  item,
}: {
  item: GraphQLTypes['estoque_Enderecamentos'];
}) {
  const {
    adresssesRefetch,
    softDeleteAddressing,
    setSlidePanelState,
    parentsAdressesRefetch,
  } = addresses.useAddressing();
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
        await softDeleteAddressing({
          variables: { Id: item.Id },
        })
          .then(() => {
            adresssesRefetch();
            parentsAdressesRefetch();
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
