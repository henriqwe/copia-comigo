import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';

import { GraphQLTypes } from '&crm/graphql/generated/zeus';
import { yupResolver } from '@hookform/resolvers/yup';

import * as proposals from '&crm/domains/commercial/Proposals';
import * as common from '@comigo/ui-common';

import * as utils from '@comigo/utils';

export default function UpdateAddress() {
  const [CEPData, setCEPData] = useState({
    bairro: '',
    logradouro: '',
    localidade: '',
    uf: '',
  });
  const [CEP, setCEP] = useState('');
  const {
    slidePanelState,
    setSlidePanelState,
    addressSchema,
    proposalRefetch,
    updateProposalInstalation,
    updateProposalInstalationLoading,
    proposalInstallationsRefetch,
  } = proposals.useView();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
  });
  const onSubmit = (formData: GraphQLTypes['contatos_Enderecos']) => {
    updateProposalInstalation({
      variables: {
        Id: slidePanelState.data?.Id,
        Endereco: formData,
        Veiculo_Id: slidePanelState.data?.Veiculo_Id,
      },
    })
      .then(() => {
        proposalRefetch();
        proposalInstallationsRefetch();
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false };
        });
        utils.notification('Endereço redefinido com sucesso', 'success');
      })
      .catch((err) => {
        utils.showError(err);
      });
  };

  useEffect(() => {
    if (CEPData.bairro !== '') {
      reset({
        Bairro: CEPData.bairro,
        Logradouro: CEPData.logradouro,
        Cep: CEP,
        Cidade: CEPData.localidade,
        Estado: CEPData.uf,
      });
    }
  }, [reset, CEPData]);

  useEffect(() => {
    if (CEP !== '') {
      setCEP(utils.CEPunformat(CEP));
      fetch(`http://viacep.com.br/ws/${CEP}/json/`)
        .then((response) => response.json())
        .then((data) => setCEPData(data))
        .catch((err) => utils.showError(err));
    }
  }, [CEP]);

  useEffect(() => {
    reset({
      Bairro: slidePanelState.data?.Endereco.Bairro || '',
      Logradouro: slidePanelState.data?.Endereco.Logradouro || '',
      Numero: slidePanelState.data?.Endereco.Numero || '',
      Cep: slidePanelState.data?.Endereco.Cep || '',
      Complemento: slidePanelState.data?.Endereco.Complemento || '',
      Cidade: slidePanelState.data?.Endereco.Cidade || '',
      Estado: slidePanelState.data?.Endereco.Estado || '',
    });
  }, [slidePanelState.data, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="editForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.ZipCodeInput
          register={register}
          error={errors.Cep}
          control={control}
          onCompleteZipCode={setCEP}
        />
        <common.Separator />
        <common.form.Input
          fieldName="Logradouro"
          register={register}
          title="Logradouro"
          error={errors.Logradouro}
          disabled
        />
        <common.form.Input
          fieldName="Bairro"
          register={register}
          title="Bairro"
          error={errors.Bairro}
          disabled
        />
        <common.form.Input
          fieldName="Cidade"
          register={register}
          title="Cidade"
          error={errors.Cidade}
          disabled
        />
        <common.form.Input
          fieldName="Estado"
          register={register}
          title="Estado"
          error={errors.Estado}
          disabled
        />
        <common.form.Input
          fieldName="Numero"
          register={register}
          title="Número"
          error={errors.Numero}
        />

        <common.form.Input
          fieldName="Complemento"
          register={register}
          title="Complemento"
          error={errors.Complemento}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Atualizar"
        disabled={updateProposalInstalationLoading}
        loading={updateProposalInstalationLoading}
      />
    </form>
  );
}
