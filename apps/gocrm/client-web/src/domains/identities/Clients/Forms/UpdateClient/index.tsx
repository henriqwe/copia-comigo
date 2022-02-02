import { useEffect, useState } from 'react';

import * as common from '@comigo/ui-common';

import * as clients from '&crm/domains/identities/Clients';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as utils from '@comigo/utils';

// import { GraphQLTypes } from '&crm/graphql/generated/zeus'
//

type FormData = {
  Nome: string;
  Identificador: string;
  RazaoSocial: string;
  CEP: string;
  Logradouro: string;
  Numero: string;
  Bairro: string;
  Cidade: string;
  Estado: string;
};

export default function UpdatePerson() {
  const [edicaoAtivada, setEdicaoAtivada] = useState(false);

  // const {
  //   cadastrarCliente
  //   // BuscarPessoa,
  // } = cliente.useCadastrar()
  // const [tipoDePessoaSelecionada] = useState('')

  const {
    clientData,
    clientLoading,
    clientRefetch,
    updatePerson,
    updatePersonLoading,
    pessoaSchema,
  } = clients.useUpdate();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(pessoaSchema) });

  function onSubmit(fomData: FormData) {
    clientData!.Pessoa.DadosDaApi.name = fomData.RazaoSocial;
    updatePerson({
      variables: {
        Id: clientData?.Pessoa.Id,
        Nome: fomData.Nome,
        Identificador: fomData.Identificador,
        DadosDaApi: clientData!.Pessoa.DadosDaApi,
      },
    })
      .then(() => {
        clientRefetch();
        setEdicaoAtivada(false);
        utils.notification(fomData.Nome + ' editado com sucesso', 'success');
      })
      .catch((err) => {
        utils.showError(err);
      });
  }

  useEffect(() => {
    reset({
      Nome: clientData?.Pessoa.Nome || '',
      Identificador: clientData?.Pessoa.Identificador,
      RazaoSocial: clientData?.Pessoa.DadosDaApi.name,
    });
  }, [clientData, reset]);

  return (
    <div className="flex flex-col gap-4">
      <common.Card>
        <common.GenericTitle
          title="Dados gerais"
          subtitle="Dados básicos do Cliente"
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
            {clientData?.Pessoa.PessoaJuridica ? (
              <common.form.CNPJInput
                register={register}
                error={errors.Identificador}
                control={control}
                disabled={true}
              />
            ) : (
              <common.form.CPFInput
                register={register}
                error={errors.Identificador}
                control={control}
                disabled={true}
              />
            )}
          </common.form.FormLine>
          <common.form.FormLine grid={1} position={2}>
            {clientData?.Pessoa.PessoaJuridica && (
              <common.form.Input
                fieldName="RazaoSocial"
                title="Razão social"
                register={register}
                error={errors.razaoSocial}
                disabled={!edicaoAtivada}
              />
            )}
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
                disabled={clientLoading || updatePersonLoading}
                loading={clientLoading || updatePersonLoading}
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
