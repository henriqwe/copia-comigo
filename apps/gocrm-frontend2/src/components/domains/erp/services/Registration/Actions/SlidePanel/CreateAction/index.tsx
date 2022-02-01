import { Controller, useForm } from 'react-hook-form'

import * as common from '&test/components/common'
import * as buttons from '&test/components/common/Buttons'
import * as form from '&test/components/common/Form'
import * as actions from '&test/components/domains/erp/services/Registration/Actions'
import * as flowStages from '&test/components/domains/erp/services/Registration/Flows/Stage'
import rotasArray from '&test/components/domains/routesArray'

import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

type FormData = {
  Url: { key: string; title: string }
  Titulo: string
  Etapas_Id: { key: string; title: string }[]
}

export default function CreateAction() {
  const {
    createActionLoading,
    createAction,
    setSlidePanelState,
    actionsRefetch,
    actionSchema
  } = actions.useAction()
  const { stagesData } = flowStages.useStage()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(actionSchema)
  })
  const onSubmit = (formData: FormData) => {
    createAction({
      variables: {
        Titulo: formData.Titulo,
        Url: formData.Url.key,
        Etapas_Id: formData.Etapas_Id
      }
    })
      .then(() => {
        actionsRefetch()
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
        />
        <Controller
          control={control}
          name={'Url'}
          render={({ field: { onChange, value } }) => (
            <div>
              <form.Select
                itens={rotasArray.map((route) => {
                  return { key: route, title: route }
                })}
                value={value}
                onChange={onChange}
                error={errors.Url}
                label="Url"
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="Etapas_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <form.MultiSelect
                itens={
                  stagesData
                    ? stagesData.map((stage) => {
                      return {
                        key: stage.Id,
                        title: stage.Nome
                      }
                    })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Etapas_Id}
                label="Etapas"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <buttons.PrimaryButton
        title="Enviar"
        disabled={createActionLoading}
        loading={createActionLoading}
      />
    </form>
  )
}
