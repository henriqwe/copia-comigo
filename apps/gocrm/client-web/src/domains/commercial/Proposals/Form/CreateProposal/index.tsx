import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as utils from '@comigo/utils';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import rotas from '&crm/domains/routes';

import * as common from '@comigo/ui-common';

import * as blocks from '@comigo/ui-blocks';
import * as proposals from '&crm/domains/commercial/Proposals';
import * as tickets from '&crm/domains/services/Tickets';

type CreateProposalProps = {
  Ticket: {
    Id: string;
    CodigoReferencia: number;
  } | null;
};

const CreateProposal = ({ Ticket }: CreateProposalProps) => {
  const [lead, setLead] = useState<{ Nome: string }>();
  const [cliente, setCliente] = useState<{ Pessoa: { Nome: string } }>();
  const [proposalTicketId, setProposalTicketId] = useState<string[]>([]);
  const [vehiclesGroup, setVehiclesGroup] = useState([
    {
      Id: null,
      content: { title: 'Veículo ', subtitle: 'Sem vínculo' },
      position: 1,
    },
  ]);
  const [vehicleSelected, setVehicleSelected] = useState({
    Id: null,
    content: { title: 'Veículo ', subtitle: 'Sem vínculo' },
    position: 1,
  });
  const router = useRouter();
  const {
    createProposal,
    proposalSchema,
    paymentTypesData,
    recurrenceTypesData,
    usersData,
    getProposal,
  } = proposals.useCreate();
  const { ticketsData, getClienteById, getLeadById } = tickets.useTicket();
  const usersId = usersData?.map((user) => user.Id);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(proposalSchema),
  });

  async function onSubmit(data: any) {
    try {
      await createProposal({
        variables: {
          Lead_Id: data.Ticket_Id.key.Lead_Id || null,
          Cliente_Id: data.Ticket_Id.key.Cliente_Id || null,
          Ticket_Id: data.Ticket_Id.key.Id,
          TipoDePagamento_Id: paymentTypesData?.[0].Valor,
          TipoDeRecorrencia_Id: recurrenceTypesData?.[0].Valor,
          Usuario_Id: data.Ticket_Id.key.Usuario_Id,
          planosData: data.Veiculo1.planos,
          produtosData: data.Veiculo1.produtos,
          servicosData: data.Veiculo1.servicos,
          combosData: data.Veiculo1.combos,
          oportunidadesData: data.Veiculo1.oportunidades,
        },
      }).then((value) => {
        router.push(
          rotas.comercial.propostas.index +
            '/' +
            value?.data.insert_propostas_Propostas_one.Id
        );
        utils.notification('Proposta criada com sucesso', 'success');
      });
    } catch (err: any) {
      utils.showError(err);
    }
  }

  useEffect(() => {
    async function getValues() {
      if (watch('Ticket_Id').key.Lead_Id) {
        await getLeadById(watch('Ticket_Id').key.Lead_Id).then((lead) => {
          setLead(lead);
        });
      }

      if (watch('Ticket_Id').key.Cliente_Id) {
        await getClienteById(watch('Ticket_Id').key.Cliente_Id).then(
          (client) => {
            setCliente(client);
          }
        );
      }
    }
    if (watch('Ticket_Id')) {
      getValues();
    }
  }, [watch('Ticket_Id')]);

  useEffect(() => {
    getProposal().then((tickets) => {
      let ticketId: string[] = [];
      tickets.map((ticket) => {
        ticketId = [...ticketId, ticket.Ticket_Id];
      });
      setProposalTicketId(ticketId);
    });
  }, []);

  return (
    <main className="col-span-12">
      <form>
        <common.Card>
          <common.GenericTitle
            title="Dados da Proposta"
            subtitle="Ticket, cliente ou lead"
            className="px-6"
          />

          <common.Separator />
          <common.form.FormLine grid={3} position={1}>
            <Controller
              control={control}
              name={'Ticket_Id'}
              defaultValue={
                Ticket
                  ? {
                      key: Ticket,
                      title: 'Código do ticket: ' + Ticket.CodigoReferencia,
                    }
                  : undefined
              }
              render={({ field: { onChange, value } }) => (
                <div>
                  <common.form.Select
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
                                  'Código do ticket: ' +
                                  ticket.CodigoReferencia,
                              };
                            })
                        : []
                    }
                    value={value}
                    onChange={onChange}
                    error={errors.Ticket_Id}
                    label="Ticket"
                    disabled={Ticket !== null}
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
          </common.form.FormLine>
        </common.Card>

        <div className="grid grid-cols-6 mt-4">
          <blocks.SideBarTabs
            array={vehiclesGroup}
            setArray={setVehiclesGroup}
            onChange={setVehicleSelected}
          />

          {vehiclesGroup.map((vehicleGroup, index) => {
            if (vehicleSelected?.position === vehicleGroup.position) {
              return (
                <Controller
                  control={control}
                  key={index}
                  name={'Veiculo' + vehicleGroup.position}
                  render={({ field: { onChange } }) => (
                    <div className="col-span-5">
                      <proposals.CreateVehicle
                        onChange={onChange}
                        parentSubmit={handleSubmit(onSubmit)}
                        vehicleName={'Veiculo ' + vehicleGroup.position}
                      />
                    </div>
                  )}
                />
              );
            }
          })}
        </div>
      </form>
    </main>
  );
};

export default CreateProposal;
