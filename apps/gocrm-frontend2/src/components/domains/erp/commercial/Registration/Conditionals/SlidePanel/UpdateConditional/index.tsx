import { Controller, useForm } from 'react-hook-form'

import * as common from '&test/components/common'
import * as buttons from '&test/components/common/Buttons'
import * as form from '&test/components/common/Form'
import * as conditionals from '&test/components/domains/erp/commercial/Registration/Conditionals'

import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

type FormData = {
  Id: string
  Nome: string
  Situacao: {
    key: string
    title: string
  }
}

export default function UpdateConditional() {
  const {
    updateConditionalLoading,
    updateConditional,
    setSlidePanelState,
    slidePanelState,
    conditionalRefetch,
    conditionalSchema,
    conditionalSituationData
  } = conditionals.useConditional()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(conditionalSchema)
  })
  const onSubmit = (formData: FormData) => {
    updateConditional({
      variables: {
        Id: slidePanelState.data?.Id,
        Nome: formData.Nome,
        Situacao_Id: formData.Situacao.key
      }
    })
      .then(() => {
        conditionalRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        notification(formData.Nome + ' editado com sucesso', 'success')
      })
      .catch((err) => {
        showError(err)
      })
  }

  useEffect(() => {
    reset({
      Nome: slidePanelState.data?.Nome || '',
      Situacao: {
        key: slidePanelState.data?.Situacao.Valor || '',
        title: slidePanelState.data?.Situacao.Comentario || ''
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
          data-testid="editNome"
        />
        <Controller
          control={control}
          name="Situacao"
          render={({ field: { onChange, value } }) => (
            <form.Select
              itens={
                conditionalSituationData
                  ? conditionalSituationData.map((item) => {
                    return {
                      key: item.Valor,
                      title: item.Comentario
                    }
                  })
                  : []
              }
              value={value}
              onChange={onChange}
              error={errors.Situacao}
              label="Situação"
            />
          )}
        />
      </div>
      <common.Separator />
      <buttons.PrimaryButton
        title="Editar"
        disabled={updateConditionalLoading}
        loading={updateConditionalLoading}
      />
    </form>
  )
}
