import { Controller, useForm } from 'react-hook-form';

import * as common from '@comigo/ui-common';

import * as services from '&crm/domains/commercial/Products/Tabs/Services';

import { yupResolver } from '@hookform/resolvers/yup';
import * as utils from '@comigo/utils';

type FormData = {
  Servico_Id: {
    key: string;
    title: string;
  };
};

export default function CreateService() {
  const {
    createServiceLoading,
    createService,
    setSlidePanelState,
    servicesRefetch,
    serviceSchema,
    mainServicesData,
  } = services.useService();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(serviceSchema),
  });
  const onSubmit = (formData: FormData) => {
    createService({
      variables: {
        Servico_Id: formData.Servico_Id.key,
      },
    })
      .then(() => {
        servicesRefetch();
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false };
        });
        utils.notification('Serviço cadastrado com sucesso', 'success');
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
        <Controller
          control={control}
          name="Servico_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  mainServicesData
                    ? mainServicesData.map((item) => {
                        return {
                          key: item.Id,
                          title: item.Nome,
                        };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Servico_Id}
                label="Serviços"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createServiceLoading}
        loading={createServiceLoading}
      />
    </form>
  );
}
