import axios from 'axios'
import { ProposalsDataType } from '../types/proposal'
import { getActiveVehicleById } from '&crm/domains/Proposals/operations/queries/getActiveVehicleById'
import { ProposalsVehicleDataType } from '../types/proposalVehicle'
import { QueryType } from '../types/query'
import {
  acceptProposal,
  activateActiveVehicleCombo,
  activateActiveVehiclePlan,
  changeVehicleOwnership,
  changeVehicleSituation,
  createActiveVehicle,
  createActiveVehicleCombo,
  createActiveVehiclePlan,
  createActiveVehicleProduct,
  createActiveVehicleService,
  updateActiveVehicleCombo,
  updateActiveVehiclePlan,
  updateActiveVehicleServicePrice
} from '&crm/domains/Proposals/operations/mutations'
import * as utils from '@comigo/utils'
import { clientes_VeiculosAtivos_Situacao_enum } from '&crm/graphql/generated/zeus'
import { updateActiveVehicleProduct } from '../operations/updateActiveVehicleProduct'
import { updateActiveVehicleService } from '../operations/updateActiveVehicleService'
import { ActivateActiveVehicleProduct } from '../operations/activateActiveVehicleProduct'
import { ActivateActiveVehicleService } from '../operations/activateActiveVehicleService'
import { ActiveVehicleDataType } from '../types/activeVehicle'
import { disableActiveVehiclePlan } from '../operations/disableActiveVehiclePlan'
import { disableActiveVehicleCombo } from '../operations/disableActiveVehicleCombo'
import { updateActiveVehiclePlanUninstall } from '../operations/updateActiveVehiclePlanUninstall'
import { updateActiveVehicleComboUninstall } from '../operations/updateActiveVehicleComboUninstall'
import { v4 as uuid } from 'uuid'

export async function acceptProposalSubmit(
  query: QueryType,
  proposalRefetch: () => void
) {
  await acceptProposal(query)
    .then(() => {
      proposalRefetch()
      utils.notification('Proposta concluida com sucesso', 'success')
    })
    .catch((err) => utils.notification(err, 'error'))
}

export async function concludeNewProposal(
  proposalData: ProposalsDataType,
  query: QueryType,
  proposalRefetch: () => void
) {
  const vehicles = await Promise.all(
    proposalData.Veiculos?.map(async (vehicle) => {
      return await handleVehicle(vehicle, proposalData)
    })
  )

  if (typeof window !== 'undefined') {
    createOs(query, proposalRefetch, 'instalacao', vehicles)
  }

  proposalRefetch()
  utils.notification('Proposta concluida com sucesso', 'success')
}

