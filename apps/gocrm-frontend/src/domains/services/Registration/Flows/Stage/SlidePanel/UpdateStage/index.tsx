import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
 
 
import * as flowStages from '&crm/domains/services/Registration/Flows/Stage'
import * as flows from '&crm/domains/services/Registration/Flows'

import { useEffect } from 'react'
import { GraphQLTypes } from '&crm/graphql/generated/zeus'
import { yupResolver } from '@hookform/resolvers/yup'
 import * as utils from '@comigo/utils'
 
import router from 'next/router'
import rotas from '&crm/domains/routes'

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
          utils.notification(
          formData.Fluxo_Id.title + ' editado com sucesso',
          'success'
        )
      })
      .catch((err) => {
        utils.showError(err)
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
    <form      onSubmit={handleSubmit(onSubmit)}
      data-testid="editForm"
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
              <common.form.Select
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
        title="Editar"
        disabled={updateFlowStageLoading}
        loading={updateFlowStageLoading}
      />
    </form>
  )
}
