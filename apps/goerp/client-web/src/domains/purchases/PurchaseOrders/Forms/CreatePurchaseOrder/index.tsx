import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';

import rotas from '&erp/domains/routes';

import * as common from '@comigo/ui-common';

import * as purchaseOrder from '&erp/domains/purchases/PurchaseOrders';
import * as manufacturers from '&erp/domains/inventory/Registration/Manufacturers';
import * as products from '&erp/domains/purchases/Products';
import { useEffect, useState } from 'react';
import * as utils from '@comigo/utils';

export const Create = () => {
  const [productsGroup, setProductsGroup] = useState<number[]>([1]);
  const [lastNumber, setLastNumber] = useState(0);
  const [reload, setReload] = useState(false);
  const router = useRouter();
  // const { fabricantesData, setEstadoDoSlideLateral } =
  //   fabricantes.useFabricante()
  const { createPurchaseOrderLoading, createPurchaseOrder } =
    purchaseOrder.useCreate();
  const { productsData } = products.useList();
  const { register, control, handleSubmit } = useForm();

  async function onSubmit(data: any) {
    try {
      const filteredProductsGroup = productsGroup.filter((item) => item !== 0);
      const productsValues = filteredProductsGroup.map((item) => {
        if (
          !data['produto' + item] ||
          !data['quantidade' + item] ||
          // !data['fabricante' + item] ||
          !data['descricao' + item]
        ) {
          throw new Error('Preencha todos os campos para continuar');
        }

        return {
          QuantidadePedida: data['quantidade' + item],
          Descricao: data['descricao' + item],
          Produto_Id: data['produto' + item].key,
          // Fabricante_Id: data['fabricante' + item].key
        };
      });

      await createPurchaseOrder({
        variables: {
          data: productsValues,
        },
      }).then((resposta) => {
        router.push(
          rotas.compras.pedidos.index +
            '/' +
            resposta?.data.insert_pedidosDeCompra_Pedidos_one.Id
        );
        utils.notification('Pedido criado com sucesso', 'success');
      });
    } catch (err: any) {
      utils.showError(err);
    }
  }

  useEffect(() => {
    if (productsGroup[productsGroup.length - 1] > lastNumber) {
      setLastNumber(productsGroup[productsGroup.length - 1]);
    }
  }, [productsGroup]);

  return (
    <common.Card>
      <common.GenericTitle
        title="Dados do pedido de compra"
        subtitle="Produtos, quantidade"
        className="px-6"
      />

      <common.Separator />
      <form>
        {productsGroup.map(
          (productNumber, index) =>
            productNumber !== 0 && (
              <common.form.FormLine position={index} grid={9} key={index}>
                <Controller
                  control={control}
                  name={'produto' + productNumber}
                  render={({ field: { onChange, value } }) => (
                    <div className="col-span-2">
                      <common.form.Select
                        itens={
                          productsData
                            ? productsData.map((item) => {
                                return {
                                  key: item.Id,
                                  title: item.Nome,
                                };
                              })
                            : []
                        }
                        value={value}
                        onChange={onChange}
                        label="Produto"
                      />
                      <common.OpenModalLink
                        onClick={() =>
                          router.push(rotas.compras.produtos.cadastrar)
                        }
                      >
                        Cadastrar Produtos
                      </common.OpenModalLink>
                    </div>
                  )}
                />
                <div className="col-span-2">
                  <common.form.Input
                    fieldName={'quantidade' + productNumber}
                    title="Quantidade"
                    register={register}
                  />
                </div>
                <div className="col-span-2">
                  <common.form.Input
                    fieldName={'descricao' + productNumber}
                    title="Descri????o"
                    register={register}
                  />
                </div>
                {/* <Controller
              control={control}
              name={'fabricante' + produto}
              render={({
                field: { onChange, value = { key: '', titulo: 'Fabricante' } }
              }) => (
                <div className="col-span-2">
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
                    value={value}
                    onChange={onChange}
                  />
                  <common.OpenModalLink
                    onClick={() => setEstadoDoSlideLateral(true)}
                  >
                    Cadastrar Fabricante
                  </common.OpenModalLink>
                </div>
              )}
            /> */}
                {productNumber !== 1 && (
                  <common.buttons.DeleteButton
                    onClick={() => {
                      productsGroup[index] = 0;
                      setReload(!reload);
                    }}
                  />
                )}
              </common.form.FormLine>
            )
        )}

        {!createPurchaseOrderLoading && (
          <common.AddForm
            array={productsGroup}
            setArray={setProductsGroup}
            lastNumber={lastNumber}
          >
            Adicionar outro produto
          </common.AddForm>
        )}
      </form>
      <div className="flex items-center justify-between w-full px-6 mt-4">
        <common.buttons.GoBackButton />
        <common.buttons.PrimaryButton
          title="Confirmar pedido"
          disabled={createPurchaseOrderLoading}
          onClick={handleSubmit(onSubmit)}
          loading={createPurchaseOrderLoading}
        />
      </div>
      <manufacturers.SlidePanel />
    </common.Card>
  );
};
