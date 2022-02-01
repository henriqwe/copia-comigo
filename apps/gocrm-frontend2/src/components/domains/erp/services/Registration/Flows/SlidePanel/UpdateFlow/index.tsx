import { useForm } from 'react-hook-form'

import * as common from '&test/components/common'
import * as buttons from '&test/components/common/Buttons'
import * as form from '&test/components/common/Form'
import * as flows from '&test/components/domains/erp/services/Registration/Flows'

import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

type FormData = {
  Id: string
  Nome: string
}

export default function UpdateFlow() {
  const {
    updateFlowLoading,
    updateFlow,
    setSlidePanelState,
    slidePanelState,
    flowsRefetch,
    flowSchema
  } = flows.useFlow()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(flowSchema)
  })
  const onSubmit = (formData: FormData) => {
    updateFlow({
      variables: {
        Id: slidePanelState.data?.Id,
        Nome: formData.Nome
      }
    })
      .then(() => {
        flowsRefetch()
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
      Nome: slidePanelState.data?.Nome || ''
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
      </div>
      <common.Separator />
      <buttons.PrimaryButton
        title="Editar"
        disabled={updateFlowLoading}
        loading={updateFlowLoading}
      />
    </form>
  )
}
