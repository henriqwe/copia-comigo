import { GraphQLTypes } from '&erp/graphql/generated/zeus';
import * as blocks from '@comigo/ui-blocks';

import * as common from '@comigo/ui-common';
import * as products from '&erp/domains/portfolio/Pricing/Tabs/Products';
import * as providers from '&erp/domains/portfolio/Pricing';
import { useEffect, useState } from 'react';

export function RowActions({
  item,
}: {
  item: GraphQLTypes['comercial_Produtos'];
}) {
  const { configData } = providers.useUpdate();
  const provider = item.Fornecedores.filter((provider) => {
    return (
      provider.Produto_Id === item.Id &&
      configData?.Valor[0] === provider.Fornecedor_Id
    );
  });
  const [active, setActive] = useState(false);
  const {
    activeProduct,
    removeProduct,
    productsRefetch,
    setSlidePanelState,
    reactivateProduct,
  } = products.useProduct();
  const actions = [
    {
      title: 'Ativar',
      handler: async () => {
        event?.preventDefault();
      },
      icon: (
        <common.form.Switch
          onChange={async () => {
            if (active) {
              await removeProduct({
                variables: {
                  Id: item.Fornecedores[0].Id,
                },
              }).then(() => {
                setActive(false);
                productsRefetch();
              });
              return;
            }

            if (provider.length > 0) {
              if (provider[0].deleted_at === null) {
                await activeProduct({
                  variables: {
                    Produto_Id: item.Id,
                  },
                }).then(() => {
                  setActive(true);
                  productsRefetch();
                });
                return;
              }

              await reactivateProduct({
                variables: {
                  Id: item.Fornecedores[0].Id,
                },
              }).then(() => {
                setActive(true);
                productsRefetch();
              });
              return;
            }

            await activeProduct({
              variables: {
                Produto_Id: item.Id,
              },
            }).then(() => {
              setActive(true);
              productsRefetch();
            });
          }}
          value={active}
          size="small"
        />
      ),
    },
  ];

  if (active) {
    actions.push(
      {
        title: 'Precificar',
        handler: async () => {
          event?.preventDefault();
          setSlidePanelState({
            open: true,
            data: item,
            type: 'pricing',
          });
        },
        icon: <common.icons.DollarIcon />,
      },
      {
        title: 'Vincular item',
        handler: async () => {
          event?.preventDefault();
          setSlidePanelState({
            open: true,
            data: item,
            type: 'item',
          });
        },
        icon: <common.icons.BurguerIcon />,
      }
    );
  }

  useEffect(() => {
    setActive(provider.length > 0 && provider[0].deleted_at === null);
  }, [provider]);

  return (
    <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
  );
}
