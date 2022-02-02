import { useForm, Controller } from 'react-hook-form';

import * as common from '@comigo/ui-common';

import * as upSelling from '&crm/domains/commercial/Services/Tabs/UpSelling';
import * as combos from '&crm/domains/commercial/Combos';

import { yupResolver } from '@hookform/resolvers/yup';
import * as utils from '@comigo/utils';

import router from 'next/router';
import rotas from '&crm/domains/routes';

type FormData = {
  Nome: string;
  Combo_Id: {
    key: string;
    title: string;
  };
  Valor: string;
  Servico_Id: {
    key: string;
    title: string;
  };
};

export default function CreateUpSelling() {
  const { combosData } = combos.useList();
  const {
    createUpSellingLoading,
    createUpSelling,
    setSlidePanelState,
    upSellingRefetch,
    upSellingSchema,
  } = upSelling.useUpSelling();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(upSellingSchema),
  });
  const onSubmit = (formData: FormData) => {
    createUpSelling({
      variables: {
        Nome: formData.Nome,
        Combo_Id: formData.Combo_Id.key,
        Valor: utils.BRLMoneyUnformat(formData.Valor),
      },
    })
      .then(() => {
        upSellingRefetch();
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
          data-testid="inserirNome"
        />
        <Controller
          control={control}
          name="Combo_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  combosData
                    ? combosData.map((item) => {
                        return { key: item.Id, title: item.Nome };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Combo_Id}
                label="Combo"
              />
              <common.OpenModalLink
                onClick={() => router.push(rotas.comercial.combos.cadastrar)}
              >
                Cadastrar combo
              </common.OpenModalLink>
            </div>
          )}
        />
        <Controller
          control={control}
          name="Valor"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Input
                fieldName="Valor"
                register={register}
                title="Valor"
                value={value}
                error={errors.Valor}
                onChange={(e) => {
                  onChange(utils.BRLMoneyInputFormat(e));
                }}
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createUpSellingLoading}
        loading={createUpSellingLoading}
      />
    </form>
  );
}
