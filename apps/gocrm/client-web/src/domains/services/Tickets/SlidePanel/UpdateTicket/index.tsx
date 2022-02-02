import { Controller, useForm } from 'react-hook-form';

import * as common from '@comigo/ui-common';

import * as flows from '&crm/domains/services/Registration/Flows';
import * as tickets from '&crm/domains/services/Tickets';

import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as utils from '@comigo/utils';

import rotas from '&crm/domains/routes';
import { useRouter } from 'next/router';

type FormData = {
  Id: string;
  Tipo_Id: SelectItem;
  Etapa_Id: SelectItem;
  Fluxo_Id: SelectItem;
  Usuario_Id: SelectItem;
};

type SelectItem = {
  key: string;
  title: string;
};

export default function UpdateTicket() {
  const router = useRouter();
  const [flowStages, setFlowStages] = useState<{ Id: string; Nome: string }[]>(
    []
  );
  const [lead, setLead] = useState<{ Nome: string }>();
  const [cliente, setCliente] = useState<{ Pessoa: { Nome: string } }>();
  const {
    updateTicketLoading,
    updateTicket,
    slidePanelState,
    ticketsTypeData,
    setSlidePanelState,
    ticketsRefetch,
    ticketSchema,
    usersData,
    getFlowStageByFlow_Id,
    getUserById,
    getLeadById,
    getClienteById,
  } = tickets.useTicket();
  const { flowsData } = flows.useFlow();
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    watch,
  } = useForm({
    resolver: yupResolver(ticketSchema(undefined)),
  });
  const onSubmit = (formData: FormData) => {
    updateTicket({
      variables: {
        Id: slidePanelState.data?.Id,
        Fluxo_Id: formData.Fluxo_Id.key,
        Tipo_Id: formData.Tipo_Id.key,
        Etapa_Id: formData.Etapa_Id.key,
        Usuario_Id: formData.Usuario_Id.key,
      },
    })
      .then(() => {
        ticketsRefetch();
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false };
        });
        utils.notification('Ticket editado com sucesso', 'success');
      })
      .catch((err) => {
        utils.showError(err);
      });
  };

  useEffect(() => {
    if (watch('Fluxo_Id') !== undefined) {
      getFlowStageByFlow_Id(watch('Fluxo_Id').key).then((flowStagesData) => {
        setFlowStages(flowStagesData);
      });
    }
  }, [watch('Fluxo_Id')]);

  useEffect(() => {
    async function setValues() {
      const user = await getUserById(slidePanelState.data?.Usuario_Id);

      setLead(await getLeadById(slidePanelState.data?.Lead_Id));
      if (slidePanelState.data?.Cliente_Id) {
        setCliente(await getClienteById(slidePanelState.data?.Cliente_Id));
      }

      reset({
        Etapa_Id: {
          key: slidePanelState.data?.Etapa.Id || '',
          title: slidePanelState.data?.Etapa.Posicao || '',
        },
        Tipo_Id: {
          key: slidePanelState.data?.Tipo.Valor || '',
          title: slidePanelState.data?.Tipo.Comentario || '',
        },
        Fluxo_Id: {
          key: slidePanelState.data?.Fluxo.Id,
          title: slidePanelState.data?.Fluxo.Nome || '',
        },
        Usuario_Id: {
          key: user?.Id || '',
          title: user?.Colaborador?.Pessoa.Nome || '',
        },
      });
    }
    setValues();
  }, [slidePanelState.data, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="editForm"
      className="flex flex-col items-end"
    >
      <div className="w-full">
        {lead ? (
          <common.TitleWithSubTitleAtTheTop title={lead.Nome} subtitle="Lead" />
        ) : null}

        {cliente ? (
          <common.TitleWithSubTitleAtTheTop
            title={cliente.Pessoa.Nome}
            subtitle="Cliente"
          />
        ) : null}
      </div>
      <common.Separator />
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          control={control}
          name="Fluxo_Id"
          render={({ field: { onChange, value } }) => (
            <div className="col-span-2">
              <common.form.Select
                itens={
                  flowsData
                    ? flowsData.map((item) => {
                        return {
                          key: item.Id,
                          title: item.Nome,
                        };
                      })
                    : []
                }
                value={value}
                onChange={(e) => {
                  reset({
                    Etapa_Id: {
                      key: '',
                      title: '',
                    },
                    Tipo_Id: {
                      key: watch('Tipo_Id').key || '',
                      title: watch('Tipo_Id').title || '',
                    },
                    Fluxo_Id: {
                      key: watch('Fluxo_Id').key || '',
                      title: watch('Fluxo_Id').title || '',
                    },
                  });
                  onChange(e);
                }}
                error={errors.Fluxo_Id}
                label="Fluxo"
              />
              <common.OpenModalLink
                onClick={() =>
                  router.push(rotas.atendimento.cadastros.fluxos.index)
                }
              >
                Cadastrar Fluxo
              </common.OpenModalLink>
            </div>
          )}
        />
        <Controller
          control={control}
          name="Etapa_Id"
          render={({ field: { onChange, value } }) => (
            <div className="col-span-2">
              <common.form.Select
                itens={
                  flowStages
                    ? flowStages.map((item) => {
                        return {
                          key: item.Id,
                          title: item.Nome,
                        };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Etapa_Id}
                label="Etapa"
              />
              <common.OpenModalLink
                onClick={() =>
                  router.push(rotas.atendimento.cadastros.fluxos.etapas)
                }
              >
                Cadastrar Etapa de fluxo
              </common.OpenModalLink>
            </div>
          )}
        />
        <Controller
          control={control}
          name="Tipo_Id"
          render={({ field: { onChange, value } }) => (
            <div className="col-span-2">
              <common.form.Select
                itens={
                  ticketsTypeData
                    ? ticketsTypeData.map((item) => {
                        return {
                          key: item.Valor,
                          title: item.Comentario,
                        };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Tipo_Id}
                label="Tipo"
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="Usuario_Id"
          render={({ field: { onChange, value } }) => (
            <div className="col-span-3">
              <common.form.Select
                itens={
                  usersData
                    ? usersData.map((item) => {
                        return {
                          key: item.Id,
                          title: item.Colaborador?.Pessoa.Nome as string,
                        };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Usuario_Id}
                label="Usuário"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Editar"
        disabled={updateTicketLoading}
        loading={updateTicketLoading}
      />
    </form>
  );
}
