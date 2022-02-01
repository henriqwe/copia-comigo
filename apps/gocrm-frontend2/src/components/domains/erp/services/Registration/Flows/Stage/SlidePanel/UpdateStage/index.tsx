import { Controller, useForm } from 'react-hook-form'

import * as common from '&test/components/common'
import * as buttons from '&test/components/common/Buttons'
import * as form from '&test/components/common/Form'
import * as flowStages from '&test/components/domains/erp/services/Registration/Flows/Stage'
import * as flows from '&test/components/domains/erp/services/Registration/Flows'

import { useEffect } from 'react'
import { GraphQLTypes } from '&test/graphql/generated/zeus'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'
import router from 'next/router'
import rotas from '&test/components/domains/routes'

export default function UpdateFlowStage() {
  const { flowsData } = flows.useFlow()
  const {
    updateFlowStageLoading,
    updateFlowStage,
    setSlidePanelState,
    stagesRefetch,
    stageSchema,
    slidePanelState
  } = flowStages.useStage()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(stageSchema)
  })
  const onSubmit = (formData: GraphQLTypes['atendimentos_EtapasDosFluxos']) => {
    updateFlowStage({
      variables: {
        Id: slidePanelState.data?.Id,
        Nome: formData.Nome,
        Posicao: formData.Posicao,
        Fluxo_Id: formData.Fluxo_Id.key
      }
    })
      .then(() => {
        stagesRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        notification(
          formData.Fluxo_Id.title + ' editado com sucesso',
          'success'
        )
      })
      .catch((err) => {
        showError(err)
      })
  }

  useEffect(() => {
    reset({
      Nome: slidePanelState.data?.Nome || '',
      Posicao: slidePanelState.data?.Posicao || '',
      Fluxo_Id: {
        key: slidePanelState.data?.Fluxo.Id || '',
        title: slidePanelState.data?.Fluxo.Nome || ''
      }
    })
  }, [slidePanelState.data, reset])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="editForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <form.Input
          fieldName="Nome"
          register={register}
          title="Nome"
          error={errors.Nome}
          data-testid="inserirNome"
        />
        <form.Input
          fieldName="Posicao"
          register={register}
          type="number"
          title="Posição"
          error={errors.Posicao}
          data-testid="inserirPosicao"
        />
        <Controller
          control={control}
          name="Fluxo_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <form.Select
                itens={
                  flowsData
                    ? flowsData.map((item) => {
                      return { key: item.Id, title: item.Nome }
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
                  router.push(rotas.erp.atendimento.cadastros.fluxos.index)
                }
              >
                Cadastrar Fluxo
              </common.OpenModalLink>
            </div>
          )}
        />
      </div>
      <common.Separator />
      <buttons.PrimaryButton
        title="Editar"
        disabled={updateFlowStageLoading}
        loading={updateFlowStageLoading}
      />
    </form>
  )
}
