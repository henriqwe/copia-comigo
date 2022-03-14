import { Controller, useForm } from 'react-hook-form'
import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'
import * as utils from '@comigo/utils'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = {
  Plan_Id: {
    key: {
      Id: string
      Nome: string
      Precos: {
        Id: string
        Valor?: string
      }[]
      Produtos: {
        Produto: {
          Id: string
          RegrasETermosDeUsos: {
            Id: string
            Mensagem: string
          }[]
        }
      }[]
      Servicos: {
        Servico: {
          Id: string
          RegrasETermosDeUsos: {
            Id: string
            Mensagem: string
          }[]
        }
      }[]
    }
  }
}

export function CreateProposalPlans() {
  const {
    setSlidePanelState,
    plansData,
    insertProposalPlan,
    insertProposalPlanLoading,
    selectedTab,
    proposalRefetch,
    proposalData,
    insertProposalAlert,
    insertProposalProduct,
    insertProposalService,
    createPlanSchema
  } = proposals.useUpdate()
  const [insertForAll, setInsertForAll] = useState(
    selectedTab.type === 'Resume'
  )
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({resolver: yupResolver(createPlanSchema)})

  const onSubmit = async (formData: FormData) => {
    try {
      const existentsProductsAlerts = proposalData.RegrasETermosDeUsos.map(
        (alert) => alert.ProdutoRegrasETermosDeUso?.Produto_Id
      )

      const existentsServicesAlerts = proposalData.RegrasETermosDeUsos.map(
        (alert) => alert.ServicoRegrasETermosDeUso?.Servico_Id
      )
      if (insertForAll) {
        await Promise.all(
          proposalData.Veiculos.map(async (vehicle) => {
            await createPlan(
              formData,
              existentsProductsAlerts,
              existentsServicesAlerts,
              vehicle.Id
            )
          })
        )
      }
      if (!insertForAll) {
        await createPlan(
          formData,
          existentsProductsAlerts,
          existentsServicesAlerts
        )
      }

      proposalRefetch()
      utils.notification(
        formData.Plan_Id.key.Nome + ' cadastrado com sucesso',
        'success'
      )
      setSlidePanelState((oldState) => {
        return { ...oldState, open: false }
      })
    } catch (err) {
      utils.showError(err)
    }
  }

  async function createPlan(
    formData: FormData,
    existentsProductsAlerts: string[],
    existentsServicesAlerts: string[],
    vehicleId?: string
  ) {
    const plan = formData.Plan_Id.key

    const response = await insertProposalPlan({
      variables: {
        PlanoPreco_Id: plan.Precos[0].Id,
        Plano_Id: plan.Id,
        PropostaVeiculo_Id: vehicleId ? vehicleId : selectedTab.id
      }
    })
    await Promise.all(
      plan.Produtos.map(async (product) => {
        if (!existentsProductsAlerts.includes(product.Produto.Id)) {
          await Promise.all(
            product.Produto.RegrasETermosDeUsos.map(async (alert) => {
              await insertProposalAlert({
                variables: {
                  Produto_RegraETermosDeUso_Id: alert.Id
                }
              })
            })
          )
        }

        await insertProposalProduct({
          variables: {
            Produto_Id: product.Produto.Id,
            PropostaVeiculo_Id: vehicleId ? vehicleId : selectedTab.id,
            Quantidade: 1,
            PropostaPlano_Id:
              response.data.insert_propostas_Propostas_Planos_one.Id
          }
        })
      })
    )

    await Promise.all(
      plan.Servicos.map(async (service) => {
        if (!existentsServicesAlerts.includes(service.Servico.Id)) {
          await Promise.all(
            service.Servico.RegrasETermosDeUsos.map(async (alert) => {
              await insertProposalAlert({
                variables: {
                  Servico_RegraETermosDeUso_Id: alert.Id
                }
              })
            })
          )
        }

        await insertProposalService({
          variables: {
            Servico_Id: service.Servico.Id,
            PropostaVeiculo_Id: vehicleId ? vehicleId : selectedTab.id,
            PropostaPlano_Id:
              response.data.insert_propostas_Propostas_Planos_one.Id
          }
        })
      })
    )
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
          name="Plan_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  plansData
                    ? plansData.map((plan) => {
                        return {
                          key: plan,
                          title: plan.Nome as string
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Plan_Id}
                label="Plano"
              />
            </div>
          )}
        />
        <div className="flex items-center justify-between">
          <p>Adicionar este plano para todos os veículos</p>
          <common.form.Switch
            onChange={() => setInsertForAll(!insertForAll)}
            value={insertForAll}
            disabled={selectedTab.type === 'Resume'}
          />
        </div>
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={insertProposalPlanLoading}
        loading={insertProposalPlanLoading}
      />
    </form>
  )
}
