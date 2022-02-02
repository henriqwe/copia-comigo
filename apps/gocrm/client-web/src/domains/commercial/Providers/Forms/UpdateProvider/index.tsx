import { useEffect, useState } from 'react';

import * as common from '@comigo/ui-common';

import * as providers from '&crm/domains/commercial/Providers';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as utils from '@comigo/utils';

type FormData = {
  Id: string;
  Nome: string;
};

export default function UpdateProvider() {
  const [edicaoAtivada, setEdicaoAtivada] = useState(false);
  const {
    updateProviderLoading,
    updateProvider,
    providerData,
    providerRefetch,
    providerSchema,
  } = providers.useUpdate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(providerSchema) });

  function onSubmit(formData: FormData) {
    updateProvider({
      variables: {
        Id: providerData?.Id,
        Nome: formData.Nome,
      },
    })
      .then(() => {
        providerRefetch();
        utils.notification(formData.Nome + ' editado com sucesso', 'success');
      })
      .catch((err) => {
        utils.showError(err);
      });
  }

  useEffect(() => {
    reset({
      Nome: providerData?.Nome || '',
    });
  }, [providerData, reset]);

  return (
    <div className="flex flex-col gap-4">
      <common.Card>
        <common.GenericTitle
          title="Dados gerais"
          subtitle="Dados básicos do Fornecedor"
          className="px-6"
        />
        <common.Separator className="mb-0" />
        <form>
          {' '}
          <common.form.FormLine position={1} grid={2}>
            <common.form.Input
              fieldName="Nome"
              title="Nome"
              register={register}
              error={errors.Nome}
              disabled={!edicaoAtivada}
            />
          </common.form.FormLine>
          <div className="flex items-center justify-between w-full px-6">
            <common.buttons.GoBackButton />
            <div className="flex gap-2">
              {edicaoAtivada && (
                <common.buttons.CancelButton
                  onClick={() => {
                    setEdicaoAtivada(false);
                  }}
                />
              )}
              <common.buttons.PrimaryButton
                title={edicaoAtivada ? 'Atualizar' : 'Editar'}
                disabled={updateProviderLoading}
                loading={updateProviderLoading}
                onClick={() => {
                  event?.preventDefault();
                  if (!edicaoAtivada) {
                    setEdicaoAtivada(true);
                    return;
                  }
                  handleSubmit(onSubmit)();
                }}
              />
            </div>
          </div>
        </form>
      </common.Card>
    </div>
  );
}
