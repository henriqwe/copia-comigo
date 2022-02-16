import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'

import * as activeVehicles from '&crm/domains/clients'

import * as utils from '@comigo/utils'

import { v4 as uuid } from 'uuid'

import { useRouter } from 'next/router'
import rotas from '&crm/domains/routes'
import { yupResolver } from '@hookform/resolvers/yup'

export function ChangeVehicle() {
  const router = useRouter()
  const {
    clientData,
    createProposal,
    createProposalLoading,
    userAndTicketData,
    changeVehicleSchema,
    getComboById,
    vehiclesData
  } = activeVehicles.useUpdate()
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(changeVehicleSchema)
  })
  const onSubmit = async (formData: any) => {
    const plans: {
      Proposta_Id: string
      Plano_Id: string
      Veiculo_Id: string
      PlanoPreco_Id: string
    }[] = []
    const products: {
      Proposta_Id: string
      Veiculo_Id: string
      Produto_Id: string
      PrecoDeAdesao_Id: string
      PrecoDeRecorrencia_Id: string
    }[] = []
    const service: {
      Proposta_Id: string
      Servico_Id: string
      Veiculo_Id: string
      PrecoDeAdesao_Id: string
      PrecoDeRecorrencia_Id: string
    }[] = []
    const combos: {
      Proposta_Id: string
      Combo_Id: string
      Veiculo_Id: string
      ComboPreco_Id: string
    }[] = []
    const proposalUUID = uuid()

    const comboPlansIds: string[] = []
    const comboServicesIds: string[] = []
    const comboProductsIds: string[] = []

    formData['Veiculo1'].key.Beneficios.filter(
      (item: { TipoPortfolio: string }) => item.TipoPortfolio === 'combo'
    ).map((item: { Portfolio_Id: string; PortfolioPreco_Id: string }) => {
      getComboById(item.Portfolio_Id, item.PortfolioPreco_Id).then((combo) => {
        // ids dos planos dos combos
        combo.combo?.Planos.map((plan) => {
          comboPlansIds.push(plan.Plano_Id)
        })
        // ids dos produtos dos combos
        combo.combo?.Produtos.map((products) => {
          comboProductsIds.push(products.Produto_Id)
        })
        // ids dos serviços dos combos
        combo.combo?.Servicos.map((services) => {
          comboServicesIds.push(services.Servico_Id)
        })
      })
    })

    // adicionando planos no array
    formData['Veiculo1'].key.Beneficios.filter(
      (item: { TipoPortfolio: string; Portfolio_Id: string }) =>
        item.TipoPortfolio === 'plano' &&
        !comboPlansIds.includes(item.Portfolio_Id)
    ).map((item: { Portfolio_Id: string; PortfolioPreco_Id: string }) => {
      plans.push(
        {
          Proposta_Id: proposalUUID,
          PlanoPreco_Id: item.PortfolioPreco_Id,
          Plano_Id: item.Portfolio_Id,
          Veiculo_Id: formData['Veiculo1'].key.Veiculo.Id
        },
        {
          Proposta_Id: proposalUUID,
          PlanoPreco_Id: item.PortfolioPreco_Id,
          Plano_Id: item.Portfolio_Id,
          Veiculo_Id: formData['Veiculo2'].key
        }
      )
    })

    // adicionando produtos do veiculo no array
    formData['Veiculo1'].key.Produtos.filter(
      (item: { Produto_Id: string }) =>
        !comboProductsIds.includes(item.Produto_Id)
    ).map(
      (item: {
        Produto_Id: string
        PrecoDeAdesao_Id: string
        PrecoDeRecorrencia_Id: string
      }) => {
        products.push(
          {
            Proposta_Id: proposalUUID,
            PrecoDeAdesao_Id: item.PrecoDeAdesao_Id,
            PrecoDeRecorrencia_Id: item.PrecoDeRecorrencia_Id,
            Produto_Id: item.Produto_Id,
            Veiculo_Id: formData['Veiculo1'].key.Veiculo.Id
          },
          {
            Proposta_Id: proposalUUID,
            PrecoDeAdesao_Id: item.PrecoDeAdesao_Id,
            PrecoDeRecorrencia_Id: item.PrecoDeRecorrencia_Id,
            Produto_Id: item.Produto_Id,
            Veiculo_Id: formData['Veiculo2'].key
          }
        )
      }
    )

    // adicionando serviços dos beneficios no array
    formData['Veiculo1'].key.Beneficios.filter(
      (item: { TipoPortfolio: string; Portfolio_Id: string }) =>
        item.TipoPortfolio === 'serviço' &&
        !comboServicesIds.includes(item.Portfolio_Id)
    ).map(
      (item: {
        Portfolio_Id: string
        PrecoDeAdesao_Id: string
        PrecoDeRecorrencia_Id: string
      }) => {
        service.push(
          {
            Proposta_Id: proposalUUID,
            PrecoDeAdesao_Id: item.PrecoDeAdesao_Id,
            PrecoDeRecorrencia_Id: item.PrecoDeRecorrencia_Id,
            Servico_Id: item.Portfolio_Id,
            Veiculo_Id: formData['Veiculo1'].key.Veiculo.Id
          },
          {
            Proposta_Id: proposalUUID,
            PrecoDeAdesao_Id: item.PrecoDeAdesao_Id,
            PrecoDeRecorrencia_Id: item.PrecoDeRecorrencia_Id,
            Servico_Id: item.Portfolio_Id,
            Veiculo_Id: formData['Veiculo2'].key
          }
        )
      }
    )

    // adicionando serviços do veiculo no array
    formData['Veiculo1'].key.Servicos.filter(
      (item: { Servico_Id: string }) =>
        !comboServicesIds.includes(item.Servico_Id)
    ).map(
      (item: {
        Servico_Id: string
        PrecoDeAdesao_Id: string
        PrecoDeRecorrencia_Id: string
      }) => {
        service.push(
          {
            Proposta_Id: proposalUUID,
            PrecoDeAdesao_Id: item.PrecoDeAdesao_Id,
            PrecoDeRecorrencia_Id: item.PrecoDeRecorrencia_Id,
            Servico_Id: item.Servico_Id,
            Veiculo_Id: formData['Veiculo1'].key.Veiculo.Id
          },
          {
            Proposta_Id: proposalUUID,
            PrecoDeAdesao_Id: item.PrecoDeAdesao_Id,
            PrecoDeRecorrencia_Id: item.PrecoDeRecorrencia_Id,
            Servico_Id: item.Servico_Id,
            Veiculo_Id: formData['Veiculo2'].key
          }
        )
      }
    )

    // adicionando combos no array
    formData['Veiculo1'].key.Beneficios.filter(
      (item: { TipoPortfolio: string; Portfolio_Id: string }) =>
        item.TipoPortfolio === 'combo'
    ).map((item: { Portfolio_Id: string; PortfolioPreco_Id: string }) => {
      combos.push(
        {
          Proposta_Id: proposalUUID,
          ComboPreco_Id: item.PortfolioPreco_Id,
          Combo_Id: item.Portfolio_Id,
          Veiculo_Id: formData['Veiculo1'].key.Veiculo.Id
        },
        {
          Proposta_Id: proposalUUID,
          ComboPreco_Id: item.PortfolioPreco_Id,
          Combo_Id: item.Portfolio_Id,
          Veiculo_Id: formData['Veiculo2'].key
        }
      )
    })

    await createProposal({
      variables: {
        Id: proposalUUID,
        Lead_Id: null,
        Ticket_Id: null,
        Usuario_Id: userAndTicketData.autenticacao_Usuarios[0].Id,
        Cliente_Id: router.query.id,
        veiculosData: [
          {
            Veiculo_Id: formData['Veiculo1'].key.Veiculo.Id,
            PropostasCombos: {
              data: combos
                .filter(
                  (combo) =>
                    combo.Veiculo_Id === formData['Veiculo1'].key.Veiculo.Id
                )
                .map((combo) => {
                  return {
                    Proposta_Id: combo.Proposta_Id,
                    ComboPreco_Id: combo.ComboPreco_Id,
                    Combo_Id: combo.Combo_Id
                  }
                })
            },
            PropostasPlanos: {
              data: plans
                .filter(
                  (plan) =>
                    plan.Veiculo_Id === formData['Veiculo1'].key.Veiculo.Id
                )
                .map((plan) => {
                  return {
                    Proposta_Id: plan.Proposta_Id,
                    PlanoPreco_Id: plan.PlanoPreco_Id,
                    Plano_Id: plan.Plano_Id
                  }
                })
            },
            PropostasProdutos: {
              data: products
                .filter(
                  (product) =>
                    product.Veiculo_Id === formData['Veiculo1'].key.Veiculo.Id
                )
                .map((product) => {
                  return {
                    Proposta_Id: product.Proposta_Id,
                    PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                    PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                    Produto_Id: product.Produto_Id
                  }
                })
            },
            PropostasServicos: {
              data: service
                .filter(
                  (service) =>
                    service.Veiculo_Id === formData['Veiculo1'].key.Veiculo.Id
                )
                .map((service) => {
                  return {
                    Proposta_Id: service.Proposta_Id,
                    PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
                    PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
                    Servico_Id: service.Servico_Id
                  }
                })
            }
          },
          {
            Veiculo_Id: formData['Veiculo2'].key,
            PropostasCombos: {
              data: combos
                .filter(
                  (combo) => combo.Veiculo_Id === formData['Veiculo2'].key
                )
                .map((combo) => {
                  return {
                    Proposta_Id: combo.Proposta_Id,
                    ComboPreco_Id: combo.ComboPreco_Id,
                    Combo_Id: combo.Combo_Id
                  }
                })
            },
            PropostasPlanos: {
              data: plans
                .filter((plan) => plan.Veiculo_Id === formData['Veiculo2'].key)
                .map((plan) => {
                  return {
                    Proposta_Id: plan.Proposta_Id,
                    PlanoPreco_Id: plan.PlanoPreco_Id,
                    Plano_Id: plan.Plano_Id
                  }
                })
            },
            PropostasProdutos: {
              data: products
                .filter(
                  (product) => product.Veiculo_Id === formData['Veiculo2'].key
                )
                .map((product) => {
                  return {
                    Proposta_Id: product.Proposta_Id,
                    PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                    PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                    Produto_Id: product.Produto_Id
                  }
                })
            },
            PropostasServicos: {
              data: service
                .filter(
                  (service) => service.Veiculo_Id === formData['Veiculo2'].key
                )
                .map((service) => {
                  return {
                    Proposta_Id: service.Proposta_Id,
                    PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
                    PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
                    Servico_Id: service.Servico_Id
                  }
                })
            }
          }
        ]

        // oportunidadesData: []
      }
    })
      .then((response) => {
        router.push(
          rotas.propostas +
            '/' +
            response?.data.insert_propostas_Propostas_one.Id +
            '?origin=changeVehicle'
        )
        utils.notification(
          'Proposta do novo veiculo criada com sucesso',
          'success'
        )
      })
      .catch((error) => utils.showError(error))
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
          name={'Veiculo1'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  clientData
                    ? clientData.VeiculosAtivos.filter(
                        (vehicle) => vehicle.Situacao.Valor === 'ativo'
                      ).map((activeVehicle) => {
                        return {
                          key: activeVehicle,
                          title: `${
                            activeVehicle.Veiculo.Placa
                              ? activeVehicle.Veiculo.Placa
                              : activeVehicle.Veiculo.NumeroDoChassi
                          }${
                            activeVehicle.Veiculo.Apelido
                              ? ' - ' + activeVehicle.Veiculo.Apelido
                              : ''
                          }`
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Veiculo}
                label="Veiculo que vai ser inativado"
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name={'Veiculo2'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  vehiclesData
                    ? vehiclesData.map((activeVehicle) => {
                        return {
                          key: activeVehicle.Id,
                          title: `${
                            activeVehicle.Placa
                              ? activeVehicle.Placa
                              : activeVehicle.NumeroDoChassi
                          }${
                            activeVehicle.Apelido
                              ? ' - ' + activeVehicle.Apelido
                              : ''
                          }`
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Veiculo}
                label="Veiculo que vai receber"
              />
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
