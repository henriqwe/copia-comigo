import { Controller, useForm } from 'react-hook-form';

import * as common from '@comigo/ui-common';

import * as leads from '&crm/domains/services/Leads';
import * as clients from '&crm/domains/identities/Clients';

import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as utils from '@comigo/utils';

import router from 'next/router';
import rotas from '&crm/domains/routes';

type FormData = {
  Id: string;
  Nome: string;
  Email: string;
  Telefone: string;
  Cliente_Id: {
    key: string;
    title: string;
  };
};

export default function UpdateLead() {
  const {
    updateLeadLoading,
    updateLead,
    setSlidePanelState,
    leadsRefetch,
    leadSchema,
    slidePanelState,
  } = leads.useLead();
  const { clientsData } = clients.useList();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(leadSchema),
  });
  const onSubmit = (formData: FormData) => {
    updateLead({
      variables: {
        Id: slidePanelState.data?.Id,
        Nome: formData.Nome,
        Email: formData.Email,
        Telefone: utils.phoneUnformat(formData.Telefone),
        Cliente_Id:
          formData.Cliente_Id.key !== '' ? formData.Cliente_Id.key : null,
      },
    })
      .then(() => {
        leadsRefetch();
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
      Email: slidePanelState.data?.Email || '',
      Telefone: slidePanelState.data?.Telefone || '',
      Cliente_Id: {
        key: slidePanelState.data?.Cliente
          ? slidePanelState.data?.Cliente.Id || ''
          : '',
        title: slidePanelState.data?.Cliente
          ? slidePanelState.data?.Cliente.Pessoa.Nome || ''
          : '',
      },
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
          fieldName="Email"
          register={register}
          title="Email"
          error={errors.Email}
          data-testid="editEmail"
        />
        <common.form.BRPhoneInput
          control={control}
          register={register}
          error={errors.Telefone}
          data-testid="editTelefone"
        />
        <Controller
          control={control}
          name="Cliente_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  clientsData
                    ? clientsData.map((item) => {
                        return {
                          key: item.Id,
                          title: item.Pessoa?.Nome as string,
                        };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Cliente_Id}
                label="Cliente (opcional)"
              />
              <common.OpenModalLink
                onClick={() =>
                  router.push(rotas.identidades.clientes.cadastrar)
                }
              >
                Cadastrar Cliente
              </common.OpenModalLink>
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Editar"
        disabled={updateLeadLoading}
        loading={updateLeadLoading}
      />
    </form>
  );
}
