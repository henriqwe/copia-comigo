import * as common from '@comigo/ui-common'
 
import * as purchaseOrders from '&crm/domains/purchases/PurchaseOrders'
import * as providers from '&crm/domains/identities/Providers'
import { useEffect, useState } from 'react'
 import * as utils from '@comigo/utils'

export default function ViewBudget() {
  const [providerName, setProviderName] = useState('')
  const { slidePanelState, budgetProductsData, SearchProvider } =
    purchaseOrders.budgets.useBudget()
  const { providersData } = providers.useList()

  useEffect(() => {
    SearchProvider(slidePanelState.data?.Fornecedor_Id).then((item) => {
      setProviderName(item?.Pessoa.Nome as string)
    })
  }, [SearchProvider, slidePanelState.data?.Fornecedor_Id])

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
                      title: item.Pessoa?.Nome as string
                    }
                  })
                : []
            }
            value={{
              key: slidePanelState.data?.Fornecedor_Id,
              title: providerName
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
                  title="Valor unitário (R$)"
                  value={utils.BRLMoneyFormat(produto.ValorUnitario as number)}
                  onChange={() => null}
                  disabled={true}
                  icon="R$"
                />
              </div>

              <div className="col-span-2">
                <common.form.Input
                  fieldName={'descricao' + index}
                  title="Descrição"
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
  )
}
