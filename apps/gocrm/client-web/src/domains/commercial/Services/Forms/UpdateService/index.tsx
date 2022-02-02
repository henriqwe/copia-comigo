import { useEffect, useState } from 'react';

import * as common from '@comigo/ui-common';

import * as services from '&crm/domains/commercial/Services';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as utils from '@comigo/utils';

type FormData = {
  Nome: string;
  Categorias: {
    key: string;
    title: string;
  }[];
  Tipo: {
    key: string;
    title: string;
  };
};

export default function UpdateService() {
  const [activeEdit, setActiveEdit] = useState(false);
  const [geraOS, setGeraOS] = useState(false);
  const {
    updateServiceLoading,
    updateService,
    serviceData,
    serviceRefetch,
    serviceSchema,
    vehicleCategoriesData,
    serviceTypesData,
  } = services.useUpdate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({ resolver: yupResolver(serviceSchema) });

  function onSubmit(formData: FormData) {
    updateService({
      variables: {
        Id: serviceData?.Id,
        Nome: formData.Nome,
        Categorias: formData.Categorias,
        Tipo_Id: formData.Tipo.key,
        GeraOS: geraOS,
      },
    })
      .then(() => {
        serviceRefetch();
        setActiveEdit(false);
        utils.notification(formData.Nome + ' editado com sucesso', 'success');
      })
      .catch((err) => {
        utils.showError(err);
      });
  }

  useEffect(() => {
    reset({
      Nome: serviceData?.Nome || '',
      Categorias: serviceData?.Categorias,
      Tipo: {
        key: serviceData?.Tipo.Valor,
        title: serviceData?.Tipo.Comentario,
      },
    });
    setGeraOS(serviceData?.GeraOS as boolean);
  }, [serviceData, reset]);

  return (
    <div className="flex flex-col gap-4">
      <common.Card>
        <div className="flex justify-between">
          <common.GenericTitle
            title="Dados gerais"
            subtitle="Dados básicos do produto"
            className="px-6"
          />
          <div className="flex items-center justify-between gap-4 mx-6">
            <p>Esse serviço gera uma OS?</p>
            <common.form.Switch
              onChange={() => {
                setActiveEdit(true);
                setGeraOS(!geraOS);
              }}
              value={geraOS}
            />
          </div>
        </div>
        <common.Separator className="mb-0" />
        <form>
          {' '}
          <common.form.FormLine position={1} grid={3}>
            <common.form.Input
              fieldName="Nome"
              title="Nome"
              register={register}
              error={errors.Nome}
              disabled={!activeEdit}
            />
            <Controller
              control={control}
              name="Categorias"
              render={({ field: { onChange, value } }) => (
                <div>
                  <common.form.MultiSelect
                    itens={
                      vehicleCategoriesData
                        ? vehicleCategoriesData.map((vehicleCategory) => {
                            return {
                              key: vehicleCategory.Id,
                              title: vehicleCategory.Nome,
                            };
                          })
                        : []
                    }
                    value={value}
                    onChange={onChange}
                    error={errors.Categorias}
                    disabled={!activeEdit}
                    label="Categorias"
                    edit={true}
                  />
                </div>
              )}
            />
            <Controller
              control={control}
              name="Tipo"
              render={({ field: { onChange, value } }) => (
                <div>
                  <common.form.Select
                    itens={
                      serviceTypesData
                        ? serviceTypesData.map((serviceType) => {
                            return {
                              key: serviceType.Valor,
                              title: serviceType.Comentario,
                            };
                          })
                        : []
                    }
                    value={value}
                    onChange={onChange}
                    error={errors.Tipo}
                    label="Tipo"
                    disabled={!activeEdit}
                  />
                </div>
              )}
            />
          </common.form.FormLine>
          <div className="flex items-center justify-between w-full px-6">
            <common.buttons.GoBackButton />
            <div className="flex gap-2">
              {activeEdit && (
                <common.buttons.CancelButton
                  onClick={() => {
                    reset({
                      Nome: serviceData?.Nome || '',
                      Categorias: serviceData?.Categorias,
                      Tipo: {
                        key: serviceData?.Tipo.Valor,
                        title: serviceData?.Tipo.Comentario,
                      },
                    });
                    setGeraOS(serviceData?.GeraOS as boolean);
                    setActiveEdit(false);
                  }}
                />
              )}
              <common.buttons.PrimaryButton
                title={activeEdit ? 'Atualizar' : 'Editar'}
                disabled={updateServiceLoading}
                loading={updateServiceLoading}
                onClick={() => {
                  event?.preventDefault();
                  if (!activeEdit) {
                    setActiveEdit(true);
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
