import * as blocks from '@comigo/ui-blocks';
import * as common from '@comigo/ui-common';
import * as utils from '@comigo/utils';

import { useRouter } from 'next/router';
import axios from 'axios';
import { GraphQLTypes } from '&crm/graphql/generated/zeus';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['comercial_ContratosBase_Versoes'];
}) {
  const router = useRouter();
  const actions = [
    {
      title: 'Visualizar',
      handler: async () => {
        event?.preventDefault();
        await axios
          .get<any>('/api/upload/contrato-presigned', {
            params: {
              id: router.query.id,
              documentName: 'CONTRATO',
              version: item.Versao,
            },
          })
          .then((response) => {
            window.open(response.data.url, '_ blank');
          })
          .catch((error) => utils.showError(error));
      },
      icon: <common.icons.ViewIcon />,
    },
  ];
  return (
    <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
  );
}
