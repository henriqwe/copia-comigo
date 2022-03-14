import { movimentacoes_Motivos_enum } from '&erp/graphql/generated/zeus'
import * as utils from '@comigo/utils'
import { Dispatch, SetStateAction } from 'react'
import * as mutations from '../operations/mutations'
import * as queries from '../operations/queries'
import { ClientType } from '../types/client'
import { InstallationKitsType } from '../types/installationKit'
import { ProductItensType } from '../types/productItens'
import { ServiceOrderData } from '../types/serviceOrder'
import { VehicleType } from '../types/vehicle'
import { v4 as uuid } from 'uuid'

type FinishServiceOrderSubmitProps = {
  OS_Id: string
  serviceOrderData: ServiceOrderData
  client: ClientType
  vehicle: VehicleType
  serviceOrderRefetch: () => void
  serviceOrderActivitiesRefetch: () => void
  setActiveEdit: Dispatch<SetStateAction<boolean>>
  productItens: ProductItensType[]
  setLoading: Dispatch<SetStateAction<boolean>>
}

export async function finishServiceOrderSubmit({
  OS_Id,
  serviceOrderData,
  client,
  vehicle,
  serviceOrderRefetch,
  serviceOrderActivitiesRefetch,
  setActiveEdit,
  productItens,
  setLoading
}: FinishServiceOrderSubmitProps) {
  try {
    setLoading(true)
    // Pega os veiculos ativos desse cliente
    const activeVehicles = await queries.getActiveVehicles(
      client.Id,
      vehicle.Id
    )

    // Se esse cliente já tiver um veiculo ativo entra no if para atualizar
    if (activeVehicles.length > 0) {
      if (serviceOrderData?.Tipo.Valor === 'desinstalacao') {
        await mutations.disableActiveVehicle({
          Id: activeVehicles[0].Id
        })
        await Promise.all(
          activeVehicles[0].Produtos.map(async (product) => {
            await productsMovimentation(
              product.TipoItem_Id,
              product.Identificador
            )

            await mutations.updateActiveVehicleProduct({
              Id: product.Id,
              Ativo: false
            })
          })
        )
        await Promise.all(
          activeVehicles[0].Planos.map(async (plan) => {
            await mutations.updateActiveVehiclePlanUninstall({
              Id: plan.Id
            })
          })
        )
        await Promise.all(
          activeVehicles[0].Combos.map(async (combo) => {
            await mutations.updateActiveVehicleComboUninstall({
              Id: combo.Id
            })
          })
        )

        await Promise.all(
          activeVehicles[0].Servicos.map(async (service) => {
            await mutations.updateActiveVehicleServiceUninstall({
              Id: service.Id
            })
          })
        )

        serviceOrderData?.Servicos.map(async (service) => {
          await mutations.insertActiveVehicleService({
            PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
            PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
            Servico_Id: service.Servico.Id,
            VeiculoAtivo_Id: activeVehicles[0].Id,
            Beneficio: service.Beneficio
          })
        })
        await mutations.finishServiceOrder({ OS_Id })
        setLoading(false)
        serviceOrderRefetch()
        serviceOrderActivitiesRefetch()
        setActiveEdit(false)
        utils.notification('Ordem de serviço finalizada com sucesso', 'success')
        return
      }
      // Atualiza o veiculo
      const response = await mutations.updateActiveVehicle({
        Id: activeVehicles[0].Id,
        OS_Id
      })

      serviceOrderData?.Planos.filter(
        (plan) => plan.OrdemDeServicoCombo_Id === null
      ).map(async (plan) => {
        let duplatedItemId = ''
        // verifica se o beneficio existe no veiculo ativo, caso sim atualiza
        if (
          activeVehicles[0].Planos.findIndex((activeBenefit) => {
            const validation = activeBenefit.Plano_Id === plan.Plano.Id
            if (validation) {
              duplatedItemId = activeBenefit.Id
            }

            return validation
          }) > -1
        ) {
          // atualizar o beneficio do veiculo
          await mutations.updateActiveVehiclePlan({
            Id: duplatedItemId,
            Ativo: true,
            PlanoPreco_Id: plan.PlanoPreco_Id
          })
          return
        }

        // inseri um plano para o veiculo ativo
        await mutations.insertActiveVehiclePlan({
          PlanoPreco_Id: plan.PlanoPreco_Id,
          Plano_Id: plan.Plano.Id,
          VeiculoAtivo_Id:
            response.data.update_clientes_VeiculosAtivos_by_pk.Id,
          Produtos: plan.OSProdutos.map((product) => {
            return {
              PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
              PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
              Produto_Id: product.Produto.Id,
              VeiculoAtivo_Id:
                response.data.update_clientes_VeiculosAtivos_by_pk.Id,
              TipoItem_Id: product.TipoDeIdentificavel_Id,
              Identificador: product.Identificavel_Id,
              DataDeAtivacao: new Date(),
              Quantidade: product.Quantidade,
              Ativo: true
            }
          }),
          Servicos: plan.OSServicos.map((service) => {
            return {
              PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
              PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
              Servico_Id: service.Servico.Id,
              VeiculoAtivo_Id:
                response.data.update_clientes_VeiculosAtivos_by_pk.Id,
              DataDeAtivacao: new Date(),
              Beneficio: service.Beneficio,
              Ativo: true
            }
          })
        })
      })

      serviceOrderData?.Combos.map(async (combo) => {
        let duplatedItemId = ''
        // verifica se o beneficio existe no veiculo ativo, caso sim atualiza
        if (
          activeVehicles[0].Combos.findIndex((activeBenefit) => {
            const validation = activeBenefit.Combo_Id === combo.Combo.Id
            if (validation) {
              duplatedItemId = activeBenefit.Id
            }

            return validation
          }) > -1
        ) {
          // atualizar o beneficio do veiculo
          await mutations.updateActiveVehicleCombo({
            Id: duplatedItemId,
            Ativo: true,
            ComboPreco_Id: combo.ComboPreco.Id
          })
          return
        }

        // inseri um beneficio para o veiculo ativo
        await mutations.insertActiveVehicleCombo({
          ComboPreco_Id: combo.ComboPreco.Id,
          Combo_Id: combo.Combo.Id,
          VeiculoAtivo_Id:
            response.data.update_clientes_VeiculosAtivos_by_pk.Id,
          Planos: combo.OSPlanos.map((plan) => {
            return {
              Ativo: true,
              DataDeAtivacao: new Date(),
              PlanoPreco_Id: plan.PlanoPreco_Id,
              Plano_Id: plan.Plano.Id,
              Produtos: {
                data: plan.OSProdutos.map((product) => {
                  return {
                    PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                    PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                    Produto_Id: product.Produto.Id,
                    VeiculoAtivo_Id:
                      response.data.update_clientes_VeiculosAtivos_by_pk.Id,
                    TipoItem_Id: product.TipoDeIdentificavel_Id,
                    Identificador: product.Identificavel_Id,
                    DataDeAtivacao: new Date(),
                    Quantidade: product.Quantidade,
                    Ativo: true
                  }
                })
              },
              Servicos: {
                data: plan.OSServicos.map((service) => {
                  return {
                    PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
                    PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
                    Servico_Id: service.Servico.Id,
                    VeiculoAtivo_Id:
                      response.data.update_clientes_VeiculosAtivos_by_pk.Id,
                    DataDeAtivacao: new Date(),
                    Beneficio: service.Beneficio,
                    Ativo: true
                  }
                })
              }
            }
          }),
          Produtos: combo.OSProdutos.map((product) => {
            return {
              PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
              PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
              Produto_Id: product.Produto.Id,
              VeiculoAtivo_Id:
                response.data.update_clientes_VeiculosAtivos_by_pk.Id,
              TipoItem_Id: product.TipoDeIdentificavel_Id,
              Identificador: product.Identificavel_Id,
              DataDeAtivacao: new Date(),
              Quantidade: product.Quantidade,
              Ativo: true
            }
          }),
          Servicos: combo.OSServicos.map((service) => {
            return {
              PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
              PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
              Servico_Id: service.Servico.Id,
              VeiculoAtivo_Id:
                response.data.update_clientes_VeiculosAtivos_by_pk.Id,
              DataDeAtivacao: new Date(),
              Beneficio: service.Beneficio,
              Ativo: true
            }
          })
        })
      })

      serviceOrderData?.Produtos.filter(
        (product) =>
          product.OrdemDeServicoCombo_Id === null &&
          product.OrdemDeServicoPlano_Id === null
      ).map(async (product) => {
        const item = productItens.filter(
          (productItem) => productItem.Id === product.Produto.Id
        )[0]
        // scheduleItem[0].
        await mutations.insertActiveVehicleProducts({
          PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
          Produto_Id: product.Produto.Id,
          VeiculoAtivo_Id:
            response.data.update_clientes_VeiculosAtivos_by_pk.Id,
          TipoItem_Id: item.TipoItem_Id,
          Identificador: item.Identificador,
          Quantidade: product.Quantidade
        })
      })

      serviceOrderData?.Servicos.filter(
        (service) =>
          service.OrdemDeServicoCombo_Id === null &&
          service.OrdemDeServicoPlano_Id === null
      ).map(async (service) => {
        if (service.Beneficio) {
          let duplatedItemId = ''
          // verifica se o beneficio existe no veiculo ativo, caso sim atualiza
          if (
            activeVehicles[0].Servicos.filter(
              (service) =>
                service.Beneficio &&
                service.VeiculoAtivoCombo_Id === null &&
                service.VeiculoAtivoPlano_Id === null
            ).findIndex((activeBenefit) => {
              const validation = activeBenefit.Servico_Id === service.Servico.Id
              if (validation) {
                duplatedItemId = activeBenefit.Id
              }

              return validation
            }) > -1
          ) {
            // atualizar o beneficio do veiculo
            await mutations.updateActiveVehicleService({
              Id: duplatedItemId,
              Ativo: true,
              PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
              PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id
            })
            return
          }
        }

        await mutations.insertActiveVehicleService({
          PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
          Servico_Id: service.Servico.Id,
          VeiculoAtivo_Id: response.data.update_clientes_VeiculosAtivos_by_pk.Id,
          Beneficio: service.Beneficio
        })
      })

      await mutations.finishServiceOrder({ OS_Id })
      setLoading(false)
      serviceOrderRefetch()
      serviceOrderActivitiesRefetch()
      setActiveEdit(false)
      utils.notification('Ordem de serviço finalizada com sucesso', 'success')

      return
    }

    const vehicleUUID = uuid()
    // caso o cliente não tenha o veiculo ativo ele cria um
    await mutations.insertActiveVehicle({
      Id: vehicleUUID,
      PossuiGNV: serviceOrderData.PossuiGNV,
      Veiculo_Id: serviceOrderData?.Veiculo_Id,
      Cliente_Id: client?.Id,
      Franquia_Id: null,
      OS_Id: serviceOrderData?.Id,
      Combos: serviceOrderData.Combos.map((combo) => {
        return {
          Ativo: true,
          ComboPreco_Id: combo.ComboPreco.Id,
          Combo_Id: combo.Combo.Id,
          DataDeAtivacao: new Date(),
          Planos: {
            data: combo.OSPlanos.map((plan) => {
              return {
                Ativo: true,
                Plano_Id: plan.Plano.Id,
                PlanoPreco_Id: plan.PlanoPreco_Id,
                DataDeAtivacao: new Date(),
                VeiculoAtivo_Id: vehicleUUID,
                Produtos: {
                  data: plan.OSProdutos.map((product) => {
                    return {
                      Produto_Id: product.Produto.Id,
                      PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                      PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                      TipoItem_Id: product.TipoDeIdentificavel_Id,
                      Identificador: product.Identificavel_Id,
                      DataDeAtivacao: new Date(),
                      Quantidade: product.Quantidade,
                      VeiculoAtivo_Id: vehicleUUID,
                      Ativo: true
                    }
                  })
                },
                Servicos: {
                  data: plan.OSServicos.map((service) => {
                    return {
                      PrecoDeAdesao_Id: service?.PrecoDeAdesao_Id,
                      PrecoDeRecorrencia_Id: service?.PrecoDeRecorrencia_Id,
                      Servico_Id: service.Servico.Id,
                      VeiculoAtivo_Id: vehicleUUID,
                      DataDeAtivacao: new Date(),
                      Beneficio: service.Beneficio,
                      Ativo: true
                    }
                  })
                }
              }
            })
          },
          Produtos: {
            data: combo.OSProdutos.map((product) => {
              return {
                Produto_Id: product.Produto.Id,
                PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                TipoItem_Id: product.TipoDeIdentificavel_Id,
                Identificador: product.Identificavel_Id,
                DataDeAtivacao: new Date(),
                Quantidade: product.Quantidade,
                VeiculoAtivo_Id: vehicleUUID,
                Ativo: true
              }
            })
          },
          Servicos: {
            data: combo.OSServicos.map((service) => {
              return {
                PrecoDeAdesao_Id: service?.PrecoDeAdesao_Id,
                PrecoDeRecorrencia_Id: service?.PrecoDeRecorrencia_Id,
                Servico_Id: service.Servico.Id,
                VeiculoAtivo_Id: vehicleUUID,
                DataDeAtivacao: new Date(),
                Beneficio: service.Beneficio,
                Ativo: true
              }
            })
          }
        }
      }),
      Planos: serviceOrderData.Planos.filter(
        (plan) => plan.OrdemDeServicoCombo_Id === null
      ).map((plan) => {
        return {
          Ativo: true,
          Plano_Id: plan.Plano.Id,
          PlanoPreco_Id: plan.PlanoPreco_Id,
          DataDeAtivacao: new Date(),
          Produtos: {
            data: plan.OSProdutos.map((product) => {
              return {
                Produto_Id: product.Produto.Id,
                PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                TipoItem_Id: product.TipoDeIdentificavel_Id,
                Identificador: product.Identificavel_Id,
                DataDeAtivacao: new Date(),
                Quantidade: product.Quantidade,
                VeiculoAtivo_Id: vehicleUUID,
                Ativo: true
              }
            })
          },
          Servicos: {
            data: plan.OSServicos.map((service) => {
              return {
                PrecoDeAdesao_Id: service?.PrecoDeAdesao_Id,
                PrecoDeRecorrencia_Id: service?.PrecoDeRecorrencia_Id,
                Servico_Id: service.Servico.Id,
                VeiculoAtivo_Id: vehicleUUID,
                DataDeAtivacao: new Date(),
                Beneficio: service.Beneficio,
                Ativo: true
              }
            })
          }
        }
      }),
      Produtos: serviceOrderData?.Produtos.filter(
        (product) =>
          product.OrdemDeServicoCombo_Id === null &&
          product.OrdemDeServicoPlano_Id === null
      ).map((product) => {
        // const item = productItens.filter(
        //   (productItem) => productItem.Id === product.Produto.Id
        // )[0]
        return {
          Produto_Id: product.Produto.Id,
          PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
          TipoItem_Id: product.TipoDeIdentificavel_Id,
          Identificador: product.Identificavel_Id,
          DataDeAtivacao: new Date(),
          Quantidade: product.Quantidade,
          Ativo: true
        }
      }),
      Servicos: serviceOrderData?.Servicos.filter(
        (service) =>
          service.OrdemDeServicoCombo_Id === null &&
          service.OrdemDeServicoPlano_Id === null
      ).map((service) => {
        return {
          Servico_Id: service.Servico.Id,
          PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
          DataDeAtivacao: new Date(),
          Beneficio: service.Beneficio,
          Ativo: true
        }
      })
    })

    // Conclui a OS
    await mutations.finishServiceOrder({ OS_Id })
    setLoading(false)
    serviceOrderRefetch()
    serviceOrderActivitiesRefetch()
    setActiveEdit(false)
    utils.notification('Ordem de serviço finalizada com sucesso', 'success')
  } catch (err) {
    setLoading(false)
    utils.showError(err)
  }
}

