import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import rotas from '&erp/domains/routes';

import * as common from '@comigo/ui-common';
import * as utils from '@comigo/utils';
import * as addresses from '&erp/domains/inventory/Registration/Addresses';
import * as groups from '&erp/domains/inventory/Registration/Groups';
import * as manufacturers from '&erp/domains/inventory/Registration/Manufacturers';
import * as families from '&erp/domains/inventory/Registration/Families';
import * as itens from '&erp/domains/inventory/Itens';
import * as products from '&erp/domains/purchases/Products';

type FormData = {
  Classificacao: string;
  Criticidade: string;
  Espaco: SelectItem;
  EstoqueMinimo: number;
  Prateleira: SelectItem;
  Localizacao: SelectItem;
  Familia: SelectItem;
  Grupo: SelectItem;
  Produto: { key: { Id: string }; title: string };
  Fabricante: SelectItem;
  Enderecamento: SelectItem;
  Modelo: SelectItem;
};

type SelectItem = {
  key: string | number;
  title: string | number;
};

type Models = {
  Id: string;
  Nome: string;
};

export const Update = () => {
  const [modelsArray, setModelsArray] = useState<Models[]>([]);
  const [buttonName, setButtonName] = useState('Editar');
  const { groupsData } = groups.useGroup();
  const { parentsAdressesData } = addresses.useAddressing();
  const { manufacturersData } = manufacturers.useManufacturer();
  const { productsData } = products.useList();
  const { parentsFamiliesData } = families.useFamily();
  const router = useRouter();
  const {
    itemSchema,
    updateItemLoading,
    updateItem,
    itemData,
    itemLoading,
    itemRefetch,
    searchModel,
  } = itens.useUpdate();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
    watch,
  } = useForm({ resolver: yupResolver(itemSchema) });

  async function onSubmit(data: FormData) {
    await updateItem({
      variables: {
        Id: itemData?.Id,
        Classificacao: data.Classificacao,
        Criticidade: data.Criticidade,
        EstoqueMinimo: data.EstoqueMinimo,
        Enderecamento_Id: data.Enderecamento.key,
        Familia_Id: data.Familia.key,
        Fabricante_Id: data.Fabricante.key,
        Grupo_Id: data.Grupo.key,
        Produto_Id: data.Produto.key.Id,
        Modelo_Id: data.Modelo.key,
      },
    })
      .then(() => {
        itemRefetch();
        setButtonName('Editar');
        router.push(rotas.estoque.itens.index);
        utils.notification(
          data.Produto.title + ' editado com sucesso',
          'success'
        );
      })
      .catch((err) => {
        utils.showError(err);
      });
  }

  useEffect(() => {
    reset({
      Classificacao: itemData?.Classificacao || '',
      Criticidade: itemData?.Criticidade || '',
      EstoqueMinimo: itemData?.EstoqueMinimo || 0,

      Familia: {
        key: itemData?.Familia.Id || '',
        title: itemData?.Familia.Nome || '',
      },
      Grupo: {
        key: itemData?.Grupo.Id || '',
        title: itemData?.Grupo.Nome || '',
      },
      Fabricante: {
        key: itemData?.Fabricante.Id || '',
        title: itemData?.Fabricante.Nome || '',
      },
      Produto: {
        key: itemData?.Produto || '',
        title: itemData?.Produto.Nome || '',
      },
      Enderecamento: {
        key: itemData?.Enderecamento.Id || '',
        title: itemData?.Enderecamento.Nome || '',
      },
      Modelo: {
        key: itemData?.Modelo?.Id || '',
        title: itemData?.Modelo?.Nome || '',
      },
    });
  }, [itemData, reset]);

  useEffect(() => {
    if (watch('Fabricante') !== undefined && watch('Produto') !== undefined) {
      if (watch('Produto').key.Id) {
        searchModel(watch('Produto').key.Id, watch('Fabricante').key).then(
          (modelos) => {
            setModelsArray(modelos);
          }
        );
      }
    }
  }, [watch('Fabricante'), watch('Produto')]);

  return (
    <common.Card>
      <common.GenericTitle
        title="Dados Gerais"
        subtitle="Familia, grupo e fabricante"
        className="px-6"
      />
      <common.Separator className="mb-0" />
      <form>
        <common.form.FormLine position={1} grid={4}>
          <Controller
            control={control}
            name="Grupo"
            render={({ field: { onChange, value } }) => (
              <div>
                <common.form.Select
                  itens={
                    groupsData
                      ? groupsData.estoque_Grupos.map((item) => {
                          return {
                            key: item.Id,
                            title: item.Nome,
                          };
                        })
                      : []
                  }
                  value={value}
                  onChange={onChange}
                  error={errors.Grupo}
                  disabled={buttonName === 'Editar'}
                  label="Grupo"
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="Familia"
            render={({ field: { onChange, value } }) => (
              <div>
                <common.form.SelectWithGroup
                  itens={
                    parentsFamiliesData
                      ? parentsFamiliesData.map((item) => {
                          return {
                            key: item.Id,
                            title: item.Nome,
                            children: item.Filhos?.map((filho) => {
                              return {
                                key: filho.Id,
                                title: filho.Nome,
                                children: filho.Filhos?.map((filho2) => {
                                  return {
                                    key: filho2.Id,
                                    title: filho2.Nome,
                                    children: [],
                                  };
                                }),
                              };
                            }),
                          };
                        })
                      : []
                  }
                  value={value}
                  onChange={onChange}
                  disabled={buttonName === 'Editar'}
                  disabledParents={true}
                  label="Fam??lia"
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="Fabricante"
            render={({ field: { onChange, value } }) => (
              <div>
                <common.form.Select
                  itens={
                    manufacturersData
                      ? manufacturersData.map((item) => {
                          return { key: item.Id, title: item.Nome };
                        })
                      : []
                  }
                  value={value}
                  onChange={onChange}
                  error={errors.Fabricante}
                  disabled={buttonName === 'Editar'}
                  label="Fabricante"
                />
              </div>
            )}
          />

          <Controller
            control={control}
            name="Modelo"
            render={({ field: { onChange, value } }) => (
              <div>
                <common.form.Select
                  itens={modelsArray.map((item) => {
                    return { key: item.Id, title: item.Nome };
                  })}
                  value={value}
                  onChange={onChange}
                  error={errors.Modelo}
                  disabled={buttonName === 'Editar'}
                  label="Modelo"
                />
              </div>
            )}
          />
        </common.form.FormLine>
        <div className="mt-4">
          <common.GenericTitle
            title="Endere??amento do item"
            subtitle="Informe o endere??amento do item"
            className="px-6"
          />

          <common.Separator />
        </div>
        <common.form.FormLine position={1} grid={3}>
          <Controller
            control={control}
            name="Enderecamento"
            render={({ field: { onChange, value } }) => (
              <common.form.SelectWithGroup
                itens={
                  parentsAdressesData
                    ? parentsAdressesData.map((item) => {
                        return {
                          key: item.Id,
                          title: item.Nome,
                          children: item.Filhos?.map((filho) => {
                            return {
                              key: filho.Id,
                              title: filho.Nome,
                              children: filho.Filhos?.map((filho2) => {
                                return {
                                  key: filho2.Id,
                                  title: filho2.Nome,
                                  children: [],
                                };
                              }),
                            };
                          }),
                        };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                disabled={buttonName === 'Editar'}
                disabledParents={true}
                label="Endere??amento"
              />
            )}
          />
        </common.form.FormLine>

        <div className="mt-4">
          <common.GenericTitle
            title="Outros dados"
            subtitle="Produto, classifica????o, criticidade e estoque m??nimo"
            className="px-6"
          />

          <common.Separator />
        </div>

        <common.form.FormLine position={1} grid={6}>
          <Controller
            control={control}
            name="Produto"
            render={({
              field: { onChange, value = { key: '', title: 'Produto' } },
            }) => (
              <div className="col-span-3">
                <common.form.Select
                  itens={
                    productsData
                      ? productsData.map((item) => {
                          return {
                            key: item,
                            title: item.Nome,
                          };
                        })
                      : []
                  }
                  value={value}
                  onChange={onChange}
                  error={errors.Produto}
                  disabled={buttonName === 'Editar'}
                  label="Produto"
                />
              </div>
            )}
          />

          <div className="col-span-3">
            <common.form.Input
              fieldName="Unidade de medida"
              title="Unidade de medida"
              value={
                watch('Produto')
                  ? watch('Produto').key.UnidadeDeMedida_Id
                  : undefined
              }
              register={register}
              disabled={true}
            />
          </div>

          <div className="col-span-2">
            <common.form.Input
              fieldName="Classificacao"
              title="Classifica????o"
              register={register}
              error={errors.Classificacao}
              disabled={true}
            />
          </div>

          <div className="col-span-2">
            <common.form.Input
              fieldName="Criticidade"
              title="Criticidade"
              register={register}
              error={errors.Criticidade}
              disabled={true}
            />
          </div>

          <div className="col-span-2">
            <common.form.Input
              fieldName="EstoqueMinimo"
              title="Estoque m??nimo"
              register={register}
              error={errors.EstoqueMinimo}
              type="Number"
              disabled={buttonName === 'Editar'}
            />
          </div>
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
            disabled={itemLoading || updateItemLoading}
            loading={itemLoading || updateItemLoading}
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
