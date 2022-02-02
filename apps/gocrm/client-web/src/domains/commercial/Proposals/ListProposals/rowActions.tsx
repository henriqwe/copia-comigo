import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as blocks from '@comigo/ui-blocks';

import * as common from '@comigo/ui-common';
import * as proposals from '&crm/domains/commercial/Proposals';
import * as utils from '@comigo/utils';

import rotas from '&crm/domains/routes';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['propostas_Propostas'];
}) {
  const { proposalsRefetch, softDeleteProposal } = proposals.useList();
  const actions = [
    {
      title: 'Vizualizar',
      url: rotas.comercial.propostas.index + '/' + item.Id,
      icon: <common.icons.ViewIcon />,
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();
        await softDeleteProposal({
          variables: {
            Id: item.Id,
          },
        })
          .then(() => {
            proposalsRefetch();
            utils.notification('Proposta excluida com sucesso', 'success');
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
