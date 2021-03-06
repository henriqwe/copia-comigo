import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';

import rotas from '&crm/domains/routes';

import * as common from '@comigo/ui-common';

import * as kitsTypes from '&crm/domains/production/Kits/InputKits/KitsTypes';
import * as itens from '&crm/domains/inventory/Itens';
import { useEffect, useState } from 'react';
import * as utils from '@comigo/utils';

const CreateKitType = () => {
  const [itensGroup, setItensGroup] = useState<number[]>([1]);
  const [lastNumber, setLastNumber] = useState(0);
  const [reload, setReload] = useState(false);
  const router = useRouter();
  const { itensData } = itens.useList();
  const { createKitType, createKitTypeLoading } = kitsTypes.useCreate();
  const { register, control, handleSubmit } = useForm();

  async function onSubmit(data: any) {
    try {
      const filteredItensGroup = itensGroup.filter((item) => item !== 0);
      const productsValues = filteredItensGroup.map((item) => {
        if (!data['item' + item] || !data['quantidade' + item]) {
          throw new Error('Preencha todos os campos para continuar');
        }

        return {
          Quantidade: data['quantidade' + item],
          Item_Id: data['item' + item].key,
        };
      });

      await createKitType({
        variables: {
          Nome: data['nome'],
          data: productsValues,
        },
      }).then(() => {
        router.push(rotas.producao.kits.kitsDeInsumo.tipos.index);
        utils.notification('Tipo de kit criado com sucesso', 'success');
      });
    } catch (err: any) {
      utils.showError(err);
    }
  }

  useEffect(() => {
    if (itensGroup[itensGroup.length - 1] > lastNumber) {
      setLastNumber(itensGroup[itensGroup.length - 1]);
    }
  }, [itensGroup, lastNumber]);

  return (
    <common.Card>
      <common.GenericTitle
        title="Dados do tipo de kit de insumo"
        subtitle="Nome, itens e quantidades"
        className="px-6"
      />

      <common.Separator />
      <form>
        {' '}
        <common.form.FormLine grid={1} position={1}>
          <div>
            <common.form.Input
              fieldName="nome"
              title="Nome"
              register={register}
            />
          </div>
        </common.form.FormLine>
        {itensGroup.map(
          (item, index) =>
            item !== 0 && (
              <common.form.FormLine position={index} grid={9} key={index}>
                <Controller
                  control={control}
                  name={'item' + item}
                  render={({ field: { onChange, value } }) => (
                    <div className="col-span-5">
                      <common.form.Select
                        itens={
                          itensData
                            ? itensData.map((item) => {
                                return {
                                  key: item.Id,
                                  title:
                                    item.Produto.Nome +
                                    ' - ' +
                                    item.Fabricante.Nome +
                                    ' - ' +
                                    item.Modelo?.Nome,
                                };
                              })
                            : []
                        }
                        value={value}
                        onChange={onChange}
                        label="Item"
                      />
                      <common.OpenModalLink
                        onClick={() =>
                          router.push(rotas.estoque.itens.cadastrar)
                        }
                      >
                        Cadastrar Item
                      </common.OpenModalLink>
                    </div>
                  )}
                />
                <div className="col-span-3">
                  <common.form.Input
                    fieldName={'quantidade' + item}
                    title="Quantidade"
                    register={register}
                  />
                </div>

                {item !== 1 && (
                  <common.buttons.DeleteButton
                    onClick={() => {
                      itensGroup[index] = 0;
                      setReload(!reload);
                    }}
                  />
                )}
              </common.form.FormLine>
            )
        )}
        {!createKitTypeLoading && (
          <common.AddForm
            array={itensGroup}
            setArray={setItensGroup}
            lastNumber={lastNumber}
          >
            Adicionar outro item
          </common.AddForm>
        )}
      </form>
      <div className="flex items-center justify-between w-full px-6 mt-4">
        <common.buttons.GoBackButton />
        <common.buttons.PrimaryButton
          title="Cadastrar"
          disabled={createKitTypeLoading}
          onClick={handleSubmit(onSubmit)}
          loading={createKitTypeLoading}
        />
      </div>
    </common.Card>
  );
};

export default CreateKitType;