export async function concludeProposalForExistentVehicle(
  proposalData: ProposalsDataType,
  query: QueryType,
  proposalRefetch: () => void
) {
  const vehicles = await Promise.all(
    proposalData.Veiculos?.map(async (vehicle) => {
      const { hasActiveVehicle, activeVehicles } = await getHasActiveVehicle(
        proposalData.Veiculos?.[0]
      )

      // ver se existe um veiculo
      if (hasActiveVehicle) {
        // ids dos planos da proposta
        const plansIds = vehicle.PropostasPlanos.filter(
          (plan) => plan.PropostaCombo_Id === null
        ).map((plan) => plan.Plano.Id)

        // ids dos serviços da propostas
        const servicesIds = vehicle.PropostasServicos.filter(
          (service) =>
            !service.Servico.GeraOS &&
            service.PropostaCombo_Id === null &&
            service.PropostaPlano_Id === null
        ).map((service) => service.Servico.Id)

        // ids dos combos da proposta
        const combosIds = vehicle.PropostasCombos.map((combo) => combo.Combo.Id)

        // remove os beneficios que não estão mais presentes na proposta
        await removeBenefit({
          itens: activeVehicles?.[0],
          combosIds,
          plansIds,
          servicesIds
        })

        // Ações para os planos
        vehicle.PropostasPlanos.filter(
          (plan) => plan.PropostaCombo_Id === null
        ).map((plan) => {
          // pega o benefecio plano se existir
          const planBenefit = activeVehicles?.[0].Planos?.filter(
            (benefit) => benefit.Plano_Id === plan.Plano.Id
          )
          // verificar se exite o plano no veiculo ativo
          if ((planBenefit?.length || 0) > 0) {
            updateActiveVehiclePlan({
              Id: planBenefit?.[0].Id,
              PlanoPreco_Id: plan.PlanoPreco.Id
            })
            return
          }
          createActiveVehiclePlan({
            PlanoPreco_Id: plan.PlanoPreco.Id,
            Plano_Id: plan.Plano.Id,
            Produtos: plan.PropostasProdutos.map((product) => {
              return {
                Produto_Id: product.Produto.Id,
                PrecoDeAdesao_Id: product.PrecoAdesao?.Id,
                PrecoDeRecorrencia_Id: product.PrecoRecorrencia?.Id,
                DataDeAtivacao: new Date(),
                Quantidade: product.Quantidade,
                VeiculoAtivo_Id: activeVehicles?.[0].Id,
                Ativo: true
              }
            }),
            Servicos: plan.PropostasServicos.map((service) => {
              return {
                PrecoDeAdesao_Id: service?.PrecoDeAdesao?.Id,
                PrecoDeRecorrencia_Id: service?.PrecoDeRecorrencia?.Id,
                Servico_Id: service.Servico.Id,
                VeiculoAtivo_Id: activeVehicles?.[0].Id,
                DataDeAtivacao: new Date(),
                Beneficio: !service.Servico.GeraOS,
                Ativo: true
              }
            }),
            VeiculoAtivo_Id: activeVehicles?.[0].Id
          })
          return
        })

        // Ações para os serviços
        vehicle.PropostasServicos.filter(
          (service) =>
            !service.Servico.GeraOS &&
            service.PropostaCombo_Id === null &&
            service.PropostaPlano_Id === null
        ).map((service) => {
          // pega o benefecio serviço se existir
          const serviceBenefit = activeVehicles?.[0].Servicos?.filter(
            (benefit) => benefit.Servico_Id === service.Servico.Id
          )
          // verificar se exite o serviço no veiculo ativo
          if ((serviceBenefit?.length || 0) > 0) {
            updateActiveVehicleServicePrice({
              Id: serviceBenefit?.[0].Id,
              PrecoDeAdesao_Id: service.PrecoDeAdesao?.Id,
              PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia?.Id
            })
            return
          }

          createActiveVehicleService({
            Beneficio: true,
            Servico_Id: service.Servico.Id,
            VeiculoAtivo_Id: activeVehicles?.[0].Id,
            PrecoDeAdesao_Id: service.PrecoDeAdesao?.Id,
            PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia?.Id
          })

          return
        })

        // proposalData?.Combos.filter(
        //   (combo) => combo.Veiculo_Id === installation.Veiculo_Id
        // ).map((combo) => {
        //   // confere se esse combo existe nos beneficios do veiculo ativo, caso sim ele tira do array de ids dos combos do veiculo ativo
        //   if (combosIds?.includes(combo.Combo.Id)) {
        //     combosIds = combosIds.filter(
        //       (comboId) => comboId !== combo.Combo.Id
        //     )
        //   }
        // })

        // Ações para os combos
        vehicle.PropostasCombos.map(async (combo) => {
          // pega o benefecio combo se existir
          const comboBenefit = activeVehicles?.[0].Combos?.filter(
            (benefit) => benefit.Combo_Id === combo.Combo.Id
          )
          // verificar se exite o combo no veiculo ativo
          if ((comboBenefit?.length || 0) > 0) {
            updateActiveVehicleCombo({
              Id: comboBenefit?.[0].Id,
              ComboPreco_Id: combo.ComboPreco.Id
            })
            return
          }
          await createActiveVehicleCombo({
            ComboPreco_Id: combo.ComboPreco.Id,
            Combo_Id: combo.Combo.Id,
            VeiculoAtivo_Id: activeVehicles?.[0].Id,
            Planos: combo.PropostasPlanos.map((plan) => {
              return {
                Ativo: true,
                Plano_Id: plan.Plano.Id,
                PlanoPreco_Id: plan.PlanoPreco?.Id,
                DataDeAtivacao: new Date(),
                VeiculoAtivo_Id: activeVehicles?.[0].Id,
                Produtos: {
                  data: plan.PropostasProdutos.map((product) => {
                    return {
                      Produto_Id: product.Produto.Id,
                      PrecoDeAdesao_Id: product.PrecoAdesao?.Id,
                      PrecoDeRecorrencia_Id: product.PrecoRecorrencia?.Id,
                      DataDeAtivacao: new Date(),
                      Quantidade: product.Quantidade,
                      VeiculoAtivo_Id: activeVehicles?.[0].Id,
                      Ativo: true
                    }
                  })
                },
                Servicos: {
                  data: plan.PropostasServicos.map((service) => {
                    return {
                      PrecoDeAdesao_Id: service?.PrecoDeAdesao?.Id,
                      PrecoDeRecorrencia_Id: service?.PrecoDeRecorrencia?.Id,
                      Servico_Id: service.Servico.Id,
                      VeiculoAtivo_Id: activeVehicles?.[0].Id,
                      DataDeAtivacao: new Date(),
                      Beneficio: !service.Servico.GeraOS,
                      Ativo: true
                    }
                  })
                }
              }
            }),
            Produtos: combo.PropostasProdutos.map((product) => {
              return {
                Produto_Id: product.Produto.Id,
                PrecoDeAdesao_Id: product.PrecoAdesao?.Id,
                PrecoDeRecorrencia_Id: product.PrecoRecorrencia?.Id,
                DataDeAtivacao: new Date(),
                Quantidade: product.Quantidade,
                VeiculoAtivo_Id: activeVehicles?.[0].Id,
                Ativo: true
              }
            }),
            Servicos: combo.PropostasServicos.map((service) => {
              return {
                PrecoDeAdesao_Id: service?.PrecoDeAdesao?.Id,
                PrecoDeRecorrencia_Id: service?.PrecoDeRecorrencia?.Id,
                Servico_Id: service.Servico.Id,
                VeiculoAtivo_Id: activeVehicles?.[0].Id,
                DataDeAtivacao: new Date(),
                Beneficio: !service.Servico.GeraOS,
                Ativo: true
              }
            })
          })
        })
        return
      }
      return await handleVehicle(vehicle, proposalData)
    })
  )

  if (typeof window !== 'undefined') {
    createOs(query, proposalRefetch, 'instalacao', vehicles)
  }

  proposalRefetch()
  utils.notification('Proposta concluida com sucesso', 'success')
}

