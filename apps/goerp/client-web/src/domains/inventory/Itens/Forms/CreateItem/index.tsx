import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import rotas from '&erp/domains/routes';

import * as common from '@comigo/ui-common';
import * as utils from '@comigo/utils';
import * as addresses from '&erp/domains/inventory/Registration/Addresses';
import * as families from '&erp/domains/inventory/Registration/Families';
import * as groups from '&erp/domains/inventory/Registration/Groups';
import * as manufacturers from '&erp/domains/inventory/Registration/Manufacturers';
import * as itens from '&erp/domains/inventory/Itens';
import * as products from '&erp/domains/purchases/Products';
import * as models from '&erp/domains/inventory/Registration/Models';

type FormData = {
  Classificacao: string;
  Criticidade: string;
  EstoqueMinimo: number;
  Familia: SelectItem;
  Grupo: SelectItem;
  Produto: { key: { Id: string }; title: string };
  Subgrupo: SelectItem;
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

export const Create = () => {
  const [modelsArray, setModelsArray] = useState<Models[]>([]);
  const { setSlidePanelState: setEstadoGrupo, groupsData } = groups.useGroup();
  const { setSlidePanelState: setEstadoFamilia, parentsFamiliesData } =
    families.useFamily();
  const { setSlidePanelState: setEstadoFabricante, manufacturersData } =
    manufacturers.useManufacturer();
  const { setSlidePanelState: setEstadoModelo } = models.useModel();
  const { setSlidePanelState: setEstadoEnderecamento, parentsAdressesData } =
    addresses.useAddressing();
  const { productsData } = products.useList();
  const router = useRouter();
  const { itemSchema, createItemLoading, createItem, searchModel } =
    itens.useCreate();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
    watch,
  } = useForm({ resolver: yupResolver(itemSchema) });

  async function onSubmit(data: FormData) {
    await createItem({
      variables: {
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
        router.push(rotas.estoque.itens.index);
        utils.notification(
          data.Produto.title + ' cadastrado com sucesso',
          'success'
        );
      })
      .catch((err) => {
        utils.showError(err);
      });
  }

  useEffect(() => {
    reset({
      Classificacao: 'c',
      Criticidade: 'z',
    });
  }, [reset]);

  useEffect(() => {
    loadModels();
  }, [watch('Fabricante'), watch('Produto')]);

  function loadModels() {
    if (watch('Fabricante') !== undefined && watch('Produto') !== undefined) {
      searchModel(watch('Produto').key.Id, watch('Fabricante').key).then(
        (modelos) => {
          setModelsArray(modelos);
        }
      );
    }
  }

  return (
    <common.Card>
      <common.GenericTitle
        title="Defini????o do item"
        subtitle="Informe as defin????es do item"
        className="px-6"
      />

      <common.Separator />
      <form>
        <common.form.FormLine position={1} grid={4}>
          <Controller
            control={control}
            name="Produto"
            render={({ field: { onChange, value } }) => (
              <div>
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
                  label="Produto"
                />
                <common.OpenModalLink
                  onClick={() => {
                    router.push(rotas.compras.produtos.cadastrar);
                  }}
                >
                  Cadastrar produto
                </common.OpenModalLink>
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
                  label="Fabricante"
                />
                <common.OpenModalLink
                  onClick={() => {
                    setEstadoFabricante({ open: true, type: 'create' });
                  }}
                >
                  Cadastrar fabricante
                </common.OpenModalLink>
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
                  disabled={
                    watch('Fabricante') === undefined ||
                    watch('Produto') === undefined
                  }
                  label="Modelo"
                />
                <common.OpenModalLink
                  onClick={() => {
                    setEstadoModelo({ open: true, type: 'create' });
                  }}
                >
                  Cadastrar modelo
                </common.OpenModalLink>
              </div>
            )}
          />

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
        </common.form.FormLine>
        <div className="mt-4 mb-2">
          <common.GenericTitle
            title="Identifica????o do item"
            subtitle="Fam??lia, grupo e fabricante"
            className="px-6"
          />
          <common.Separator />
        </div>

        <common.form.FormLine position={1} grid={3}>
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
                  label="Grupo"
                />
                <common.OpenModalLink
                  onClick={() => {
                    setEstadoGrupo({
                      open: true,
                      type: 'create',
                    });
                  }}
                >
                  Cadastrar grupo
                </common.OpenModalLink>
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
                  disabledParents={true}
                  label="Fam??lia"
                />
                <common.OpenModalLink
                  onClick={() => {
                    setEstadoFamilia({ open: true, type: 'create' });
                  }}
                >
                  Cadastrar fam??lia
                </common.OpenModalLink>
              </div>
            )}
          />

          <Controller
            control={control}
            name="Enderecamento"
            render={({ field: { onChange, value } }) => (
              <div>
                <common.form.SelectWithGroup
                  itens={
                    parentsAdressesData
                      ? parentsAdressesData.map((item) => {
                          return {
                            key: item.Id,
                            title: item.Nome + ' - ' + item.Descricao,
                            children: item.Filhos?.map((filho) => {
                              return {
                                key: filho.Id,
                                title: filho.Nome + ' - ' + filho.Descricao,
                                children: filho.Filhos?.map((filho2) => {
                                  return {
                                    key: filho2.Id,
                                    title:
                                      filho2.Nome + ' - ' + filho2.Descricao,
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
                  disabledParents={true}
                  label="Endere??amento"
                />
                <common.OpenModalLink
                  onClick={() => {
                    setEstadoEnderecamento({ open: true, type: 'create' });
                  }}
                >
                  Cadastrar endere??amento
                </common.OpenModalLink>
              </div>
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

        <common.form.FormLine position={1} grid={3}>
          <common.form.Input
            fieldName="Classificacao"
            title="Classifica????o"
            register={register}
            error={errors.Classificacao}
            disabled={true}
          />

          <common.form.Input
            fieldName="Criticidade"
            title="Criticidade"
            register={register}
            error={errors.Criticidade}
            disabled={true}
          />

          <common.form.Input
            fieldName="EstoqueMinimo"
            title="Estoque m??nimo"
            register={register}
            error={errors.EstoqueMinimo}
            type="Number"
          />
        </common.form.FormLine>
      </form>
      <div className="flex items-center justify-between w-full px-6 mt-4">
        <common.buttons.GoBackButton />
        <common.buttons.PrimaryButton
          title="Cadastrar"
          disabled={createItemLoading}
          onClick={handleSubmit(onSubmit)}
          loading={createItemLoading}
        />
      </div>
      <addresses.SlidePanel />
      <manufacturers.SlidePanel />
      <families.SlidePanel />
      <groups.SlidePanel />
      <models.SlidePanel extra={loadModels} />
    </common.Card>
  );
};
