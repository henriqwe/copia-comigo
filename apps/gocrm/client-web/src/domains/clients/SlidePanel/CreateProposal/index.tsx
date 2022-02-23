import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
import * as client from '&crm/domains/clients'
import { v4 as uuid } from 'uuid'

import * as utils from '@comigo/utils'
import { useRouter } from 'next/router'
import routes from '&crm/domains/routes'

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

export function CreateProposal() {
  const router = useRouter()
  const {
    vehiclesData,
    setSlidePanelState,
    createProposal,
    createProposalLoading,
    userAndTicketData,
    clientData
  } = client.useUpdate()
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm()
  const vehiclesIds = clientData.VeiculosAtivos.map(
    (vehicle) => vehicle.Veiculo.Id
  )

  const onSubmit = async (formData: FormData) => {
    try {
      const proposalUUID = uuid()
      await createProposal({
        variables: {
          Id: proposalUUID,
          Lead_Id: null,
          Ticket_Id: null,
          Usuario_Id: userAndTicketData.autenticacao_Usuarios[0].Id,
          Cliente_Id: router.query.id,
          veiculosData: [
            {
              Veiculo_Id: formData.Veiculo.key.Id
            }
          ]
        }
      })
      utils.notification('Veículo criado com sucesso', 'success')
      router.push(routes.propostas + '/' + proposalUUID)
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
                        .filter((vehicle) => !vehiclesIds.includes(vehicle.Id))
                        .map((vehicle) => {
                          return {
                            key: vehicle,
                            title:
                              (vehicle.Placa !== null ||
                              vehicle.Placa !== undefined
                                ? vehicle.Placa
                                : vehicle.NumeroDoChassi) +
                              (vehicle.Apelido !== '' ||
                              vehicle.Apelido !== undefined ||
                              vehicle.Apelido !== null
                                ? ' - ' + vehicle.Apelido
                                : '')
                          }
                        })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Colaborador_Id}
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
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createProposalLoading}
        loading={createProposalLoading}
      />
    </form>
  )
}
