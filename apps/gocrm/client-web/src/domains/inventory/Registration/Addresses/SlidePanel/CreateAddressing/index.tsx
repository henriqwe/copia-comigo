import { useForm, Controller } from 'react-hook-form';

import * as common from '@comigo/ui-common';

import * as addresses from '&crm/domains/inventory/Registration/Addresses';
import * as addressingTypes from '&crm/domains/inventory/Registration/Addresses/AddressingTypes';

import { yupResolver } from '@hookform/resolvers/yup';
import * as utils from '@comigo/utils';

import router from 'next/router';
import rotas from '&crm/domains/routes';

type FormData = {
  Id: string;
  Nome: string;
  Descricao: string;
  Tipo: {
    key: { Id: string; Slug: string; CodigoReferencia: string };
    title: string;
  };
  Pai_Id: {
    key: string;
    title: string;
  };
};

export default function CreateAddressing() {
  const { addressingTypesData } = addressingTypes.useAddressingType();
  const {
    createAddressingLoading,
    createAddressing,
    setSlidePanelState,
    parentsAdressesData,
    parentsAdressesRefetch,
    adresssesRefetch,
    addressingSchema,
  } = addresses.useAddressing();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(addressingSchema),
  });
  const onSubmit = (formData: FormData) => {
    createAddressing({
      variables: {
        Nome: formData.Tipo.key.Slug + formData.Tipo.key.CodigoReferencia,
        Descricao: formData.Descricao,
        Tipo_Id: formData.Tipo.key.Id,
        Pai_Id: formData.Pai_Id ? formData.Pai_Id.key : null,
      },
    })
      .then(() => {
        adresssesRefetch();
        parentsAdressesRefetch();
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
          fieldName="Descricao"
          register={register}
          title="Descrição"
          error={errors.Descricao}
          data-testid="inserirDescricao"
        />
        <Controller
          control={control}
          name="Tipo"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  addressingTypesData
                    ? addressingTypesData.map((item) => {
                        return { key: item, title: item.Nome };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Tipo}
                label="Tipo"
              />
              <common.OpenModalLink
                onClick={() =>
                  router.push(rotas.estoque.cadastros.enderecamentos.tipos)
                }
              >
                Cadastrar tipo de endereçamento
              </common.OpenModalLink>
            </div>
          )}
        />

        {parentsAdressesData?.length !== 0 && (
          <Controller
            control={control}
            name="Pai_Id"
            render={({ field: { onChange, value } }) => (
              <common.form.SelectWithGroup
                itens={
                  parentsAdressesData
                    ? parentsAdressesData.map((item) => {
                        return {
                          key: item.Id,
                          title: item.Nome,
                          children: item.Filhos?.map((filho) => {
                            return {
                              key: filho.Id,
                              title: filho.Nome,
                              children: filho.Filhos?.map((filho2) => {
                                return {
                                  key: filho2.Id,
                                  title: filho2.Nome,
                                  children: [],
                                };
                              }),
                            };
                          }),
                        };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Pai_Id}
                label="Endereçamento pertencente (opcional)"
              />
            )}
          />
        )}
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createAddressingLoading}
        loading={createAddressingLoading}
      />
    </form>
  );
}