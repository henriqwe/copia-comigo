import { useForm } from 'react-hook-form';

import * as common from '@comigo/ui-common';

import * as addressingTypes from '&crm/domains/inventory/Registration/Addresses/AddressingTypes';

import { useEffect } from 'react';
import { GraphQLTypes } from '&crm/graphql/generated/zeus';
import { yupResolver } from '@hookform/resolvers/yup';
import * as utils from '@comigo/utils';

export default function UpdateAddressingType() {
  const {
    updateAddressingTypeLoading,
    updateAddressingType,
    setSlidePanelState,
    slidePanelState,
    addressingTypesRefetch,
    addressingTypesSchema,
  } = addressingTypes.useAddressingType();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressingTypesSchema),
  });
  const onSubmit = (
    formData: GraphQLTypes['estoque_TiposDeEnderecamentos']
  ) => {
    updateAddressingType({
      variables: {
        Id: slidePanelState.data?.Id,
        Nome: formData.Nome,
        Descricao: formData.Descricao,
        Slug: formData.Slug,
      },
    })
      .then(() => {
        addressingTypesRefetch();
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false };
        });
        utils.notification(formData.Nome + ' editado com sucesso', 'success');
      })
      .catch((err) => {
        utils.showError(err);
      });
  };

  useEffect(() => {
    reset({
      Nome: slidePanelState.data?.Nome || '',
      Descricao: slidePanelState.data?.Descricao || '',
      Slug: slidePanelState.data?.Slug || '',
    });
  }, [slidePanelState.data, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="editForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.Input
          fieldName="Nome"
          register={register}
          title="Nome"
          error={errors.Nome}
          data-testid="editNome"
        />
        <common.form.Input
          fieldName="Slug"
          register={register}
          title="Slug"
          error={errors.Slug}
          data-testid="inserirSlug"
        />
        <common.form.Input
          fieldName="Descricao"
          register={register}
          title="Descrição"
          error={errors.Descricao}
          data-testid="editDescricao"
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Editar"
        disabled={updateAddressingTypeLoading}
        loading={updateAddressingTypeLoading}
      />
    </form>
  );
}
