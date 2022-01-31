import { useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
 
 
import * as questions from '&crm/domains/services/Registration/Questions'

import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
 import * as utils from '@comigo/utils'
 

type FormData = {
  Titulo: string
  Descricao: string
}

export default function UpdateQuestion() {
  const {
    updateQuestionLoading,
    updateQuestion,
    setSlidePanelState,
    slidePanelState,
    questionsRefetch,
    questionSchema
  } = questions.useQuestion()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(questionSchema)
  })
  const onSubmit = (formData: FormData) => {
    updateQuestion({
      variables: {
        Id: slidePanelState.data?.Id,
        Titulo: formData.Titulo,
        Descricao: formData.Descricao
      }
    })
      .then(() => {
        questionsRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
          utils.notification(formData.Titulo + ' editado com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  useEffect(() => {
    reset({
      Titulo: slidePanelState.data?.Titulo || '',
      Descricao: slidePanelState.data?.Descricao || ''
    })
  }, [slidePanelState.data, reset])

  return (
    <form      onSubmit={handleSubmit(onSubmit)}
      data-testid="editForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.Input
          fieldName="Titulo"
          register={register}
          title="Título"
          error={errors.Titulo}
          data-testid="editTitulo"
        />
        <common.form.Input
          fieldName="Descricao"
          register={register}
          title="Descrição"
          error={errors.Descricao}
          data-testid="editDescricao"
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Editar"
        disabled={updateQuestionLoading}
        loading={updateQuestionLoading}
      />
    </form>
  )
}
