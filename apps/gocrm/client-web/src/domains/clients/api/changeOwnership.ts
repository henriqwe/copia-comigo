import * as utils from '@comigo/utils'
import * as queries from '&crm/domains/clients/operations/queries'
import * as types from '&crm/domains/clients/types'
import { v4 as uuid } from 'uuid'
import routes from '&crm/domains/routes'
import { createProposal } from '../operations/mutations'
import { NextRouter } from 'next/router'

type ChangeOwnershipProps = {
  formData: any
  vehiclesGroup: number[]
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

export async function changeOwnership({
  formData,
  router,
  userAndTicketData,
  vehiclesGroup
}: ChangeOwnershipProps) {
  try {
    const plans: types.PlanType[] = []
    const products: types.ProductType[] = []
    const services: types.ServiceType[] = []
    const combos: types.ComboType[] = []
    const vehiclesUUIDs: string[] = []
    const proposalUUID = uuid()
    const validation = vehiclesGroup
      .filter((vehicle) => vehicle !== 0)
      .map((vehicle) => {
        const vehicleUUID = uuid()
        vehiclesUUIDs.push(vehicleUUID)
        if (!formData['Veiculo' + vehicle] || !formData['Cliente']) {
          return
        }

        const currentVehicle = formData['Veiculo' + vehicle].key

        currentVehicle.Combos.map((combo) => {
          combos.push({
            Proposta_Id: proposalUUID,
            ComboPreco_Id: combo.ComboPreco_Id,
            Combo_Id: combo.Combo_Id,
            Veiculo_Id: currentVehicle.Veiculo.Id,
            PropostasPlanos: {
              data: combo.Planos.map((plan) => {
                return {
                  PlanoPreco_Id: plan.PlanoPreco_Id,
                  Plano_Id: plan.Plano_Id,
                  PropostaVeiculo_Id: vehicleUUID,
                  Proposta_Id: proposalUUID,
                  PropostasProdutos: {
                    data: plan.Produtos.map((product) => {
                      return {
                        Proposta_Id: proposalUUID,
                        PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                        PropostaVeiculo_Id: vehicleUUID,
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
                        PropostaVeiculo_Id: vehicleUUID,
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
                  PropostaVeiculo_Id: vehicleUUID
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
                  PropostaVeiculo_Id: vehicleUUID
                }
              })
            }
          })
        })

        // adicionando planos no array
        currentVehicle.Planos.filter(
          (plan) => plan.VeiculoAtivoCombo_Id === null
        ).map((plan) => {
          plans.push({
            Proposta_Id: proposalUUID,
            PlanoPreco_Id: plan.PlanoPreco_Id,
            Plano_Id: plan.Plano_Id,
            Veiculo_Id: currentVehicle.Veiculo.Id,
            PropostasProdutos: {
              data: plan.Produtos.map((product) => {
                return {
                  Proposta_Id: proposalUUID,
                  PropostaVeiculo_Id: vehicleUUID,
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
                  PropostaVeiculo_Id: vehicleUUID
                }
              })
            }
          })
        })

        // adicionando produtos do veiculo no array
        currentVehicle.Produtos.filter(
          (product) =>
            product.VeiculoAtivoCombo_Id === null &&
            product.VeiculoAtivoPlano_Id === null
        ).map((product) => {
          products.push({
            Proposta_Id: proposalUUID,
            PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
            PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
            Produto_Id: product.Produto_Id,
            Veiculo_Id: currentVehicle.Veiculo.Id,
            Quantidade: product.Quantidade
          })
        })

        // adicionando serviços do veiculo no array
        currentVehicle.Servicos.filter(
          (service) =>
            service.VeiculoAtivoCombo_Id === null &&
            service.VeiculoAtivoPlano_Id === null
        ).map((service) => {
          services.push({
            Proposta_Id: proposalUUID,
            PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
            PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
            Servico_Id: service.Servico_Id,
            Veiculo_Id: currentVehicle.Veiculo.Id
          })
        })

        return true
      })

    if (validation.includes(undefined)) {
      return utils.notification(
        'Preencha todos os campos para continuar',
        'error'
      )
    }

    const response = await createProposal({
      variables: {
        Id: proposalUUID,
        Lead_Id: null,
        Ticket_Id: null,
        Usuario_Id: userAndTicketData.autenticacao_Usuarios[0].Id,
        Cliente_Id: formData['Cliente'].key,
        veiculosData: vehiclesGroup
          .filter((vehicle) => vehicle !== 0)
          .map((vehicle, index) => {
            if (!formData['Veiculo' + vehicle] || !formData['Cliente']) {
              return
            }
            return {
              Id: vehiclesUUIDs[index],
              Veiculo_Id: formData['Veiculo' + vehicle].key.Veiculo.Id,
              PropostasCombos: {
                data: combos
                  .filter(
                    (combo) =>
                      combo.Veiculo_Id ===
                      formData['Veiculo' + vehicle].key.Veiculo.Id
                  )
                  .map((combo) => {
                    return {
                      Proposta_Id: proposalUUID,
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
                  .filter(
                    (plan) =>
                      plan.Veiculo_Id ===
                      formData['Veiculo' + vehicle].key.Veiculo.Id
                  )
                  .map((plan) => {
                    return {
                      Proposta_Id: proposalUUID,
                      PlanoPreco_Id: plan.PlanoPreco_Id,
                      Plano_Id: plan.Plano_Id,
                      PropostasProdutos: plan.PropostasProdutos,
                      PropostasServicos: plan.PropostasServicos
                    }
                  })
              },
              PropostasProdutos: {
                data: products
                  .filter(
                    (product) =>
                      product.Veiculo_Id ===
                      formData['Veiculo' + vehicle].key.Veiculo.Id
                  )
                  .map((product) => {
                    return {
                      Proposta_Id: proposalUUID,
                      PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                      PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                      Produto_Id: product.Produto_Id,
                      Quantidade: product.Quantidade
                    }
                  })
              },
              PropostasServicos: {
                data: services
                  .filter(
                    (service) =>
                      service.Veiculo_Id ===
                      formData['Veiculo' + vehicle].key.Veiculo.Id
                  )
                  .map((service) => {
                    return {
                      Proposta_Id: proposalUUID,
                      PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
                      PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
                      Servico_Id: service.Servico_Id
                    }
                  })
              }
            }
          })
          .filter((content) => content !== undefined)
        // oportunidadesData: []
      }
    })

    router.push(
      routes.propostas +
        '/' +
        response?.data.insert_propostas_Propostas_one.Id +
        '?origin=changeOwnership'
    )
    utils.notification('Proposta do novo veiculo criada com sucesso', 'success')
  } catch (err) {
    utils.showError(err)
  }
}
