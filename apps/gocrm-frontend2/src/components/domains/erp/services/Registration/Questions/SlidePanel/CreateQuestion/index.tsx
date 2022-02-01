import { useForm } from 'react-hook-form'

import * as common from '&test/components/common'
import * as buttons from '&test/components/common/Buttons'
import * as form from '&test/components/common/Form'
import * as questions from '&test/components/domains/erp/services/Registration/Questions'

import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

type FormData = {
  Titulo: string
  Descricao: string
}

export default function CreateQuestion() {
  const {
    createQuestionLoading,
    createQuestion,
    setSlidePanelState,
    questionsRefetch,
    questionSchema
  } = questions.useQuestion()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(questionSchema)
  })
  const onSubmit = (formData: FormData) => {
    createQuestion({
      variables: {
        Titulo: formData.Titulo,
        Descricao: formData.Descricao
      }
    })
      .then(() => {
        questionsRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        notification(formData.Titulo + ' cadastrado com sucesso', 'success')
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
          fieldName="Titulo"
          register={register}
          title="Título"
          error={errors.Titulo}
          data-testid="editTitulo"
        />
        <form.Input
          fieldName="Descricao"
          register={register}
          title="Descrição"
          error={errors.Descricao}
          data-testid="editDescricao"
        />
      </div>
      <common.Separator />
      <buttons.PrimaryButton
        title="Enviar"
        disabled={createQuestionLoading}
        loading={createQuestionLoading}
      />
    </form>
  )
}
