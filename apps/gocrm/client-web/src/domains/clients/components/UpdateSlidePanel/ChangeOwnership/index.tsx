import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
import * as utils from '@comigo/utils'
import * as api from '&crm/domains/clients/api'
import * as activeVehicles from '&crm/domains/clients'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function ChangeOwnership() {
  const router = useRouter()
  const [vehiclesGroup, setVehiclesGroup] = useState([1])
  const [lastNumber, setlastNumber] = useState(0)
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)
  const { clientData, userAndTicketData, slidePanelState, selectedCategory } =
    activeVehicles.useUpdate()
  const { clientsData } = activeVehicles.useClient()
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm()

  async function onSubmit(formData: any) {
    try {
      setLoading(true)
      if (slidePanelState.type === 'ownership') {
        await api.changeOwnership({
          formData,
          router,
          userAndTicketData,
          vehiclesGroup
        })
      }

      if (slidePanelState.type === 'ownershipSingle') {
        await api.changeOwnershipSingle({
          formData,
          router,
          userAndTicketData,
          clientData,
          selectedCategory,
        })
      }

      setLoading(false)
    } catch (err) {
      setLoading(false)
      utils.showError(err)
    }
  }

  useEffect(() => {
    if (vehiclesGroup[vehiclesGroup.length - 1] > lastNumber) {
      setlastNumber(vehiclesGroup[vehiclesGroup.length - 1])
    }
  }, [vehiclesGroup])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          control={control}
          name={'Cliente'}
          render={({ field: { onChange, value } }) => (
            <div className="col-span-4">
              <common.form.Select
                itens={
                  clientsData
                    ? clientsData
                        .filter((client) => client.Id !== router.query.id)
                        .map((client) => {
                          return {
                            key: client.Id,
                            title: client.Pessoa?.Nome as string
                          }
                        })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Cliente}
                label="Novo cliente"
              />
            </div>
          )}
        />
        {slidePanelState.type === 'ownership' &&
          vehiclesGroup.map(
            (vehicleGroupPosition, index) =>
              vehicleGroupPosition !== 0 && (
                <div key={index}>
                  {index > 0 && <common.Separator />}
                  <div className="grid grid-cols-9 gap-2">
                    <Controller
                      control={control}
                      name={'Veiculo' + vehicleGroupPosition}
                      render={({ field: { onChange, value } }) => (
                        <div
                          className={`${
                            index === 0 ? 'col-span-9' : 'col-span-8'
                          }`}
                        >
                          <common.form.Select
                            itens={
                              clientData
                                ? clientData.VeiculosAtivos.filter(
                                    (vehicle) =>
                                      vehicle.Situacao.Valor === 'ativo'
                                  ).map((activeVehicle) => {
                                    return {
                                      key: activeVehicle,
                                      title: `${
                                        activeVehicle.Veiculo.Placa
                                          ? activeVehicle.Veiculo.Placa
                                          : activeVehicle.Veiculo.NumeroDoChassi
                                      }${
                                        activeVehicle.Veiculo.Apelido
                                          ? ' - ' +
                                            activeVehicle.Veiculo.Apelido
                                          : ''
                                      }`
                                    }
                                  })
                                : []
                            }
                            value={value}
                            onChange={onChange}
                            error={errors.Veiculo}
                            label="Veiculo que vai ser movido"
                          />
                        </div>
                      )}
                    />

                    {vehicleGroupPosition !== 1 && (
                      <common.buttons.DeleteButton
                        onClick={() => {
                          vehiclesGroup[index] = 0
                          setReload(!reload)
                        }}
                      />
                    )}
                  </div>
                </div>
              )
          )}
        {slidePanelState.type === 'ownership' && (
          <common.AddForm
            array={vehiclesGroup}
            setArray={setVehiclesGroup}
            lastNumber={lastNumber}
          >
            Adicionar veiculo
          </common.AddForm>
        )}
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
