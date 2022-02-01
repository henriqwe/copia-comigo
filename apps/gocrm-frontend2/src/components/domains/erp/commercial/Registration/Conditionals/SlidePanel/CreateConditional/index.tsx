import { Controller, useForm } from 'react-hook-form'

import * as common from '&test/components/common'
import * as buttons from '&test/components/common/Buttons'
import * as form from '&test/components/common/Form'
import * as conditionals from '&test/components/domains/erp/commercial/Registration/Conditionals'

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

export default function CreateConditional() {
  const {
    createConditionalLoading,
    createConditional,
    setSlidePanelState,
    conditionalRefetch,
    conditionalSchema,
    conditionalSituationData
  } = conditionals.useConditional()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(conditionalSchema)
  })
  const onSubmit = (formData: FormData) => {
    createConditional({
      variables: {
        Nome: formData.Nome,
        Situacao_Id: formData.Situacao.key
      }
    })
      .then(() => {
        conditionalRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        notification(formData.Nome + ' cadastrado com sucesso', 'success')
      })
      .catch((err) => {
        showError(err)
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
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
        title="Enviar"
        disabled={createConditionalLoading}
        loading={createConditionalLoading}
      />
    </form>
  )
}
