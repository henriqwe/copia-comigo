import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import rotas from '&erp/domains/routes';

import * as common from '@comigo/ui-common';

import * as product from '&erp/domains/purchases/Products';
import * as utils from '@comigo/utils';

type FormData = {
  Nome: string;
  // Descricao: string
  Utilizacao: string;
  UnidadeMedida: { key: string; titulo: string };
  Fabricantes: { key: string; titulo: string };
  NCM: number;
};

export const Update = () => {
  const [buttonName, setButtonName] = useState('Editar');
  const router = useRouter();
  const {
    productSchema,
    updateProductLoading,
    updateProduct,
    productData,
    productLoading,
    productRefetch,
    unitsOfMeasureData,
  } = product.useUpdate();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(productSchema) });

  async function onSubmit(data: FormData) {
    await updateProduct({
      variables: {
        Id: productData?.Id,
        Nome: data.Nome,
        // Descricao: data.Descricao,
        Utilizacao: data.Utilizacao,
        UnidadeDeMedida_Id: data.UnidadeMedida.key,
        NCM: data.NCM,
      },
    })
      .then(() => {
        productRefetch();
        setButtonName('Editar');
        router.push(rotas.compras.produtos.index);
        utils.notification(data.Nome + ' editado com sucesso', 'success');
      })
      .catch((err) => {
        utils.showError(err);
      });
  }

  useEffect(() => {
    reset({
      Nome: productData?.Nome || '',
      // Descricao: productData?.Descricao || '',
      Utilizacao: productData?.Utilizacao || '',
      UnidadeMedida: {
        key: productData?.UnidadeDeMedida_Id || '',
        title: productData?.UnidadeDeMedida_Id || '',
      },
      NCM: productData?.NCM || 0,
    });
  }, [productData, reset]);

  return (
    <common.Card>
      <common.GenericTitle
        className="px-6"
        title="Dados Gerais"
        subtitle="Nome do Produto"
      />
      <common.Separator className="mb-0" />
      <form>
        <common.form.FormLine position={1} grid={2}>
          <common.form.Input
            fieldName="Nome"
            title="Nome"
            register={register}
            error={errors.Nome}
            disabled={buttonName === 'Editar'}
          />
          {/* <common.Input
            nomeDoCampo="Descricao"
            titulo="Descrição"
            register={register}
            error={errors.Descricao}
            disabled={buttonName === 'Editar'}
          /> */}
          <common.form.Input
            fieldName="Utilizacao"
            disabled={buttonName === 'Editar'}
            title="Utilização"
            register={register}
            error={errors.Utilizacao}
          />
        </common.form.FormLine>

        <common.form.FormLine position={2} grid={2}>
          <Controller
            control={control}
            name="UnidadeMedida"
            render={({ field: { onChange, value } }) => (
              <div>
                <common.form.Select
                  itens={
                    unitsOfMeasureData
                      ? unitsOfMeasureData.UnidadesDeMedidas.map((item) => {
                          return {
                            key: item.Valor,
                            title: item.Comentario,
                          };
                        })
                      : []
                  }
                  value={value}
                  onChange={onChange}
                  error={errors.Fabricantes}
                  disabled={buttonName === 'Editar'}
                  label="Unidade de medida"
                />
              </div>
            )}
          />
          <common.form.Input
            fieldName="NCM"
            title="NCM"
            register={register}
            error={errors.NCM}
            type="number"
            disabled={buttonName === 'Editar'}
          />
        </common.form.FormLine>
      </form>
      <div className="flex items-center justify-between w-full px-6 mt-4">
        <common.buttons.GoBackButton />
        <div className="flex gap-2">
          {buttonName === 'Atualizar' && (
            <common.buttons.CancelButton
              onClick={() => {
                setButtonName('Editar');
              }}
            />
          )}
          <common.buttons.PrimaryButton
            title={buttonName}
            disabled={productLoading || updateProductLoading}
            loading={productLoading || updateProductLoading}
            onClick={() => {
              if (buttonName === 'Editar') {
                setButtonName('Atualizar');
                return;
              }
              handleSubmit(onSubmit)();
            }}
          />
        </div>
      </div>
    </common.Card>
  );
};
