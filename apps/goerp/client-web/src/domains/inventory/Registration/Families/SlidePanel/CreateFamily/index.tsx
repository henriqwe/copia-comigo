import { Controller, useForm } from 'react-hook-form';

import * as common from '@comigo/ui-common';
import * as utils from '@comigo/utils';
import * as families from '&erp/domains/inventory/Registration/Families';

import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  Nome: string;
  Descricao: string;
  Pai: {
    key: string;
  };
};

export function Create() {
  const {
    familySchema,
    createFamilyLoading,
    createFamily,
    setSlidePanelState,
    familiesRefetch,
    parentsFamiliesData,
    parentsFamiliesRefetch,
  } = families.useFamily();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(familySchema),
  });
  const onSubmit = (formData: FormData) => {
    createFamily({
      variables: {
        Nome: formData.Nome,
        Descricao: formData.Descricao,
        Pai_Id: formData.Pai ? formData.Pai.key : null,
      },
    })
      .then(() => {
        familiesRefetch();
        parentsFamiliesRefetch();
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false };
        });
        utils.notification(
          formData.Nome + ' cadastrado com sucesso',
          'success'
        );
      })
      .catch((err) => {
        utils.showError(err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.Input
          fieldName="Nome"
          register={register}
          title="Nome"
          error={errors.Nome}
          data-testid="inserirNome"
        />
        <common.form.Input
          fieldName="Descricao"
          register={register}
          title="Descrição"
          error={errors.Descricao}
          data-testid="inserirDescricao"
        />

        {parentsFamiliesData?.length ? (
          <Controller
            control={control}
            name="Pai"
            render={({ field: { onChange, value } }) => (
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
                label="Família pertencente (opcional)"
              />
            )}
          />
        ) : null}
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createFamilyLoading}
        loading={createFamilyLoading}
      />
    </form>
  );
}
