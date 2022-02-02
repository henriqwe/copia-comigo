import { Controller, useForm } from 'react-hook-form';

import * as common from '@comigo/ui-common';

import * as flowStages from '&crm/domains/services/Registration/Flows/Stage';
import * as flows from '&crm/domains/services/Registration/Flows';

import { yupResolver } from '@hookform/resolvers/yup';
import { GraphQLTypes } from '&crm/graphql/generated/zeus';
import * as utils from '@comigo/utils';

import router from 'next/router';
import rotas from '&crm/domains/routes';

export default function CreateStage() {
  const { flowsData } = flows.useFlow();
  const {
    createFlowStageLoading,
    createFlowStage,
    setSlidePanelState,
    stagesRefetch,
    stageSchema,
  } = flowStages.useStage();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(stageSchema),
  });
  const onSubmit = (formData: GraphQLTypes['atendimentos_EtapasDosFluxos']) => {
    createFlowStage({
      variables: {
        Nome: formData.Nome,
        Posicao: formData.Posicao,
        Fluxo_Id: formData.Fluxo_Id.key,
      },
    })
      .then(() => {
        stagesRefetch();
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
        <common.form.Input
          fieldName="Posicao"
          type="number"
          register={register}
          title="Posição"
          error={errors.Posicao}
          data-testid="inserirPosicao"
        />
        <Controller
          control={control}
          name="Fluxo_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  flowsData
                    ? flowsData.map((item) => {
                        return { key: item.Id, title: item.Nome };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Fluxo_Id}
                label="Fluxo"
              />
              <common.OpenModalLink
                onClick={() =>
                  router.push(rotas.atendimento.cadastros.fluxos.index)
                }
              >
                Cadastrar Fluxo
              </common.OpenModalLink>
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createFlowStageLoading}
        loading={createFlowStageLoading}
      />
    </form>
  );
}
