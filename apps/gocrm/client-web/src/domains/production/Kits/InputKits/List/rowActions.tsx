import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as common from '@comigo/ui-common';

import * as blocks from '@comigo/ui-blocks';
import * as inputKits from '&crm/domains/production/Kits/InputKits';
import * as utils from '@comigo/utils';

import rotas from '&crm/domains/routes';

export default function RowActions({
  item,
}: {
  item: GraphQLTypes['producao_KitsDeInsumo'];
}) {
  const { inputKitsRefetch, softDeleteInputKit } = inputKits.useList();
  const actions = [
    {
      title: 'Devolver',
      url: rotas.producao.kits.kitsDeInsumo.index + '/' + item.Id,
      icon: <common.icons.ReturnIcon />,
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault();

        const data = item.Itens.map((itemDoKit) => {
          return {
            Data: new Date(),
            Item_Id: itemDoKit.Item.Id,
            Valor: 0,
            Quantidade: 1,
            Tipo: 'entrada',
            Motivo_Id: 'exclusaoDeKitDeInsumo',
          };
        });
        data.push({
          Data: new Date(),
          Item_Id: item.Item.Id,
          Valor: 0,
          Quantidade: 1,
          Tipo: 'saida',
          Motivo_Id: 'exclusaoDeKitDeInsumo',
        });

        await softDeleteInputKit({
          variables: {
            Id: item.Id,
            data,
          },
        })
          .then(() => {
            inputKitsRefetch();
            utils.notification(
              item.CodigoReferencia + ' excluido com sucesso',
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

  if (item.KitsDeInstalacao.length !== 0) {
    actions.pop();
  }

  return (
    <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
  );
}
