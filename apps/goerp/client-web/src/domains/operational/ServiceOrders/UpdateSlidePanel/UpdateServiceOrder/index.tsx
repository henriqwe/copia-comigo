import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as common from '@comigo/ui-common';

import * as serviceOrders from '&erp/domains/operational/ServiceOrders';

import * as utils from '@comigo/utils';
import { useEffect } from 'react';
import { datetimeFormat } from '@comigo/utils';

type FormData = {
  Agendamento: Date;
  Colaborador_Id: {
    key: string;
    title: string;
  };
};

export function Schedule() {
  const {
    updateServiceOrdersLoading,
    updateServiceOrders,
    serviceOrderData,
    serviceOrderRefetch,
    serviceOrdersSchema,
    setSlidePanelState,
    serviceOrderActivitiesRefetch,
    collaboratorsData,
  } = serviceOrders.useUpdate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({ resolver: yupResolver(serviceOrdersSchema) });
  function onSubmit(formData: FormData) {
    updateServiceOrders({
      variables: {
        Agendamento: formData.Agendamento,
        Colaborador_Id: formData.Colaborador_Id.key,
      },
    })
      .then(() => {
        serviceOrderRefetch();
        serviceOrderActivitiesRefetch();
        setSlidePanelState({
          open: false,
          type: 'schedule',
        });
        utils.notification('Ordem de serviço agendada com sucesso', 'success');
      })
      .catch((err) => {
        utils.showError(err);
      });
  }

  useEffect(() => {
    if (serviceOrderData) {
      reset({
        Agendamento:
          serviceOrderData.Agendamentos.length > 0
            ? datetimeFormat(serviceOrderData.Agendamentos[0].Agendamento)
            : undefined,
      });
    }
  }, [reset, serviceOrderData]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.Input
          fieldName="Agendamento"
          register={register}
          title="Data de agendamento"
          error={errors.Agendamento}
          type="datetime-local"
        />
        <Controller
          control={control}
          name="Colaborador_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  collaboratorsData
                    ? collaboratorsData.map((item) => {
                        return {
                          key: item.Id,
                          title: item.Pessoa.Nome,
                        };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Colaborador_Id}
                label="Colaborador"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={updateServiceOrdersLoading}
        loading={updateServiceOrdersLoading}
      />
    </form>
  );
}