export async function concludeProposalForChangeVehicle(
  proposalData: ProposalsDataType,
  query: QueryType,
  proposalRefetch: () => void
) {
  const { hasActiveVehicle, activeVehicles } = await getHasActiveVehicle(
    proposalData.Veiculos?.[0]
  )

  if (hasActiveVehicle) {
    await removeBenefit({
      itens: activeVehicles?.[0],
      combosIds: activeVehicles?.[0].Combos.map((combo) => combo.Id),
      plansIds: activeVehicles?.[0].Planos.filter(
        (plan) => plan.VeiculoAtivoCombo_Id === null
      ).map((plan) => plan.Id),
      servicesIds: activeVehicles?.[0].Servicos.filter(
        (service) =>
          service.Beneficio &&
          service.VeiculoAtivoCombo_Id === null &&
          service.VeiculoAtivoPlano_Id === null
      ).map((service) => service.Id)
    })

    if (typeof window !== 'undefined') {
      createOs(query, proposalRefetch, 'mudaVeiculo')
    }

    return
  }

  proposalRefetch()
  utils.notification('Proposta concluida com sucesso', 'success')
}

export async function concludeProposalForChangeOwner(
  proposalData: ProposalsDataType,
  proposalRefetch: () => void
) {
  try {
    await Promise.all(
      proposalData.Veiculos?.map(async (vehicle) => {
        const { activeVehicles } = await getHasActiveVehicle(vehicle)

        // colocar outro uuid caso o veiculo exista e esteja inativo
        const vehicleUUID = uuid()
        const combos = vehicle.PropostasCombos.map((combo) => {
          return {
            Ativo: true,
            ComboPreco_Id: combo.ComboPreco.Id,
            Combo_Id: combo.Combo.Id,
            DataDeAtivacao: new Date(),
            Planos: {
              data: combo.PropostasPlanos.map((plan) => {
                return {
                  Ativo: true,
                  Plano_Id: plan.Plano.Id,
                  PlanoPreco_Id: plan.PlanoPreco?.Id,
                  DataDeAtivacao: new Date(),
                  VeiculoAtivo_Id: vehicleUUID,
                  Produtos: {
                    data: plan.PropostasProdutos.map((product) => {
                      return {
                        Produto_Id: product.Produto.Id,
                        PrecoDeAdesao_Id: product.PrecoAdesao?.Id,
                        PrecoDeRecorrencia_Id: product.PrecoRecorrencia?.Id,
                        DataDeAtivacao: new Date(),
                        Quantidade: product.Quantidade,
                        VeiculoAtivo_Id: vehicleUUID,
                        Ativo: true
                      }
                    })
                  },
                  Servicos: {
                    data: plan.PropostasServicos.map((service) => {
                      return {
                        PrecoDeAdesao_Id: service?.PrecoDeAdesao?.Id,
                        PrecoDeRecorrencia_Id: service?.PrecoDeRecorrencia?.Id,
                        Servico_Id: service.Servico.Id,
                        VeiculoAtivo_Id: vehicleUUID,
                        DataDeAtivacao: new Date(),
                        Beneficio: !service.Servico.GeraOS,
                        Ativo: true
                      }
                    })
                  }
                }
              })
            },
            Produtos: {
              data: combo.PropostasProdutos.map((product) => {
                return {
                  Produto_Id: product.Produto.Id,
                  PrecoDeAdesao_Id: product.PrecoAdesao?.Id,
                  PrecoDeRecorrencia_Id: product.PrecoRecorrencia?.Id,
                  DataDeAtivacao: new Date(),
                  Quantidade: product.Quantidade,
                  VeiculoAtivo_Id: vehicleUUID,
                  Ativo: true
                }
              })
            },
            Servicos: {
              data: combo.PropostasServicos.map((service) => {
                return {
                  PrecoDeAdesao_Id: service?.PrecoDeAdesao?.Id,
                  PrecoDeRecorrencia_Id: service?.PrecoDeRecorrencia?.Id,
                  Servico_Id: service.Servico.Id,
                  VeiculoAtivo_Id: vehicleUUID,
                  DataDeAtivacao: new Date(),
                  Beneficio: !service.Servico.GeraOS,
                  Ativo: true
                }
              })
            }
          }
        })

        const plans = vehicle.PropostasPlanos.filter(
          (plan) => plan.PropostaCombo_Id === null
        ).map((plan) => {
          return {
            Ativo: true,
            Plano_Id: plan.Plano.Id,
            PlanoPreco_Id: plan.PlanoPreco?.Id,
            DataDeAtivacao: new Date(),
            Produtos: {
              data: plan.PropostasProdutos.map((product) => {
                return {
                  Produto_Id: product.Produto.Id,
                  PrecoDeAdesao_Id: product.PrecoAdesao?.Id,
                  PrecoDeRecorrencia_Id: product.PrecoRecorrencia?.Id,
                  DataDeAtivacao: new Date(),
                  Quantidade: product.Quantidade,
                  VeiculoAtivo_Id: vehicleUUID,
                  Ativo: true
                }
              })
            },
            Servicos: {
              data: plan.PropostasServicos.map((service) => {
                return {
                  PrecoDeAdesao_Id: service?.PrecoDeAdesao?.Id,
                  PrecoDeRecorrencia_Id: service?.PrecoDeRecorrencia?.Id,
                  Servico_Id: service.Servico.Id,
                  VeiculoAtivo_Id: vehicleUUID,
                  DataDeAtivacao: new Date(),
                  Beneficio: !service.Servico.GeraOS,
                  Ativo: true
                }
              })
            }
          }
        })

        const plansIds = vehicle.PropostasPlanos.filter(
          (plan) => plan.PropostaCombo_Id === null
        ).map((plan) => plan.Plano.Id)

        // ids dos serviços da propostas
        const servicesIds = vehicle.PropostasServicos.filter(
          (service) =>
            service.PropostaCombo_Id === null &&
            service.PropostaPlano_Id === null
        ).map((service) => service.Servico.Id)

        // ids dos combos da proposta
        const combosIds = vehicle.PropostasCombos.map((combo) => combo.Combo.Id)

        // produtos da proposta
        const products = vehicle.PropostasProdutos.filter(
          (product) =>
            product.PropostaCombo_Id === null &&
            product.PropostaPlano_Id === null
        ).map((product) => {
          const activeVehicleProduct = activeVehicles[0].Produtos.filter(
            (item) => item.Produto_Id === product.Produto.Id
          )[0]
          return {
            Ativo: true,
            Produto_Id: product.Produto.Id,
            PrecoDeAdesao_Id: product.PrecoAdesao?.Id,
            PrecoDeRecorrencia_Id: product.PrecoRecorrencia?.Id,
            TipoItem_Id: activeVehicleProduct.TipoItem_Id,
            Identificador: activeVehicleProduct.Identificador,
            DataDeAtivacao: new Date(),
            Quantidade: product.Quantidade
          }
        })

        // serviços da proposta
        const services = vehicle.PropostasServicos.filter(
          (service) =>
            service.PropostaPlano_Id === null &&
            service.PropostaCombo_Id === null
        ).map((service) => {
          return {
            PrecoDeAdesao_Id: service.PrecoDeAdesao?.Id,
            PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia?.Id,
            Servico_Id: service.Servico.Id,
            Beneficio: !service.Servico.GeraOS,
            DataDeAtivacao: new Date(),
            Ativo: true
          }
        })

        // inativar plano do veiculo ativo
        await Promise.all(
          activeVehicles?.[0].Planos.map(async (plan) => {
            await updateActiveVehiclePlanUninstall({
              Id: plan.Id
            })
          })
        )

        // inativar combo do veiculo ativo
        await Promise.all(
          activeVehicles?.[0].Combos.map(async (combo) => {
            await updateActiveVehicleComboUninstall({
              Id: combo.Id
            })
          })
        )

        // inativar produtos do veiculo ativo
        await Promise.all(
          activeVehicles?.[0].Produtos.map(async (product) => {
            await updateActiveVehicleProduct({
              Id: product.Id,
              Ativo: false
            })
          })
        )

        // inativar serviços do veiculo ativo
        await Promise.all(
          activeVehicles?.[0].Servicos.map(async (service) => {
            await updateActiveVehicleService({
              Id: service.Id,
              Ativo: false
            })
          })
        )

        const vehicles = await getActiveVehicleById(
          vehicle.Veiculo_Id as string,
          false
        )
        // veiculo inativo em outro cliente
        const inativeVehicle = vehicles?.filter((vehicle) => {
          return (
            vehicle.Cliente_Id === proposalData?.Cliente_Id &&
            vehicle.Situacao.Valor === 'inativo'
          )
        })

        if ((inativeVehicle?.length || 0) > 0) {
          // ids dos planos do veiculo inativo
          const inativePlansIds = inativeVehicle?.[0].Planos.map(
            (plan) => plan.Plano_Id
          )

          // ids dos combos do veiculo inativo
          const inativeComboIds = inativeVehicle?.[0].Combos.map(
            (combo) => combo.Combo_Id
          )
          // ids dos serviços do veiculo inativo
          const inativeServicesIds = inativeVehicle?.[0].Servicos.map(
            (service) => service.Servico_Id
          )
          // ids dos produtos do veiculo inativo
          const inativeProductsIds = inativeVehicle?.[0].Produtos.map(
            (product) => product.Produto_Id
          )

          // remove planos dos veiculos inativos
          await removeBenefit({
            itens: inativeVehicle?.[0],
            combosIds,
            plansIds,
            servicesIds
          })

          await Promise.all(
            combos?.map(async (combo) => {
              if (inativeComboIds?.includes(combo.Combo_Id)) {
                await activateActiveVehicleCombo({
                  Id: inativeVehicle?.[0].Combos.filter(
                    (vehicle) => vehicle.Combo_Id === combo.Combo_Id
                  )[0].Id,
                  ComboPreco_Id: combo.ComboPreco_Id
                })
                return
              }
              await createActiveVehicleCombo({
                ComboPreco_Id: combo.ComboPreco_Id,
                Combo_Id: combo.Combo_Id,
                Planos: combo.Planos.data.map((plan) => {
                  return {
                    ...plan,
                    Produtos: {
                      data: plan.Produtos.data.map((product) => {
                        return {
                          ...product,
                          VeiculoAtivo_Id: inativeVehicle?.[0].Id
                        }
                      })
                    },
                    Servicos: {
                      data: plan.Servicos.data.map((service) => {
                        return {
                          ...service,
                          VeiculoAtivo_Id: inativeVehicle?.[0].Id
                        }
                      })
                    }
                  }
                }),
                Produtos: combo.Produtos.data.map((product) => {
                  return {
                    ...product,
                    VeiculoAtivo_Id: inativeVehicle?.[0].Id
                  }
                }),
                Servicos: combo.Servicos.data.map((service) => {
                  return {
                    ...service,
                    VeiculoAtivo_Id: inativeVehicle?.[0].Id
                  }
                }),
                VeiculoAtivo_Id: inativeVehicle?.[0].Id
              })
            })
          )

          await Promise.all(
            plans?.map(async (plan) => {
              if (inativePlansIds?.includes(plan.Plano_Id)) {
                await activateActiveVehiclePlan({
                  Id: inativeVehicle?.[0].Planos.filter(
                    (vehicle) => vehicle.Plano_Id === plan.Plano_Id
                  )[0].Id,
                  PlanoPreco_Id: plan.PlanoPreco_Id
                })
                return
              }
              await createActiveVehiclePlan({
                PlanoPreco_Id: plan.PlanoPreco_Id,
                Plano_Id: plan.Plano_Id,
                Produtos: plan.Produtos.data.map((product) => {
                  return {
                    ...product,
                    VeiculoAtivo_Id: inativeVehicle?.[0].Id
                  }
                }),
                Servicos: plan.Servicos.data.map((service) => {
                  return {
                    ...service,
                    VeiculoAtivo_Id: inativeVehicle?.[0].Id
                  }
                }),
                VeiculoAtivo_Id: inativeVehicle?.[0].Id
              })
            })
          )

          await Promise.all(
            products?.map(async (product) => {
              if (!inativeProductsIds?.includes(product.Produto_Id)) {
                await createActiveVehicleProduct({
                  VeiculoAtivo_Id: inativeVehicle?.[0].Id,
                  Produto_Id: product.Produto_Id,
                  PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                  PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                  TipoItem_Id: product.TipoItem_Id,
                  Identificador: product.Identificador,
                  Quantidade: product.Quantidade
                })
                return
              }
              await ActivateActiveVehicleProduct({
                Id: inativeVehicle?.[0].Produtos.filter(
                  (vehicle) => vehicle.Produto_Id === product.Produto_Id
                )[0].Id,
                Ativo: false
              })
            })
          )

          await Promise.all(
            services?.map(async (service) => {
              if (!inativeServicesIds?.includes(service.Servico_Id)) {
                await createActiveVehicleService({
                  VeiculoAtivo_Id: inativeVehicle?.[0].Id,
                  PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
                  PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
                  Servico_Id: service.Servico_Id,
                  Beneficio: service.Beneficio
                })
                return
              }
              await ActivateActiveVehicleService({
                Id: inativeVehicle?.[0].Servicos.filter(
                  (vehicle) => vehicle.Servico_Id === service.Servico_Id
                )[0].Id,
                Ativo: false
              })
            })
          )
          await changeVehicleSituation({
            Id: inativeVehicle?.[0].Id,
            Situacao_Id: clientes_VeiculosAtivos_Situacao_enum.ativo
          })
          await changeVehicleSituation({
            Id: activeVehicles?.[0].Id,
            Situacao_Id: clientes_VeiculosAtivos_Situacao_enum.inativo
          })
          return
        }

        await changeVehicleOwnership({
          vehicleUUID,
          Id: activeVehicles?.[0].Id,
          Veiculo_Id: vehicle.Veiculo_Id,
          Cliente_Id: proposalData?.Cliente_Id,
          Franquia_Id: activeVehicles?.[0].Franquia_Id,
          OS_Id: activeVehicles?.[0].OS_Id,
          Combos: combos,
          Planos: plans,
          Produtos: products,
          Servicos: services
        })
      })
    )
    proposalRefetch()
    utils.notification('Proposta concluida com sucesso', 'success')
  } catch (err) {
    utils.showError(err)
  }
}

