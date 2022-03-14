import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { GraphQLTypes } from '&crm/graphql/generated/zeus';

import * as common from '@comigo/ui-common';

import * as adresses from '&crm/domains/Providers/Tabs/Addresses';
import * as providers from '&crm/domains/Providers';
import { useState, useEffect } from 'react';
import * as utils from '@comigo/utils';

export default function CreateAddress() {
  const [cities, setCities] = useState<{ Id: string; Nome: string }[]>([]);
  const [CEPData, setCEPData] = useState({ bairro: '', logradouro: '' });
  const [stateId, setStateId] = useState('');
  const [CEP, setCEP] = useState('');
  const {
    setSlidePanelState,
    createAdress,
    createAdressLoading,
    addressesRefetch,
    addressSchema,
    statesData,
    getCities,
  } = adresses.useAdress();
  const { providerData } = providers.useUpdate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(addressSchema),
  });
  const onSubmit = (formData: GraphQLTypes['contatos_Enderecos']) => {
    createAdress({
      variables: {
        Bairro: formData.Bairro,
        Logradouro: formData.Logradouro,
        Numero: formData.Numero,
        Cep: formData.Cep,
        Complemento: formData.Complemento,
        Estado_Id: formData.Estado_Id.key,
        Cidade_Id: formData.Cidade_Id.key,
        Identidades: { fornecedor: providerData?.Id },
      },
    })
      .then(() => {
        addressesRefetch();
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false };
        });
        utils.notification('Endereço cadastrado com sucesso', 'success');
      })
      .catch((err) => {
        utils.notification(err.message, 'error');
      });
  };

  useEffect(() => {
    if (stateId !== '') {
      getCities(stateId).then((data) => {
        setCities(data);
      });
    }
  }, [getCities, stateId]);

  useEffect(() => {
    if (CEPData.bairro !== '') {
      reset({
        Bairro: CEPData.bairro,
        Logradouro: CEPData.logradouro,
        Cep: CEP,
        // Estado_Id: {
        //   key: CEPData.estado,
        //   titulo: CEPData.uf
        // }
      });
    }
  }, [reset, CEPData]);

  useEffect(() => {
    if (CEP !== '') {
      setCEP(CEP.split('-').join(''));
      fetch(`http://viacep.com.br/ws/${CEP}/json/`)
        .then((response) => response.json())
        .then((data) => setCEPData(data))
        .catch((err) => console.log(err));
    }
  }, [CEP]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.ZipCodeInput
          register={register}
          error={errors.Cep}
          data-testid="inserirCep"
          control={control}
          onCompleteZipCode={setCEP}
        />
        <common.Separator />
        <common.form.Input
          fieldName="Bairro"
          register={register}
          title="Bairro"
          error={errors.Bairro}
          data-testid="inserirBairro"
        />
        <common.form.Input
          fieldName="Logradouro"
          register={register}
          title="Logradouro"
          error={errors.Logradouro}
          data-testid="inserirLogradouro"
        />
        <common.form.Input
          fieldName="Numero"
          register={register}
          title="Número"
          error={errors.Numero}
          data-testid="inserirNumero"
        />

        <common.form.Input
          fieldName="Complemento"
          register={register}
          title="Complemento"
          error={errors.Complemento}
          data-testid="inserirComplemento"
        />

        <Controller
          control={control}
          name="Estado_Id"
          render={({ field: { onChange, value } }) => (
            <div className="col-span-3">
              <common.form.Select
                itens={
                  statesData
                    ? statesData.map((item) => {
                        return { key: item.Id, title: item.Nome };
                      })
                    : []
                }
                value={value}
                onChange={(estado) => {
                  setStateId(estado.key as string);
                  onChange(estado);
                }}
                error={errors.Estado_Id}
                label="Estado"
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="Cidade_Id"
          render={({ field: { onChange, value } }) => (
            <div className="col-span-3">
              <common.form.Select
                itens={
                  cities
                    ? cities.map((item) => {
                        return { key: item.Id, title: item.Nome };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Cidade_Id}
                disabled={stateId === ''}
                label="Cidade"
              />
            </div>
          )}
        />
      </div>

      <common.Separator />

      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createAdressLoading}
        loading={createAdressLoading}
      />
    </form>
  );
}
