import { Controller, useForm } from 'react-hook-form'
import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'
import * as utils from '@comigo/utils'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = {
  Servico_Id: {
    key: {
      Id: string
      Nome: string
      Tipo: {
        Valor: string
        Comentario: string
      }
      RegrasETermosDeUsos: {
        Id: string
        Mensagem: string
      }[]
      PrestadoresDeServicos: {
        Precos: {
          Id: string
          Valor: string
          TipoDePreco?: { Valor: string }
        }[]
      }[]
    }
  }
}

export function CreateProposalService() {
  const {
    setSlidePanelState,
    servicesData,
    insertProposalService,
    insertProposalServiceLoading,
    selectedTab,
    proposalRefetch,
    proposalData,
    insertProposalAlert,
    createServiceSchema
  } = proposals.useUpdate()
  const [insertForAll, setInsertForAll] = useState(
    selectedTab.type === 'Resume'
  )
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm({ resolver: yupResolver(createServiceSchema)})

  const onSubmit = async (formData: FormData) => {
    const price = formData.Servico_Id.key.PrestadoresDeServicos[0].Precos
    if (insertForAll) {
      await Promise.all(
        proposalData.Veiculos.map(async (vehicle) => {
          await insertProposalService({
            variables: {
              Servico_Id: formData.Servico_Id.key.Id,
              PropostaVeiculo_Id: vehicle.Id,
              PrecoDeAdesao_Id: price.filter(
                (price) => price.TipoDePreco.Valor === 'adesao'
              )[0]?.Id,
              PrecoDeRecorrencia_Id: price.filter(
                (price) => price.TipoDePreco.Valor === 'recorrencia'
              )[0]?.Id
            }
          })
        })
      )
    }

    if (!insertForAll) {
      await insertProposalService({
        variables: {
          Servico_Id: formData.Servico_Id.key.Id,
          PropostaVeiculo_Id: selectedTab.id,
          PrecoDeAdesao_Id: price.filter(
            (price) => price.TipoDePreco.Valor === 'adesao'
          )[0]?.Id,
          PrecoDeRecorrencia_Id: price.filter(
            (price) => price.TipoDePreco.Valor === 'recorrencia'
          )[0]?.Id
        }
      })
    }

    const existentsServicesAlerts = proposalData.RegrasETermosDeUsos.map(
      (alert) => alert.ServicoRegrasETermosDeUso?.Servico_Id
    )

    if (!existentsServicesAlerts.includes(formData.Servico_Id.key.Id)) {
      await Promise.all(
        formData.Servico_Id.key.RegrasETermosDeUsos.map(async (alert) => {
          await insertProposalAlert({
            variables: {
              Servico_RegraETermosDeUso_Id: alert.Id,
            }
          })
        })
      )
    }

    proposalRefetch()
    utils.notification(
      formData.Servico_Id.key.Nome + ' cadastrado com sucesso',
      'success'
    )
    setSlidePanelState((oldState) => {
      return { ...oldState, open: false }
    })
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
          name="Servico_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  servicesData
                    ? servicesData
                        .filter(
                          (service) =>
                            (service.PrestadoresDeServicos?.[0].Precos.length ||
                              0) > 0
                        )
                        .map((service) => {
                          return {
                            key: service,
                            title: service.Nome as string
                          }
                        })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Servico_Id}
                label="Servico"
              />
            </div>
          )}
        />
        <div className="flex items-center justify-between">
          <p>Adicionar este serviço para todos os veículos</p>
          <common.form.Switch
            onChange={() => setInsertForAll(!insertForAll)}
            value={insertForAll}
            disabled={selectedTab.type === 'Resume'}
          />
        </div>
        {watch('Servico_Id') !== undefined && (
          <p>Tipo: {watch('Servico_Id').key.Tipo.Comentario}</p>
        )}
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={insertProposalServiceLoading}
        loading={insertProposalServiceLoading}
      />
    </form>
  )
}
