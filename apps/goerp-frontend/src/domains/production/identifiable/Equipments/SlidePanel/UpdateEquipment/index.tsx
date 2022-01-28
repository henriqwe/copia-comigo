import { useForm, Controller } from 'react-hook-form'

import * as common from '@comigo/ui-common'


import * as equipments from '&erp/domains/production/identifiable/Equipments'

import { useEffect } from 'react'
import { GraphQLTypes } from '&erp/graphql/generated/zeus'
import { yupResolver } from '@hookform/resolvers/yup'
import * as utils from '@comigo/utils'

export function Update() {
  const {
    updateEquipmentLoading,
    updateEquipment,
    setSlidePanelState,
    slidePanelState,
    equipmentRefetch,
    equipmentSchema
  } = equipments.useEquipment()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue
  } = useForm({
    resolver: yupResolver(equipmentSchema)
  })
  const onSubmit = (formData: GraphQLTypes['producao_Equipamentos']) => {
    formData.Identificador = Number(
      formData.Identificador.toString().slice(5, 14)
    )
    updateEquipment({
      variables: {
        Id: slidePanelState.data?.Id,
        Imei: formData.Imei,
        Identificador: formData.Identificador
      }
    })
      .then(() => {
        equipmentRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        utils.notification(formData.Imei + ' editado com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  useEffect(() => {
    reset({
      Imei: slidePanelState.data?.Imei || '',
      Identificador: slidePanelState.data?.Identificador || ''
    })
  }, [slidePanelState.data, reset])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="editForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          name="Imei"
          control={control}
          render={({ field: { onChange, value } }) => (
            <common.form.Input
              fieldName="Imei"
              onChange={(e) => {
                if (e.target.value.length > 5) {
                  const identificador = e.target.value.trim().slice(5, 14)
                  setValue('Identificador', identificador)
                } else {
                  setValue('Identificador', null)
                }
                if (e.target.value.length < 16) {
                  onChange(e.target.value.trim())
                }
              }}
              value={value}
              title="Imei"
              error={errors.CodigoIdentificador}
            />
          )}
        />
        <common.form.Input
          fieldName="Identificador"
          register={register}
          title="Identificador"
          disabled
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Editar"
        disabled={updateEquipmentLoading}
        loading={updateEquipmentLoading}
      />
    </form>
  )
}
