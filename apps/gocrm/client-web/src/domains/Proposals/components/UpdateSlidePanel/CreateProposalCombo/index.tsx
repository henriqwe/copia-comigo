import { Controller, useForm } from 'react-hook-form'
import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'
import * as utils from '@comigo/utils'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = {
  Combo_Id: {
    key: {
      Id: string
      Nome: string
      Precos: {
        Id: string
      }[]
      Planos: {
        Plano: {
          Id: string
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

export function CreateProposalCombos() {
  const {
    setSlidePanelState,
    combosData,
    insertProposalCombo,
    selectedTab,
    proposalRefetch,
    proposalData,
    insertProposalAlert,
    insertProposalPlan,
    insertProposalProduct,
    insertProposalService,
    createComboSchema
  } = proposals.useUpdate()
  const [insertForAll, setInsertForAll] = useState(
    selectedTab.type === 'Resume'
  )

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({ resolver: yupResolver(createComboSchema) })

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
            await createCombo(
              formData,
              existentsProductsAlerts,
              existentsServicesAlerts,
              vehicle.Id
            )
          })
        )
      }

      if (!insertForAll) {
        await createCombo(
          formData,
          existentsProductsAlerts,
          existentsServicesAlerts
        )
      }

      proposalRefetch()
      utils.notification(
        formData.Combo_Id.key.Nome + ' cadastrado com sucesso',
        'success'
      )
      setSlidePanelState((oldState) => {
        return { ...oldState, open: false }
      })
    } catch (err) {
      utils.showError(err)
    }
  }

  async function createCombo(
    formData: FormData,
    existentsProductsAlerts: string[],
    existentsServicesAlerts: string[],
    vehicleId?: string
  ) {
    const combo = formData.Combo_Id.key
    const response = await insertProposalCombo({
      variables: {
        ComboPreco_Id: formData.Combo_Id.key.Precos[0].Id,
        Combo_Id: formData.Combo_Id.key.Id,
        PropostaVeiculo_Id: vehicleId ? vehicleId : selectedTab.id
      }
    })

    await Promise.all(
      combo.Planos.map(async (plan) => {
        const planResponse = await insertProposalPlan({
          variables: {
            PlanoPreco_Id: null,
            Plano_Id: plan.Plano.Id,
            PropostaVeiculo_Id: vehicleId ? vehicleId : selectedTab.id,
            PropostaCombo_Id:
              response.data.insert_propostas_Propostas_Combos_one.Id
          }
        })

        await Promise.all(
          plan.Plano.Produtos.map(async (product) => {
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
                PrecoDeAdesao_Id: null,
                PrecoDeRecorrencia_Id: null,
                Quantidade: 1,
                PropostaPlano_Id:
                  planResponse.data.insert_propostas_Propostas_Planos_one.Id
              }
            })
          })
        )

        await Promise.all(
          plan.Plano.Servicos.map(async (service) => {
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
                PrecoDeAdesao_Id: null,
                PrecoDeRecorrencia_Id: null,
                PropostaPlano_Id:
                  planResponse.data.insert_propostas_Propostas_Planos_one.Id
              }
            })
          })
        )
      })
    )

    await Promise.all(
      combo.Produtos.map(async (product) => {
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
            PrecoDeAdesao_Id: null,
            PrecoDeRecorrencia_Id: null,
            Quantidade: 1,
            PropostaCombo_Id:
              response.data.insert_propostas_Propostas_Combos_one.Id
          }
        })
      })
    )

    await Promise.all(
      combo.Servicos.map(async (service) => {
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
            PrecoDeAdesao_Id: null,
            PrecoDeRecorrencia_Id: null,
            PropostaCombo_Id:
              response.data.insert_propostas_Propostas_Combos_one.Id
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
          name="Combo_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  combosData
                    ? combosData.map((combo) => {
                        return {
                          key: combo,
                          title: combo.Nome as string
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Combo_Id}
                label="Combo"
              />
            </div>
          )}
        />
        <div className="flex items-center justify-between">
          <p>Adicionar este combo para todos os veículos</p>
          <common.form.Switch
            onChange={() => setInsertForAll(!insertForAll)}
            value={insertForAll}
            disabled={selectedTab.type === 'Resume'}
          />
        </div>
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton title="Enviar" />
    </form>
  )
}
