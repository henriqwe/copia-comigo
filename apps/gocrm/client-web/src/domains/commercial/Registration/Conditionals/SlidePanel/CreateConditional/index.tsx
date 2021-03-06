import { Controller, useForm } from 'react-hook-form';

import * as common from '@comigo/ui-common';

import * as conditionals from '&crm/domains/commercial/Registration/Conditionals';

import { yupResolver } from '@hookform/resolvers/yup';
import * as utils from '@comigo/utils';

type FormData = {
  Id: string;
  Nome: string;
  Situacao: {
    key: string;
    title: string;
  };
};

export default function CreateConditional() {
  const {
    createConditionalLoading,
    createConditional,
    setSlidePanelState,
    conditionalRefetch,
    conditionalSchema,
    conditionalSituationData,
  } = conditionals.useConditional();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(conditionalSchema),
  });
  const onSubmit = (formData: FormData) => {
    createConditional({
      variables: {
        Nome: formData.Nome,
        Situacao_Id: formData.Situacao.key,
      },
    })
      .then(() => {
        conditionalRefetch();
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
          data-testid="editNome"
        />
        <Controller
          control={control}
          name="Situacao"
          render={({ field: { onChange, value } }) => (
            <common.form.Select
              itens={
                conditionalSituationData
                  ? conditionalSituationData.map((item) => {
                      return {
                        key: item.Valor,
                        title: item.Comentario,
                      };
                    })
                  : []
              }
              value={value}
              onChange={onChange}
              error={errors.Situacao}
              label="Situa????o"
            />
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createConditionalLoading}
        loading={createConditionalLoading}
      />
    </form>
  );
}
