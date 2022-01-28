import { Controller, useForm } from 'react-hook-form'

import * as common from '@/common'
import * as buttons from '@/common/Buttons'
import * as form from '@/common/Form'
import * as services from '&crm/domains/erp/commercial/Services'

import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'utils/notification'
import { showError } from 'utils/showError'
import { useState } from 'react'

type FormData = {
  Nome: string
  Categorias: {
    key: string
    title: string
  }[]
  Tipo: {
    key: string
    title: string
  }
}

export default function CreateService() {
  const [geraOs, setGeraOS] = useState(false)
  const {
    createServiceLoading,
    createService,
    setSlidePanelState,
    servicesRefetch,
    serviceSchema,
    vehicleCategoriesData,
    serviceTypesData
  } = services.useService()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(serviceSchema)
  })
  const onSubmit = (formData: FormData) => {
    createService({
      variables: {
        Nome: formData.Nome,
        Categorias: formData.Categorias,
        Tipo_Id: formData.Tipo.key,
        GeraOS: geraOs
      }
    })
      .then(() => {
        servicesRefetch()
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
          name="Categorias"
          render={({ field: { onChange, value } }) => (
            <div>
              <form.MultiSelect
                itens={
                  vehicleCategoriesData
                    ? vehicleCategoriesData.map((vehicleCategory) => {
                      return {
                        key: vehicleCategory.Id,
                        title: vehicleCategory.Nome
                      }
                    })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Categorias}
                label="Categorias"
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="Tipo"
          render={({ field: { onChange, value } }) => (
            <div>
              <form.Select
                itens={
                  serviceTypesData
                    ? serviceTypesData.map((serviceType) => {
                      return {
                        key: serviceType.Valor,
                        title: serviceType.Comentario
                      }
                    })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Tipo}
                label="Tipo"
              />
            </div>
          )}
        />

        <div className="flex items-center justify-between">
          <p>Esse serviço gera uma OS?</p>
          <form.Switch onChange={() => setGeraOS(!geraOs)} value={geraOs} />
        </div>
      </div>
      <common.Separator />
      <buttons.PrimaryButton
        title="Enviar"
        disabled={createServiceLoading}
        loading={createServiceLoading}
      />
    </form>
  )
}
