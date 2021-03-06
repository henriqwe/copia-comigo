import * as common from '@comigo/ui-common';

import * as purchaseOrders from '&erp/domains/purchases/PurchaseOrders';
import { useEffect, useState } from 'react';
import { BRLMoneyFormat } from '@comigo/utils';

export function View() {
  const [providerName, setProviderName] = useState('');
  const { slidePanelState, budgetProductsData, SearchProvider, providersData } =
    purchaseOrders.budgets.useBudget();

  useEffect(() => {
    SearchProvider(slidePanelState.data?.Fornecedor_Id).then((item) => {
      setProviderName(item?.Pessoa.Nome as string);
    });
  }, [SearchProvider, slidePanelState.data?.Fornecedor_Id]);

  return (
    <form data-testid="inserirForm" className="flex flex-col items-end">
      <div className="flex flex-col w-full gap-2 mb-2">
        <div className="col-span-3">
          <common.form.Select
            itens={
              providersData
                ? providersData.map((item) => {
                    return {
                      key: item.Id,
                      title: item.Pessoa?.Nome as string,
                    };
                  })
                : []
            }
            value={{
              key: slidePanelState.data?.Fornecedor_Id,
              title: providerName,
            }}
            onChange={() => null}
            disabled={true}
            label="Fornecedor"
          />
        </div>

        <common.Separator />
        {budgetProductsData?.map((produto, index) => (
          <div key={index}>
            <common.TitleWithSubTitleAtTheTop
              title={
                produto.PedidosDeCompra_Produto.Produto.Nome +
                ' - ' +
                produto.Descricao
              }
              subtitle="Nome do produto"
            />

            <div className="grid w-full grid-cols-2 gap-3">
              {/* <div>
                <common.Select
                  items={
                    fabricantesData
                      ? fabricantesData.estoque_Fabricantes.map((item) => {
                          return {
                            key: item.Id,
                            titulo: item.Nome
                          }
                        })
                      : []
                  }
                  value={{
                    key: produto.Fabricante.Id,
                    titulo: produto.Fabricante.Nome
                  }}
                  onChange={() => null}
                  disabled={true}
                />
              </div> */}

              <div>
                <common.form.Input
                  fieldName={'quantidade' + index}
                  title="Quantidade"
                  value={produto.Quantidade}
                  onChange={() => null}
                  disabled={true}
                />
              </div>

              <div>
                <common.form.Input
                  fieldName={'valor' + index}
                  title="Valor unit??rio (R$)"
                  value={BRLMoneyFormat(produto.ValorUnitario as number)}
                  onChange={() => null}
                  disabled={true}
                  icon="R$"
                />
              </div>

              <div className="col-span-2">
                <common.form.Input
                  fieldName={'descricao' + index}
                  title="Descri????o"
                  value={produto.Descricao}
                  onChange={() => null}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        ))}
        <common.Separator />
      </div>
    </form>
  );
}