async function handleVehicle(
  vehicle: ProposalsVehicleDataType,
  proposalData: ProposalsDataType
) {
  if (notShouldGenerateOS(vehicle)) {
    const vehicleUUID = uuid()
    await createActiveVehicle({
      Id: vehicleUUID,
      PossuiGNV: vehicle.PossuiGNV,
      Veiculo_Id: vehicle.Veiculo_Id,
      Cliente_Id: proposalData.Cliente_Id,
      Franquia_Id: null,
      Combos: vehicle.PropostasCombos.map((combo) => {
        return {
          Ativo: true,
          ComboPreco_Id: combo.ComboPreco.Id,
          Combo_Id: combo.Combo.Id,
          DataDeAtivacao: new Date(),
          Planos: {
            data: combo.PropostasPlanos.map((plan) => {
              return {
                Ativo: true,
                Plano_Id: plan.Plano.Id,
                PlanoPreco_Id: plan.PlanoPreco?.Id,
                DataDeAtivacao: new Date(),
                VeiculoAtivo_Id: vehicleUUID,
                Produtos: {
                  data: plan.PropostasProdutos.map((product) => {
                    return {
                      Produto_Id: product.Produto.Id,
                      PrecoDeAdesao_Id: product.PrecoAdesao?.Id,
                      PrecoDeRecorrencia_Id: product.PrecoRecorrencia?.Id,
                      DataDeAtivacao: new Date(),
                      Quantidade: product.Quantidade,
                      VeiculoAtivo_Id: vehicleUUID,
                      Ativo: true
                    }
                  })
                },
                Servicos: {
                  data: plan.PropostasServicos.map((service) => {
                    return {
                      PrecoDeAdesao_Id: service?.PrecoDeAdesao?.Id,
                      PrecoDeRecorrencia_Id: service?.PrecoDeRecorrencia?.Id,
                      Servico_Id: service.Servico.Id,
                      VeiculoAtivo_Id: vehicleUUID,
                      DataDeAtivacao: new Date(),
                      Beneficio: !service.Servico.GeraOS,
                      Ativo: true
                    }
                  })
                }
              }
            })
          },
          Produtos: {
            data: combo.PropostasProdutos.map((product) => {
              return {
                Produto_Id: product.Produto.Id,
                PrecoDeAdesao_Id: product.PrecoAdesao?.Id,
                PrecoDeRecorrencia_Id: product.PrecoRecorrencia?.Id,
                DataDeAtivacao: new Date(),
                Quantidade: product.Quantidade,
                VeiculoAtivo_Id: vehicleUUID,
                Ativo: true
              }
            })
          },
          Servicos: {
            data: combo.PropostasServicos.map((service) => {
              return {
                PrecoDeAdesao_Id: service?.PrecoDeAdesao?.Id,
                PrecoDeRecorrencia_Id: service?.PrecoDeRecorrencia?.Id,
                Servico_Id: service.Servico.Id,
                VeiculoAtivo_Id: vehicleUUID,
                DataDeAtivacao: new Date(),
                Beneficio: !service.Servico.GeraOS,
                Ativo: true
              }
            })
          }
        }
      }),
      Planos: vehicle.PropostasPlanos.filter(
        (plan) => plan.PropostaCombo_Id === null
      ).map((plan) => {
        return {
          Ativo: true,
          Plano_Id: plan.Plano.Id,
          PlanoPreco_Id: plan.PlanoPreco?.Id,
          DataDeAtivacao: new Date(),
          Produtos: {
            data: plan.PropostasProdutos.map((product) => {
              return {
                Produto_Id: product.Produto.Id,
                PrecoDeAdesao_Id: product.PrecoAdesao?.Id,
                PrecoDeRecorrencia_Id: product.PrecoRecorrencia?.Id,
                DataDeAtivacao: new Date(),
                Quantidade: product.Quantidade,
                VeiculoAtivo_Id: vehicleUUID,
                Ativo: true
              }
            })
          },
          Servicos: {
            data: plan.PropostasServicos.map((service) => {
              return {
                PrecoDeAdesao_Id: service?.PrecoDeAdesao?.Id,
                PrecoDeRecorrencia_Id: service?.PrecoDeRecorrencia?.Id,
                Servico_Id: service.Servico.Id,
                VeiculoAtivo_Id: vehicleUUID,
                DataDeAtivacao: new Date(),
                Beneficio: !service.Servico.GeraOS,
                Ativo: true
              }
            })
          }
        }
      }),
      Produtos: vehicle.PropostasProdutos.filter(
        (product) =>
          product.PropostaCombo_Id === null && product.PropostaPlano_Id === null
      ).map((product) => {
        // const item = productItens.filter(
        //   (productItem) => productItem.Id === product.Produto.Id
        // )[0]
        return {
          Produto_Id: product.Produto.Id,
          PrecoDeAdesao_Id: product.PrecoAdesao?.Id,
          PrecoDeRecorrencia_Id: product.PrecoRecorrencia?.Id,
          DataDeAtivacao: new Date(),
          Quantidade: product.Quantidade,
          Ativo: true
        }
      }),
      Servicos: vehicle.PropostasServicos.filter(
        (service) =>
          service.PropostaCombo_Id === null && service.PropostaPlano_Id === null
      ).map((service) => {
        return {
          Servico_Id: service.Servico.Id,
          PrecoDeAdesao_Id: service.PrecoDeAdesao?.Id,
          PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia?.Id,
          DataDeAtivacao: new Date(),
          Beneficio: !service.Servico.GeraOS,
          Ativo: true
        }
      })
    })
    return vehicle.Veiculo_Id
  }
}

