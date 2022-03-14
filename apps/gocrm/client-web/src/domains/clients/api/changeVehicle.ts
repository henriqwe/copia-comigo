import * as utils from '@comigo/utils'
import * as types from '&crm/domains/clients/types'
import * as mutations from '&crm/domains/clients/operations/mutations'
import { v4 as uuid } from 'uuid'
import routes from '&crm/domains/routes'
import { NextRouter } from 'next/router'

type ChangeVehicleProps = {
  formData: {
    Veiculo1: { key: types.ActiveVehicleType; title: string }
    Veiculo2: { key: string; title: string }
  }
  userAndTicketData: {
    atendimentos_Tickets?: {
      Id: string
    }[]
    autenticacao_Usuarios?: {
      Id: string
    }[]
  }
  router: NextRouter
}

export async function changeVehicle({
  formData,
  router,
  userAndTicketData
}: ChangeVehicleProps) {
  try {
    const plans: types.PlanType[] = []
    const products: types.ProductType[] = []
    const services: types.ServiceType[] = []
    const combos: types.ComboType[] = []
    const proposalUUID = uuid()
    const vehicle1UUID = uuid()
    const vehicle2UUID = uuid()
    const vehicle1 = formData.Veiculo1.key
    const vehicle2 = formData.Veiculo2.key

    // adicionando planos no array
    vehicle1.Combos.map((combo) => {
      combos.push(
        {
          Proposta_Id: proposalUUID,
          ComboPreco_Id: combo.ComboPreco_Id,
          Combo_Id: combo.Combo_Id,
          Veiculo_Id: vehicle1.Veiculo.Id,
          PropostasPlanos: {
            data: combo.Planos.map((plan) => {
              return {
                PlanoPreco_Id: plan.PlanoPreco_Id,
                Plano_Id: plan.Plano_Id,
                PropostaVeiculo_Id: vehicle1UUID,
                Proposta_Id: proposalUUID,
                PropostasProdutos: {
                  data: plan.Produtos.map((product) => {
                    return {
                      Proposta_Id: proposalUUID,
                      PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                      PropostaVeiculo_Id: vehicle1UUID,
                      PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                      Produto_Id: product.Produto_Id,
                      Quantidade: product.Quantidade
                    }
                  })
                },
                PropostasServicos: {
                  data: plan.Servicos.map((service) => {
                    return {
                      Proposta_Id: proposalUUID,
                      PropostaVeiculo_Id: vehicle1UUID,
                      PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
                      PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
                      Servico_Id: service.Servico_Id
                    }
                  })
                }
              }
            })
          },
          PropostasProdutos: {
            data: combo.Produtos.map((product) => {
              return {
                Proposta_Id: proposalUUID,
                PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                Produto_Id: product.Produto_Id,
                Quantidade: product.Quantidade,
                PropostaVeiculo_Id: vehicle1UUID
              }
            })
          },
          PropostasServicos: {
            data: combo.Servicos.map((service) => {
              return {
                Proposta_Id: proposalUUID,
                PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
                PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
                Servico_Id: service.Servico_Id,
                PropostaVeiculo_Id: vehicle1UUID
              }
            })
          }
        },
        {
          Proposta_Id: proposalUUID,
          ComboPreco_Id: combo.ComboPreco_Id,
          Combo_Id: combo.Combo_Id,
          Veiculo_Id: vehicle2,
          PropostasPlanos: {
            data: combo.Planos.map((plan) => {
              return {
                PlanoPreco_Id: plan.PlanoPreco_Id,
                Plano_Id: plan.Plano_Id,
                Proposta_Id: proposalUUID,
                PropostaVeiculo_Id: vehicle2UUID,
                PropostasProdutos: {
                  data: plan.Produtos.map((product) => {
                    return {
                      Proposta_Id: proposalUUID,
                      PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                      PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                      Produto_Id: product.Produto_Id,
                      Quantidade: product.Quantidade,
                      PropostaVeiculo_Id: vehicle2UUID
                    }
                  })
                },
                PropostasServicos: {
                  data: plan.Servicos.map((service) => {
                    return {
                      Proposta_Id: proposalUUID,
                      PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
                      PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
                      Servico_Id: service.Servico_Id,
                      PropostaVeiculo_Id: vehicle2UUID
                    }
                  })
                }
              }
            })
          },
          PropostasProdutos: {
            data: combo.Produtos.map((product) => {
              return {
                Proposta_Id: proposalUUID,
                PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                Produto_Id: product.Produto_Id,
                Quantidade: product.Quantidade,
                PropostaVeiculo_Id: vehicle2UUID
              }
            })
          },
          PropostasServicos: {
            data: combo.Servicos.map((service) => {
              return {
                Proposta_Id: proposalUUID,
                PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
                PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
                Servico_Id: service.Servico_Id,
                PropostaVeiculo_Id: vehicle2UUID
              }
            })
          }
        }
      )
    })

    // adicionando planos no array
    vehicle1.Planos.filter((plan) => plan.VeiculoAtivoCombo_Id === null).map(
      (plan) => {
        plans.push(
          {
            Proposta_Id: proposalUUID,
            PlanoPreco_Id: plan.PlanoPreco_Id,
            Plano_Id: plan.Plano_Id,
            Veiculo_Id: vehicle1.Veiculo.Id,
            PropostasProdutos: {
              data: plan.Produtos.map((product) => {
                return {
                  Proposta_Id: proposalUUID,
                  PropostaVeiculo_Id: vehicle1UUID,
                  PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                  PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                  Produto_Id: product.Produto_Id,
                  Quantidade: product.Quantidade
                }
              })
            },
            PropostasServicos: {
              data: plan.Servicos.map((service) => {
                return {
                  Proposta_Id: proposalUUID,
                  PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
                  PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
                  Servico_Id: service.Servico_Id,
                  PropostaVeiculo_Id: vehicle1UUID
                }
              })
            }
          },
          {
            Proposta_Id: proposalUUID,
            PlanoPreco_Id: plan.PlanoPreco_Id,
            Plano_Id: plan.Plano_Id,
            Veiculo_Id: vehicle2,
            PropostasProdutos: {
              data: plan.Produtos.map((product) => {
                return {
                  Proposta_Id: proposalUUID,
                  PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                  PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                  Produto_Id: product.Produto_Id,
                  Quantidade: product.Quantidade,
                  PropostaVeiculo_Id: vehicle2UUID
                }
              })
            },
            PropostasServicos: {
              data: plan.Servicos.map((service) => {
                return {
                  Proposta_Id: proposalUUID,
                  PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
                  PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
                  Servico_Id: service.Servico_Id,
                  PropostaVeiculo_Id: vehicle2UUID
                }
              })
            }
          }
        )
      }
    )

    // adicionando produtos do veiculo no array
    vehicle1.Produtos.filter(
      (product) =>
        product.VeiculoAtivoCombo_Id === null &&
        product.VeiculoAtivoPlano_Id === null
    ).map((product) => {
      products.push(
        {
          Proposta_Id: proposalUUID,
          PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
          Produto_Id: product.Produto_Id,
          Veiculo_Id: vehicle1.Veiculo.Id,
          Quantidade: product.Quantidade
        },
        {
          Proposta_Id: proposalUUID,
          PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
          Produto_Id: product.Produto_Id,
          Veiculo_Id: vehicle2,
          Quantidade: product.Quantidade
        }
      )
    })

    // adicionando serviços do veiculo no array
    vehicle1.Servicos.filter(
      (service) =>
        service.VeiculoAtivoCombo_Id === null &&
        service.VeiculoAtivoPlano_Id === null
    ).map((service) => {
      services.push(
        {
          Proposta_Id: proposalUUID,
          PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
          Servico_Id: service.Servico_Id,
          Veiculo_Id: vehicle1.Veiculo.Id
        },
        {
          Proposta_Id: proposalUUID,
          PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
          Servico_Id: service.Servico_Id,
          Veiculo_Id: vehicle2
        }
      )
    })

    const response = await mutations.createProposal({
      variables: {
        Id: proposalUUID,
        Lead_Id: null,
        Ticket_Id: null,
        Usuario_Id: userAndTicketData.autenticacao_Usuarios[0].Id,
        Cliente_Id: router.query.id as string,
        veiculosData: [
          {
            Id: vehicle1UUID,
            Veiculo_Id: vehicle1.Veiculo.Id,
            PropostasCombos: {
              data: combos
                .filter((combo) => combo.Veiculo_Id === vehicle1.Veiculo.Id)
                .map((combo) => {
                  return {
                    Proposta_Id: combo.Proposta_Id,
                    ComboPreco_Id: combo.ComboPreco_Id,
                    Combo_Id: combo.Combo_Id,
                    PropostasPlanos: combo.PropostasPlanos,
                    PropostasProdutos: combo.PropostasProdutos,
                    PropostasServicos: combo.PropostasServicos
                  }
                })
            },
            PropostasPlanos: {
              data: plans
                .filter((plan) => plan.Veiculo_Id === vehicle1.Veiculo.Id)
                .map((plan) => {
                  return {
                    Proposta_Id: plan.Proposta_Id,
                    PlanoPreco_Id: plan.PlanoPreco_Id,
                    Plano_Id: plan.Plano_Id,
                    PropostasProdutos: plan.PropostasProdutos,
                    PropostasServicos: plan.PropostasServicos
                  }
                })
            },
            PropostasProdutos: {
              data: products
                .filter((product) => product.Veiculo_Id === vehicle1.Veiculo.Id)
                .map((product) => {
                  return {
                    Proposta_Id: product.Proposta_Id,
                    PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                    PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                    Produto_Id: product.Produto_Id,
                    Quantidade: product.Quantidade
                  }
                })
            },
            PropostasServicos: {
              data: services
                .filter((service) => service.Veiculo_Id === vehicle1.Veiculo.Id)
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
            Id: vehicle2UUID,
            Veiculo_Id: vehicle2,
            PropostasCombos: {
              data: combos
                .filter((combo) => combo.Veiculo_Id === vehicle2)
                .map((combo) => {
                  return {
                    Proposta_Id: combo.Proposta_Id,
                    ComboPreco_Id: combo.ComboPreco_Id,
                    Combo_Id: combo.Combo_Id,
                    PropostasPlanos: combo.PropostasPlanos,
                    PropostasProdutos: combo.PropostasProdutos,
                    PropostasServicos: combo.PropostasServicos
                  }
                })
            },
            PropostasPlanos: {
              data: plans
                .filter((plan) => plan.Veiculo_Id === vehicle2)
                .map((plan) => {
                  return {
                    Proposta_Id: plan.Proposta_Id,
                    PlanoPreco_Id: plan.PlanoPreco_Id,
                    Plano_Id: plan.Plano_Id,
                    PropostasProdutos: plan.PropostasProdutos,
                    PropostasServicos: plan.PropostasServicos
                  }
                })
            },
            PropostasProdutos: {
              data: products
                .filter((product) => product.Veiculo_Id === vehicle2)
                .map((product) => {
                  return {
                    Proposta_Id: product.Proposta_Id,
                    PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                    PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                    Produto_Id: product.Produto_Id,
                    Quantidade: product.Quantidade
                  }
                })
            },
            PropostasServicos: {
              data: services
                .filter((service) => service.Veiculo_Id === vehicle2)
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

    router.push(
      routes.propostas +
        '/' +
        response?.data.insert_propostas_Propostas_one.Id +
        '?origin=changeVehicle'
    )
    utils.notification('Proposta do novo veiculo criada com sucesso', 'success')
  } catch (error) {
    utils.showError(error)
  }
}
