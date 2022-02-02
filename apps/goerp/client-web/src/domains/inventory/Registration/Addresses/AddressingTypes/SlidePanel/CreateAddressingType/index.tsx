import { useForm } from 'react-hook-form';

import * as common from '@comigo/ui-common';
import * as utils from '@comigo/utils';
import * as addressingTypes from '&erp/domains/inventory/Registration/Addresses/AddressingTypes';

import { yupResolver } from '@hookform/resolvers/yup';
import { GraphQLTypes } from '&erp/graphql/generated/zeus';

export function Create() {
  const {
    createAddressingTypeLoading,
    createAddressingType,
    setSlidePanelState,
    addressingTypesRefetch,
    addressingTypesSchema,
  } = addressingTypes.useAddressingType();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressingTypesSchema),
  });
  const onSubmit = (
    formData: GraphQLTypes['estoque_TiposDeEnderecamentos']
  ) => {
    createAddressingType({
      variables: {
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
          data-testid="inserirDescricao"
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createAddressingTypeLoading}
        loading={createAddressingTypeLoading}
      />
    </form>
  );
}
