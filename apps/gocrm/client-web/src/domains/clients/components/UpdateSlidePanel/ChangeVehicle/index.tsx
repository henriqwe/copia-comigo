import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'

import * as activeVehicles from '&crm/domains/clients'

import * as utils from '@comigo/utils'
import * as api from '&crm/domains/clients/api'

import { v4 as uuid } from 'uuid'

import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'

export function ChangeVehicle() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { clientData, userAndTicketData, changeVehicleSchema, vehiclesData } =
    activeVehicles.useUpdate()
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(changeVehicleSchema)
  })
  const onSubmit = async (formData: any) => {
    try {
      setLoading(true)
      await api.changeVehicle({
        formData,
        router,
        userAndTicketData
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      utils.showError(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          control={control}
          name={'Veiculo1'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  clientData
                    ? clientData.VeiculosAtivos.filter(
                        (vehicle) => vehicle.Situacao.Valor === 'ativo'
                      ).map((activeVehicle) => {
                        return {
                          key: activeVehicle,
                          title: `${
                            activeVehicle.Veiculo.Placa
                              ? activeVehicle.Veiculo.Placa
                              : activeVehicle.Veiculo.NumeroDoChassi
                          }${
                            activeVehicle.Veiculo.Apelido
                              ? ' - ' + activeVehicle.Veiculo.Apelido
                              : ''
                          }`
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Veiculo}
                label="Veiculo que vai ser inativado"
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name={'Veiculo2'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  vehiclesData
                    ? vehiclesData.map((activeVehicle) => {
                        return {
                          key: activeVehicle.Id,
                          title: `${
                            activeVehicle.Placa
                              ? activeVehicle.Placa
                              : activeVehicle.NumeroDoChassi
                          }${
                            activeVehicle.Apelido
                              ? ' - ' + activeVehicle.Apelido
                              : ''
                          }`
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Veiculo}
                label="Veiculo que vai receber"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={loading}
        loading={loading}
      />
    </form>
  )
}
