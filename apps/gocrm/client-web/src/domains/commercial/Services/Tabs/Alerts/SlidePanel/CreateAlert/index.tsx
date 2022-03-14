import { useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'

import * as alerts from '&crm/domains/commercial/Services/Tabs/Alerts'

import { yupResolver } from '@hookform/resolvers/yup'
import * as utils from '@comigo/utils'

type FormData = {
  Mensagem: string
}

export function Create() {
  const {
    createAlertLoading,
    createAlert,
    setSlidePanelState,
    alertsRefetch,
    alertschema
  } = alerts.useAlerts()
  const { handleSubmit, register } = useForm({
    resolver: yupResolver(alertschema)
  })
  const onSubmit = (formData: FormData) => {
    createAlert({
      variables: {
        Mensagem: formData.Mensagem
      }
    })
      .then(() => {
        alertsRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        utils.notification(
          'Regra e termo de uso cadastrado com sucesso',
          'success'
        )
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.Input
          fieldName="Mensagem"
          register={register}
          title="Mensagem"
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createAlertLoading}
        loading={createAlertLoading}
      />
    </form>
  )
}