async function productsMovimentation(type: string, identifier_Id: string) {
  try {
    let chips = []
    let equipments = []
    let identifiers = []
    let trackers = []
    let inputKits = []
    let installationKits: InstallationKitsType[] = []
    switch (type) {
      case 'chips':
        chips = await queries.getChipIdentifierByItemId(
          identifier_Id,
          undefined,
          true
        )
        chips.map((chip) => {
          registerMovement(
            chip,
            1,
            'entrada',
            movimentacoes_Motivos_enum.desinstalacaoDeVeiculo
          )
        })
        break
      case 'equipamentos':
        equipments = await queries.getEquipmentIdentifierByItemId(
          identifier_Id,
          undefined,
          true
        )

        equipments.map((equipment) => {
          registerMovement(
            equipment,
            1,
            'entrada',
            movimentacoes_Motivos_enum.desinstalacaoDeVeiculo
          )
        })

        break
      case 'identificadores':
        identifiers = await queries.getIdentifierByItemId(
          identifier_Id,
          undefined,
          true
        )

        identifiers.map((identifierResponse) => {
          registerMovement(
            identifierResponse,
            1,
            'entrada',
            movimentacoes_Motivos_enum.desinstalacaoDeVeiculo
          )
        })

        break
      case 'rastreadores':
        trackers = await queries.getTrackerIdentifierByItemId(
          identifier_Id,
          undefined,
          true
        )

        trackers.map((tracker) => {
          registerMovement(
            tracker,
            1,
            'entrada',
            movimentacoes_Motivos_enum.desinstalacaoDeVeiculo
          )
        })

        break
      case 'kitsDeInsumo':
        inputKits = await queries.getInputKitsIdentifierByItemId(
          identifier_Id,
          undefined,
          true
        )

        inputKits.map((inputKit) => {
          registerMovement(
            inputKit,
            1,
            'entrada',
            movimentacoes_Motivos_enum.desinstalacaoDeVeiculo
          )
        })

        break
      case 'kitsDeInstalacao':
        installationKits = await queries.getInstallationKitsIdentifierByItemId(
          identifier_Id,
          undefined,
          true
        )

        await Promise.all(
          installationKits.map(async (installationKit) => {
            await mutations.updateInstallationKit({
              Id: installationKit.Id,
              Ativo: false,
              deleted_at: new Date()
            })
            await registerMovement(
              installationKit.Rastreador,
              1,
              'entrada',
              movimentacoes_Motivos_enum.desinstalacaoDeVeiculo
            )

            await Promise.all(
              installationKit.KitDeInsumo.Itens.map(async (item) => {
                if (item.Item.Produto.Nome === 'Chicote OBD') {
                  await registerMovement(
                    item,
                    item.Quantidade,
                    'entrada',
                    movimentacoes_Motivos_enum.desinstalacaoDeVeiculo
                  )
                }
              })
            )

            // registerMovement(
            //   installationKit,
            //   1,
            //   'entrada',
            //   movimentacoes_Motivos_enum.desinstalacaoDeVeiculo
            // )
          })
        )

        break
    }
  } catch (err) {
    utils.showError(err)
  }
}

export async function registerMovement(
  item: { Item: { Id: string } },
  amount: number,
  type: string,
  motive: movimentacoes_Motivos_enum
) {
  mutations
    .registerItemMovimentation({
      Quantidade: amount,
      Tipo: type,
      Item_Id: item.Item.Id,
      Motivo_Id: motive
    })
    .catch((err) => {
      utils.showError(err)
    })
}
