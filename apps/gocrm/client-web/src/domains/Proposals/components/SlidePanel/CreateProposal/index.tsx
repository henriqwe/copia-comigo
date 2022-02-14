import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'

import * as tickets from '&crm/domains/services/Tickets'
import * as leads from '&crm/domains/services/Leads'
import * as clients from '&crm/domains/identities/Clients'
import * as proposals from '&crm/domains/Proposals'

import * as utils from '@comigo/utils'
import { useRouter } from 'next/router'
import routes from '&crm/domains/routes'

type SelectItem = {
  key: string
  title: string
}

type FormData = {
  Ticket_Id: {
    key: { Id: string }
    title: string
  }
  Lead_Id: SelectItem
  Cliente_Id: SelectItem
  Colaborador_Id: SelectItem
  Vehicles: number
}

export function CreateProposal() {
  const router = useRouter()
  const { ticketsData, usersData } = tickets.useTicket()
  const { leadsData } = leads.useLead()
  const { clientsData } = clients.useList()
  const { insertProposalLoading, insertProposal } = proposals.useList()
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm()
  const usersId = usersData?.map((user) => user.Id)

  const onSubmit = async (formData: FormData) => {
    if (watch('Lead_Id') === undefined && watch('Cliente_Id') === undefined) {
      return utils.notification('Selecione a lead ou um cliente', 'error')
    }
    await insertProposal({
      variables: {
        Lead_Id: formData.Lead_Id ? formData.Lead_Id.key : null,
        Ticket_Id: formData.Ticket_Id ? formData.Ticket_Id.key.Id : null,
        Usuario_Id: formData.Colaborador_Id.key,
        Situacao_Id: 'criado',
        Cliente_Id: formData.Cliente_Id ? formData.Cliente_Id.key : null
      }
    }).then((response) => {
      router.push(
        routes.propostas +
          '/' +
          response.data.insert_propostas_Propostas_one.Id
      )
      utils.notification('Proposta criada com sucesso', 'success')
    })
  }

  // useEffect(() => {
  //   getProposal().then((tickets) => {
  //     let ticketId: string[] = [];
  //     tickets.map((ticket) => {
  //       ticketId = [...ticketId, ticket.Ticket_Id];
  //     });
  //     setProposalTicketId(ticketId);
  //   });
  // }, [getProposal]);

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
              <common.form.Select
                itens={
                  ticketsData
                    ? ticketsData
                        // .filter(
                        //   (ticket) =>
                        //     usersId?.includes(ticket.Usuario_Id)
                        // )
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
                error={errors.Ticket_Id}
                label="Ticket para a proposta"
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name={'Lead_Id'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  leadsData
                    ? leadsData.map((lead) => {
                        return {
                          key: lead.Id,
                          title: lead.Nome
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Lead_Id}
                label="Lead para a proposta"
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name={'Cliente_Id'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  clientsData
                    ? clientsData.map((client) => {
                        return {
                          key: client.Id,
                          title: client.Pessoa.Nome
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Cliente_Id}
                label="Cliente para a proposta"
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name={'Colaborador_Id'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  usersData
                    ? usersData.map((user) => {
                        return {
                          key: user.Id,
                          title: user.Colaborador.Pessoa.Nome
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Colaborador_Id}
                label="Colaborador para a proposta"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        loading={insertProposalLoading}
        disabled={insertProposalLoading}
      />
    </form>
  )
}
