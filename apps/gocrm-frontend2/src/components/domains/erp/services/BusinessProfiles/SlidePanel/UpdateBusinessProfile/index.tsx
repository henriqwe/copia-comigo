import { useForm } from 'react-hook-form'

import * as common from '&test/components/common'
import * as buttons from '&test/components/common/Buttons'
import * as form from '&test/components/common/Form'
import * as businessProfiles from '&test/components/domains/erp/services/BusinessProfiles'

import { useEffect, useState } from 'react'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

type QuestionsAndAnswers = {
  Id: string
  Pergunta: { Id: string; Titulo: string; Descricao: string }
  Resposta: string
}

export default function UpdateBusinessProfile() {
  const [questionsAndAnswer, setQuestionsAndAnswer] =
    useState<QuestionsAndAnswers[]>()
  const {
    updateBusinessProfileLoading,
    updateBusinessProfile,
    setSlidePanelState,
    slidePanelState,
    businessProfilesRefetch,
    getQuestionAndAnswers
  } = businessProfiles.useBusinessProfile()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (formData: any) => {
    try {
      const validation = questionsAndAnswer?.map((_, index) => {
        if (!formData['Resposta' + index]) {
          return null
        }
      })

      if (validation?.includes(null)) {
        throw new Error('Preencha todos os campos para continuar')
      }

      questionsAndAnswer?.map(async (question, index) => {
        await updateBusinessProfile({
          variables: {
            Id: question.Id,
            Resposta: formData['Resposta' + index]
          }
        })
      })
      businessProfilesRefetch()
      setSlidePanelState((oldState) => {
        return { ...oldState, open: false }
      })
      notification(
        // slidePanelState.data?.Pergunta.Titulo + ' editado com sucesso',
        'pergunta',
        'success'
      )
    } catch (err: any) {
      showError(err)
    }
  }

  useEffect(() => {
    getQuestionAndAnswers(
      slidePanelState.data?.Lead.Id,
      '3d17b0ed-4d27-4c18-96dd-ee5ea8c4ef1e'
      // slidePanelState.data?.GrupoDePergunta.Id
    ).then((response) => {
      setQuestionsAndAnswer(response)
    })
  }, [])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="editForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.TitleWithSubTitleAtTheTop
          title={
            (slidePanelState.data?.Lead.Nome as string) +
            ' - ' +
            ' teste para não bugar'
            // slidePanelState.data?.GrupoDePergunta.Nome
          }
          subtitle="Lead e Grupo"
        />
        <common.Separator />
        {questionsAndAnswer?.map((question, index) => (
          <>
            <h2 className="text-lg">{question.Pergunta.Titulo}</h2>
            <p>{question.Pergunta.Descricao}</p>

            <form.Input
              fieldName={'Resposta' + index}
              defaultValue={question.Resposta}
              title="Resposta"
              register={register}
              error={errors.Resposta}
            />

            <common.Separator />
          </>
        ))}
      </div>
      <buttons.PrimaryButton
        title="Editar"
        disabled={updateBusinessProfileLoading}
        loading={updateBusinessProfileLoading}
      />
    </form>
  )
}
