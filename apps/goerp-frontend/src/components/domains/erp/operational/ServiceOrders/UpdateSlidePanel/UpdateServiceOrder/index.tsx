import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

import * as common from '@/common'
import * as buttons from '@/common/Buttons'
import * as form from '@/common/Form'
import * as serviceOrders from '@/domains/erp/operational/ServiceOrders'

import { notification } from 'utils/notification'
import { showError } from 'utils/showError'
import { useEffect } from 'react'
import { datetimeFormat } from 'utils/formaters'

type FormData = {
  Agendamento: Date
  Colaborador_Id: {
    key: string
    title: string
  }
}

export default function CreateServiceOrder() {
  const {
    updateServiceOrdersLoading,
    updateServiceOrders,
    serviceOrderData,
    serviceOrderRefetch,
    serviceOrdersSchema,
    setSlidePanelState,
    serviceOrderActivitiesRefetch,
    collaboratorsData
  } = serviceOrders.useUpdate()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control
  } = useForm({ resolver: yupResolver(serviceOrdersSchema) })
  function onSubmit(formData: FormData) {
    updateServiceOrders({
      variables: {
        Agendamento: formData.Agendamento,
        Colaborador_Id: formData.Colaborador_Id.key
      }
    })
      .then(() => {
        serviceOrderRefetch()
        serviceOrderActivitiesRefetch()
        setSlidePanelState({
          open: false,
          type: 'schedule'
        })
        notification('Ordem de serviço agendada com sucesso', 'success')
      })
      .catch((err) => {
        showError(err)
      })
  }

  useEffect(() => {
    if (serviceOrderData) {
      reset({
        Agendamento:
          serviceOrderData.Agendamentos.length > 0
            ? datetimeFormat(serviceOrderData.Agendamentos[0].Agendamento)
            : undefined
      })
    }
  }, [reset, serviceOrderData])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <form.Input
          fieldName="Agendamento"
          register={register}
          title="Data de agendamento"
          error={errors.Agendamento}
          type="datetime-local"
        />
        <Controller
          control={control}
          name="Colaborador_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <form.Select
                itens={
                  collaboratorsData
                    ? collaboratorsData.map((item) => {
                        return {
                          key: item.Id,
                          title: item.Pessoa.Nome
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Colaborador_Id}
                label="Colaborador"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <buttons.PrimaryButton
        title="Enviar"
        disabled={updateServiceOrdersLoading}
        loading={updateServiceOrdersLoading}
      />
    </form>
  )
}
