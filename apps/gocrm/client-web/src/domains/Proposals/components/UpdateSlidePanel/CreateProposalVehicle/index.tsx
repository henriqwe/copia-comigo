import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'

import * as utils from '@comigo/utils'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

type SelectItem = {
  key: {
    Id: string
    Apelido?: string
    Placa?: string
  }
  title: string
}

type FormData = {
  Veiculo: SelectItem
}

export function CreateProposalVehicle() {
  const [PossuiGNV, setPossuiGNV] = useState(false)
  const {
    vehiclesData,
    setSlidePanelState,
    insertProposalVehicle,
    insertProposalVehicleLoading,
    proposalRefetch,
    proposalData,
    createVehicleSchema
  } = proposals.useUpdate()
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({ resolver: yupResolver(createVehicleSchema) })
  const vehiclesIds = proposalData.Veiculos.map((vehicle) => vehicle.Veiculo_Id)

  const onSubmit = async (formData: FormData) => {
    try {
      await insertProposalVehicle({
        variables: {
          Veiculo_Id: formData.Veiculo.key.Id,
          PossuiGNV
        }
      })
      proposalRefetch()
      setSlidePanelState({
        type: 'proposalVehicle',
        open: false
      })
      utils.notification('Veículo criado com sucesso', 'success')
    } catch (err) {
      utils.showError(err)
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
          name={'Veiculo'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  vehiclesData
                    ? vehiclesData
                        .filter(
                          (vehicle) =>
                            !vehiclesIds.includes(vehicle.Id) &&
                            vehicle.VeiculosAtivos.filter(
                              (activeVehicle) =>
                                activeVehicle.Situacao_Id === 'ativo'
                            ).length === 0
                        )
                        .map((vehicle) => {
                          return {
                            key: vehicle,
                            title:
                              (vehicle.Apelido ? vehicle.Apelido + ' - ' : '') +
                              (vehicle.Placa
                                ? vehicle.Placa
                                : vehicle.NumeroDoChassi)
                          }
                        })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Veiculo}
                label="Veículo para a proposta"
              />
              <common.OpenModalLink
                onClick={() => {
                  setSlidePanelState({
                    open: true,
                    type: 'createVehicle'
                  })
                }}
              >
                Cadastrar veículo
              </common.OpenModalLink>
            </div>
          )}
        />
        <div className="flex items-center justify-between w-full">
          <p>Possui GNV?</p>
          <common.form.Switch
            onChange={() => setPossuiGNV(!PossuiGNV)}
            value={PossuiGNV}
          />
        </div>
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Adicionar a proposta"
        disabled={insertProposalVehicleLoading}
        loading={insertProposalVehicleLoading}
      />
    </form>
  )
}
