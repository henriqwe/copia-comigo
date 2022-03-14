import * as utils from '@comigo/utils'
import * as types from '&crm/domains/clients/types'
import { v4 as uuid } from 'uuid'
import routes from '&crm/domains/routes'
import { createProposal } from '../operations/mutations'
import { NextRouter } from 'next/router'

type ChangeOwnershipSingleProps = {
  formData: any
  userAndTicketData: {
    atendimentos_Tickets?: {
      Id: string
    }[]
    autenticacao_Usuarios?: {
      Id: string
    }[]
  }
  router: NextRouter
  clientData: types.ClientType
  selectedCategory: {
    title: string
    type: string
    id?: number
  }
}

export async function changeOwnershipSingle({
  formData,
  router,
  userAndTicketData,
  clientData,
  selectedCategory
}: ChangeOwnershipSingleProps) {
  try {
    if (!formData['Cliente']) {
      return utils.notification(
        'Preencha todos os campos para continuar',
        'error'
      )
    }
    const plans: types.PlanType[] = []
    const products: types.ProductType[] = []
    const services: types.ServiceType[] = []
    const combos: types.ComboType[] = []
    const proposalUUID = uuid()
    const vehicleUUID = uuid()
    const activeVehicle = clientData.VeiculosAtivos.filter(
      (vehicle) => vehicle.Id === selectedCategory.id.toString()
    )[0]

    activeVehicle.Combos.map((combo) => {
      combos.push({
        Proposta_Id: proposalUUID,
        ComboPreco_Id: combo.ComboPreco_Id,
        Combo_Id: combo.Combo_Id,
        Veiculo_Id: activeVehicle.Veiculo.Id,
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
    activeVehicle.Planos.filter(
      (plan) => plan.VeiculoAtivoCombo_Id === null
    ).map((plan) => {
      plans.push({
        Proposta_Id: proposalUUID,
        PlanoPreco_Id: plan.PlanoPreco_Id,
        Plano_Id: plan.Plano_Id,
        Veiculo_Id: activeVehicle.Veiculo.Id,
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
    activeVehicle.Produtos.filter(
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
          Veiculo_Id: activeVehicle.Veiculo.Id,
          Quantidade: product.Quantidade
        }
      )
    })

    // adicionando serviços do veiculo no array
    activeVehicle.Servicos.filter(
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
          Veiculo_Id: activeVehicle.Veiculo.Id
        }
      )
    })

    const response = await createProposal({
      variables: {
        Id: proposalUUID,
        Lead_Id: null,
        Ticket_Id: null,
        Usuario_Id: userAndTicketData.autenticacao_Usuarios[0].Id,
        Cliente_Id: formData['Cliente'].key,
        veiculosData: [
          {
            Id: vehicleUUID,
            Veiculo_Id: activeVehicle.Veiculo.Id,
            PropostasCombos: {
              data: combos
                .filter(
                  (combo) => combo.Veiculo_Id === activeVehicle.Veiculo.Id
                )
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
                .filter((plan) => plan.Veiculo_Id === activeVehicle.Veiculo.Id)
                .map((plan) => {
                  return {
                    Proposta_Id: plan.Proposta_Id,
                    PlanoPreco_Id: plan.PlanoPreco_Id,
                    Plano_Id: plan.Plano_Id,
                    ropostasProdutos: plan.PropostasProdutos,
                    PropostasServicos: plan.PropostasServicosP
                  }
                })
            },
            PropostasProdutos: {
              data: products
                .filter(
                  (product) => product.Veiculo_Id === activeVehicle.Veiculo.Id
                )
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
                .filter(
                  (service) => service.Veiculo_Id === activeVehicle.Veiculo.Id
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
