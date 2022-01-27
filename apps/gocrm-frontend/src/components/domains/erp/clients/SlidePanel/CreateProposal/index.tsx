import { Controller, useForm } from 'react-hook-form'

import * as common from '@/common'
import * as buttons from '@/common/Buttons'
import * as form from '@/common/Form'
import * as activeVehicles from '@/domains/erp/clients'
import * as tickets from '@/domains/erp/services/Tickets'
import * as proposals from '@/domains/erp/commercial/Proposals'

import { notification } from 'utils/notification'
import { useRouter } from 'next/router'
import rotas from '@/domains/routes'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'

export default function ChangeVehicle() {
  const [lead, setLead] = useState<{ Nome: string }>()
  const [cliente, setCliente] = useState<{ Pessoa: { Nome: string } }>()
  const [proposalTicketId, setProposalTicketId] = useState<string[]>([])
  const router = useRouter()
  const { createVehicleSchema } = activeVehicles.useUpdate()
  const { ticketsData, usersData, getLeadById, getClienteById } =
    tickets.useTicket()
  const { getProposal } = proposals.useCreate()
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm({
    resolver: yupResolver(createVehicleSchema)
  })
  const usersId = usersData?.map((user) => user.Id)

  const onSubmit = (formData: {
    Ticket_Id: { key: string; title: string }
  }) => {
    router.push({
      pathname: rotas.erp.comercial.propostas.cadastrar,
      query: {
        Ticket: JSON.stringify(formData.Ticket_Id.key)
      }
    })
    notification('Proposta do novo veiculo criada com sucesso', 'success')
  }

  useEffect(() => {
    async function getValues() {
      if (watch('Ticket_Id').key.Lead_Id) {
        await getLeadById(watch('Ticket_Id').key.Lead_Id).then((lead) => {
          setLead(lead)
        })
      }

      if (watch('Ticket_Id').key.Cliente_Id) {
        await getClienteById(watch('Ticket_Id').key.Cliente_Id).then(
          (client) => {
            setCliente(client)
          }
        )
      }
    }
    if (watch('Ticket_Id')) {
      getValues()
    }
  }, [watch('Ticket_Id')])

  useEffect(() => {
    getProposal().then((tickets) => {
      let ticketId: string[] = []
      tickets.map((ticket) => {
        ticketId = [...ticketId, ticket.Ticket_Id]
      })
      setProposalTicketId(ticketId)
    })
  }, [getProposal])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          control={control}
          name={'Ticket_Id'}
          render={({ field: { onChange, value } }) => (
            <div>
              <form.Select
                itens={
                  ticketsData
                    ? ticketsData
                      .filter(
                        (ticket) =>
                          usersId?.includes(ticket.Usuario_Id) &&
                          !proposalTicketId.includes(ticket.Id)
                      )
                      .map((ticket) => {
                        return {
                          key: ticket,
                          title:
                            'Código do ticket: ' + ticket.CodigoReferencia
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Veiculo}
                label="Ticket para a proposta"
              />
            </div>
          )}
        />
        {watch('Ticket_Id') ? (
          watch('Ticket_Id').key.Lead_Id ? (
            <common.TitleWithSubTitleAtTheTop
              title={lead?.Nome as string}
              subtitle="Lead"
            />
          ) : (
            <common.TitleWithSubTitleAtTheTop
              title={cliente?.Pessoa.Nome as string}
              subtitle="Cliente"
            />
          )
        ) : null}
      </div>
      <common.Separator />
      <buttons.PrimaryButton title="Enviar" />
    </form>
  )
}
