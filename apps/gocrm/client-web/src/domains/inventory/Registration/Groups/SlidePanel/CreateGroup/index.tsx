import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as groups from '&crm/domains/inventory/Registration/Groups';

import * as common from '@comigo/ui-common';

import * as utils from '@comigo/utils';

export default function CreateGroup() {
  const {
    createGroupLoading,
    createGroup,
    setSlidePanelState,
    groupsRefetch,
    groupSchema,
    slidePanelState,
  } = groups.useGroup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(groupSchema),
  });
  const onSubmit = (formData: GraphQLTypes['estoque_Grupos']) => {
    createGroup({
      variables: {
        Nome: formData.Nome,
        Descricao: formData.Descricao,
      },
    })
      .then(() => {
        groupsRefetch();
        setSlidePanelState({ ...slidePanelState, open: false });
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
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createGroupLoading}
        loading={createGroupLoading}
      />
    </form>
  );
}