function notShouldGenerateOS(vehicle: ProposalsVehicleDataType) {
  return (
    vehicle.PropostasServicos.filter((service) => {
      return service.Servico.GeraOS
    }).length === 0 &&
    vehicle.PropostasCombos.filter((combo) => {
      return (
        combo.PropostasPlanos.filter((plan) =>
          plan.PropostasServicos.filter((service) => {
            return service.Servico.GeraOS
          })
        ).length === 0 &&
        combo.PropostasServicos.filter((service) => {
          return service.Servico.GeraOS
        })
      )
    }).length === 0 &&
    vehicle.PropostasPlanos.filter((plan) =>
      plan.PropostasServicos.filter((service) => {
        return service.Servico.GeraOS
      })
    ).length === 0
  )
}

export async function getHasActiveVehicle(vehicle: ProposalsVehicleDataType) {
  const vehicles = await getActiveVehicleById(vehicle.Veiculo_Id as string)
  const activeVehicles = vehicles?.filter(
    (vehicle) => vehicle.Situacao.Valor === 'ativo'
  )

  return {
    hasActiveVehicle: activeVehicles.length > 0,
    activeVehicles
  }
}

async function removeBenefit({
  itens,
  combosIds,
  plansIds,
  servicesIds
}: {
  itens?: ActiveVehicleDataType
  plansIds?: string[]
  combosIds?: string[]
  servicesIds?: string[]
}) {
  // itens dos beneficios para excluir
  let plansToExclude = itens.Planos.filter(
    (plan) => plan.VeiculoAtivoCombo_Id === null
  )
  let combosToExclude = itens.Combos
  let servicesToExclude = itens.Servicos.filter(
    (service) =>
      service.Beneficio &&
      service.VeiculoAtivoCombo_Id === null &&
      service.VeiculoAtivoPlano_Id === null
  )

  itens?.Planos.map((plan) => {
    // confere se esse item existe nos beneficios do veiculo ativo, caso sim ele tira do array para excluir
    if (plansIds?.includes(plan.Plano_Id)) {
      plansToExclude = plansToExclude?.filter(
        (planToExclude) => planToExclude.Plano_Id !== plan.Plano_Id
      )
    }
  })

  await Promise.all(
    plansToExclude?.map(async (plan) => {
      // desativa cada item que não existir mais no beneficio
      await disableActiveVehiclePlan(plan.Id)
    })
  )

  itens?.Combos.map((combo) => {
    // confere se esse item existe nos beneficios do veiculo ativo, caso sim ele tira do array para excluir
    if (combosIds?.includes(combo.Combo_Id)) {
      combosToExclude = combosToExclude?.filter(
        (comboToExclude) => comboToExclude.Combo_Id !== combo.Combo_Id
      )
    }
  })

  await Promise.all(
    combosToExclude?.map(async (combo) => {
      // desativa cada item que não existir mais no beneficio
      await disableActiveVehicleCombo(combo.Id)
    })
  )

  itens?.Servicos.filter((service) => service.Beneficio).map((service) => {
    // confere se esse item existe nos beneficios do veiculo ativo, caso sim ele tira do array para excluir
    if (servicesIds?.includes(service.Servico_Id)) {
      servicesToExclude = servicesToExclude?.filter(
        (serviceToExclude) => serviceToExclude.Servico_Id !== service.Servico_Id
      )
    }
  })

  await Promise.all(
    servicesToExclude?.map(async (service) => {
      // desativa cada item que não existir mais no beneficio
      await disableActiveVehiclePlan(service.Id)
    })
  )
}

export function createOs(
  query: QueryType,
  refetch: () => void,
  type: string,
  vehicles?: string[]
) {
  const hostname = window.location.hostname

  switch (type) {
    case 'desinstalacao':
      break
    case 'mudaVeiculo':
      axios
        .get(
          `http://${hostname}:3002/api/acoes/gerar-os-mudar-veiculo?proposalId=${query.id}`
        )
        .then(() => {
          refetch()
          utils.notification('Proposta concluida com sucesso', 'success')
        })
      break
    case 'instalacao':
      axios
        .get(
          `http://${hostname}:3002/api/acoes/gerar-os?proposalId=${
            query.id
          }&type=instalacao&vehicles=${JSON.stringify(vehicles)}`
        )
        .then(() => {
          refetch()
        })
      break
  }
}
