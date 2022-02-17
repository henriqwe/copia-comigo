import { useEffect, useState } from 'react'

import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'

import * as serviceOrders from '&erp/domains/operational/ServiceOrders'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as utils from '@comigo/utils'
import {
  BRLMoneyFormat,
  CNPJFormat,
  CPFFormat,
  ptBRtimeStamp
} from '@comigo/utils'

type ClientType = {
  Id: string
  Pessoa: {
    Nome: string
    PessoaJuridica: boolean
    Identificador: string
    DadosDaApi: {
      enderecos: {
        bairro: string
        cidade: string
        complemento: string
        estado: string
        logradouro: string
        numero: string
        pontoDeReferencia: string
      }[]
    }
  }
}

type CollectionType = {
  Name: string
  MembershipPrice: string | number
  RecurrencePrice: string | number
  Type: string
}

type ProductCollectionType = Omit<CollectionType, 'Type'> & {
  Identifier: string
  ItemId: string
  Retirado: string
}

type VehicleType = {
  Id: string
  Placa?: string
  NumeroDoChassi?: string
  Apelido?: string
}

type ProductItensType = {
  Id: string
  TipoItem_Id: string
  Identificador: string
}

export function Update() {
  const [activeEdit, setActiveEdit] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [accessionValue, setAccessionValue] = useState('0')
  const [benefitsValue, setBenefitsValue] = useState('0')
  const [client, setClient] = useState<ClientType>()
  const [benefits, setBenefits] = useState<CollectionType[]>()
  const [vehicle, setVehicle] = useState<VehicleType>()
  const [productCollection, setProductCollection] =
    useState<ProductCollectionType[]>()
  const [servicesCollection, setServicesCollection] =
    useState<Omit<CollectionType, 'Type'>[]>()
  const [productItens, setProductItens] = useState<ProductItensType[]>([])
  const {
    serviceOrderData,
    serviceOrderRefetch,
    rejectServiceOrder,
    rejectServiceOrderLoading,
    rejectSchema,
    getProposalClient,
    setSlidePanelState,
    serviceOrderActivitiesRefetch,
    getServiceOrderVehicle,
    getPlanById,
    getComboById,
    getServiceById,
    insertActiveVehicle,
    insertActiveVehicleBenefit,
    updateActiveVehicle,
    getActiveVehicles,
    updateActiveVehicleBenefit,
    insertActiveVehicleService,
    insertActiveVehicleProducts,
    disableActiveVehicle,
    initializeServiceOrders,
    initializeServiceOrdersLoading,
    concludeServiceOrder,
    concludeServiceOrderLoading,
    finishServiceOrder,
    finishServiceOrderLoading,
    getItemIdByProductId,
    getChipIdentifierByItemId,
    getEquipmentIdentifierByItemId,
    getIdentifierByItemId,
    getTrackerIdentifierByItemId,
    getInputKitsIdentifierByItemId,
    getInstallationKitsIdentifierByItemId,
    registerItemMovimentation,
    updateServiceOrdersSchedule,
    updateServiceOrdersScheduleLoading,
    updateServiceOrderScheduleItem,
    getServicePriceById,
    getProductPriceById,
    updateChip,
    updateEquipment,
    updateIdentifier,
    updateTracker,
    updateInputKit,
    updateInstallationKit,
    getItemById,
    updateServiceOrdersProduct
  } = serviceOrders.useUpdate()
  const address = client?.Pessoa.DadosDaApi.enderecos[0]

  const {
    register: rejectRegister,
    formState: { errors: rejectErros },
    handleSubmit: rejectSubmit
  } = useForm({ resolver: yupResolver(rejectSchema) })

  const tableColumns = [
    {
      title: 'Nome',
      fieldName: 'Name'
    },
    {
      title: 'Adesão',
      fieldName: 'MembershipPrice',
      type: 'handler' as 'handler' | 'date' | 'relationship',
      handler: (price: string) => BRLMoneyFormat(price)
    },
    {
      title: 'Recorrência',
      fieldName: 'RecurrencePrice',
      type: 'handler' as 'handler' | 'date' | 'relationship',
      handler: (price: string) => BRLMoneyFormat(price)
    }
  ]

  const productTableColumns = [
    ...tableColumns,
    {
      title: 'Identificador',
      fieldName: 'Identifier',
      type: 'handler' as 'handler' | 'date' | 'relationship',
      handler: (value: string) => (value ? value : '')
    },
    {
      title: 'Item de Estoque',
      fieldName: 'ItemId',
      type: 'handler' as 'handler' | 'date' | 'relationship',
      handler: (value: string) => (value ? value : '')
    },
    {
      title: 'Retirado',
      fieldName: 'Retirado',
      type: 'handler' as 'handler' | 'date' | 'relationship',
      handler: (value: string) => (value ? value : '')
    }
  ]

  async function finishServiceOrderSubmit() {
    // Pega os veiculos ativos desse cliente
    await getActiveVehicles(client!.Id, vehicle!.Id)
      .then(async (activeVehicles) => {
        // Conclui a OS
        await finishServiceOrder()
          .then(async () => {
            // Se esse cliente já tiver um veiculo ativo entra no if para atualizar
            if (activeVehicles.length > 0) {
              if (serviceOrderData?.Tipo.Valor === 'desinstalacao') {
                await disableActiveVehicle({
                  variables: {
                    Id: activeVehicles[0].Id
                  }
                })
                serviceOrderData?.Servicos.map(async (service) => {
                  await insertActiveVehicleService({
                    variables: {
                      PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
                      PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
                      Servico_Id: service.Servico.Id,
                      VeiculoAtivo_Id: activeVehicles[0].Id
                    }
                  })
                })
                return
              }
              // Atualiza o veiculo
              await updateActiveVehicle({
                variables: {
                  Id: activeVehicles[0].Id
                }
              })
                .then((response) => {
                  serviceOrderData?.Beneficios.map(async (benefit) => {
                    let duplatedItemId = ''
                    // verifica se o beneficio existe no veiculo ativo, caso sim atualiza
                    if (
                      activeVehicles[0].Beneficios.findIndex(
                        (activeBenefit) => {
                          const validation =
                            activeBenefit.Portfolio_Id ===
                              benefit.Portfolio_Id &&
                            activeBenefit.TipoPortfolio ===
                              benefit.TipoPortfolio
                          if (validation) {
                            duplatedItemId = activeBenefit.Id
                          }

                          return validation
                        }
                      ) > -1
                    ) {
                      // atualizar o beneficio do veiculo
                      await updateActiveVehicleBenefit({
                        variables: {
                          Id: duplatedItemId,
                          PortfolioPreco_Id: benefit.PortfolioPreco_Id,
                          PrecoDeAdesao_Id: benefit.PrecoDeAdesao_Id,
                          PrecoDeRecorrencia_Id: benefit.PrecoDeRecorrencia_Id
                        }
                      })
                      return
                    }

                    // inseri um beneficio para o veiculo ativo
                    await insertActiveVehicleBenefit({
                      variables: {
                        Portfolio_Id: benefit.Portfolio_Id,
                        TipoPortfolio: benefit.TipoPortfolio,
                        PortfolioPreco_Id: benefit.PortfolioPreco_Id,
                        PrecoDeAdesao_Id: benefit.PrecoDeAdesao_Id,
                        PrecoDeRecorrencia_Id: benefit.PrecoDeRecorrencia_Id,
                        VeiculoAtivo_Id:
                          response!.data.update_clientes_VeiculosAtivos_by_pk
                            .Id,
                        Ativo: true
                      }
                    })
                  })
                  serviceOrderData?.Produtos.map(async (product) => {
                    const item = productItens.filter(
                      (productItem) => productItem.Id === product.Produto.Id
                    )[0]
                    // scheduleItem[0].
                    await insertActiveVehicleProducts({
                      variables: {
                        PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                        PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                        Produto_Id: product.Produto.Id,
                        VeiculoAtivo_Id:
                          response!.data.update_clientes_VeiculosAtivos_by_pk
                            .Id,
                        TipoItem_Id: item.TipoItem_Id,
                        Identificador: item.Identificador
                      }
                    })
                  })

                  serviceOrderData?.Servicos.map(async (service) => {
                    await insertActiveVehicleService({
                      variables: {
                        PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
                        PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
                        Servico_Id: service.Servico.Id,
                        VeiculoAtivo_Id:
                          response!.data.update_clientes_VeiculosAtivos_by_pk.Id
                      }
                    })
                  })
                })
                .catch((err) => {
                  utils.showError(err)
                })
              return
            }
            // caso o cliente não tenha o veiculo ativo ele cria um
            await insertActiveVehicle({
              variables: {
                Veiculo_Id: serviceOrderData?.Veiculo_Id,
                Cliente_Id: client?.Id,
                Franquia_Id: null,
                OS_Id: serviceOrderData?.Id,
                Beneficios: serviceOrderData?.Beneficios.map((benefit) => {
                  return {
                    Portfolio_Id: benefit.Portfolio_Id,
                    TipoPortfolio: benefit.TipoPortfolio,
                    PortfolioPreco_Id: benefit.PortfolioPreco_Id,
                    PrecoDeAdesao_Id: benefit.PrecoDeAdesao_Id,
                    PrecoDeRecorrencia_Id: benefit.PrecoDeRecorrencia_Id,
                    Ativo: true
                  }
                }),
                Produtos: serviceOrderData?.Produtos.map((product) => {
                  const item = productItens.filter(
                    (productItem) => productItem.Id === product.Produto.Id
                  )[0]
                  return {
                    Produto_Id: product.Produto.Id,
                    PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
                    PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id,
                    TipoItem_Id: item.TipoItem_Id,
                    Identificador: item.Identificador,
                    Ativo: true
                  }
                }),
                Servicos: serviceOrderData?.Servicos.map((service) => {
                  return {
                    Servico_Id: service.Servico.Id,
                    PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
                    PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id,
                    Ativo: true
                  }
                })
              }
            }).catch((err) => {
              utils.showError(err)
            })
          })
          .then(() => {
            serviceOrderRefetch()
            serviceOrderActivitiesRefetch()
            setActiveEdit(false)
            utils.notification(
              'Ordem de serviço finalizada com sucesso',
              'success'
            )
          })
          .catch((err) => {
            utils.showError(err)
          })
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  async function movimentationSubmit() {
    serviceOrderData.Agendamentos[0].Itens.map((item) => {
      registerItemMovimentation({
        variables: {
          Quantidade: 1,
          Tipo: 'saida',
          Item_Id: item.Item.Id,
          Motivo_Id: 'agendamentoDeOS'
        }
      }).catch((err) => {
        utils.showError(err)
      })
      updateServiceOrderScheduleItem({
        variables: {
          Id: item.Id,
          RetiradoDoEstoque: true
        }
      }).catch((err) => {
        utils.showError(err)
      })
    })
    await updateServiceOrdersSchedule({
      variables: {
        Id: serviceOrderData?.Agendamentos[0].Id
      }
    })
      .then(() => {
        serviceOrderRefetch()
        setActiveEdit(false)
        utils.notification('Itens retirados com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  async function initializeServiceOrdersSubmit() {
    await initializeServiceOrders({
      variables: {
        Id: serviceOrderData?.Agendamentos[0].Id
      }
    })
      .then(() => {
        serviceOrderRefetch()
        setActiveEdit(false)
        utils.notification('Serviços iniciados com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  async function concludeServiceOrdersSubmit() {
    await concludeServiceOrder({
      variables: {
        Id: serviceOrderData?.Agendamentos[0].Id
      }
    })
      .then(() => {
        serviceOrderRefetch()
        setActiveEdit(false)
        utils.notification('Serviços concluidos com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  async function rejectServiceOrderSubmit(formData: {
    MotivoRecusado: string
  }) {
    await rejectServiceOrder({
      variables: {
        Id: serviceOrderData?.Agendamentos[0].Id,
        MotivoRecusado: formData.MotivoRecusado
      }
    })
      .then(async () => {
        const productsItensIds = productItens.map(
          (product) => product.Identificador
        )
        await Promise.all(
          serviceOrderData.Agendamentos[0].Itens.map(async (item) => {
            await Promise.all(
              item.Item.Chips.map(async (chip) => {
                if (productsItensIds.includes(chip.Id)) {
                  await updateChip({
                    variables: {
                      Id: chip.Id,
                      Ativo: false
                    }
                  })
                }
              })
            )

            await Promise.all(
              item.Item.Equipamentos.map(async (equipment) => {
                if (productsItensIds.includes(equipment.Id)) {
                  await updateEquipment({
                    variables: {
                      Id: equipment.Id,
                      Ativo: false
                    }
                  })
                }
              })
            )

            await Promise.all(
              item.Item.Identificadores.map(async (identifier) => {
                if (productsItensIds.includes(identifier.Id)) {
                  await updateIdentifier({
                    variables: {
                      Id: identifier.Id,
                      Ativo: false
                    }
                  })
                }
              })
            )

            await Promise.all(
              item.Item.Rastreadores.map(async (tracker) => {
                if (productsItensIds.includes(tracker.Id)) {
                  await updateTracker({
                    variables: {
                      Id: tracker.Id,
                      Ativo: false
                    }
                  })
                }
              })
            )

            await Promise.all(
              item.Item.KitsDeInsumo.map(async (inputKit) => {
                if (productsItensIds.includes(inputKit.Id)) {
                  await updateInputKit({
                    variables: {
                      Id: inputKit.Id,
                      Ativo: false
                    }
                  })
                }
              })
            )

            await Promise.all(
              item.Item.KitsDeInstalacao.map(async (installationKit) => {
                if (productsItensIds.includes(installationKit.Id)) {
                  await updateInstallationKit({
                    variables: {
                      Id: installationKit.Id,
                      Ativo: false
                    }
                  })
                }
              })
            )
            await Promise.all(
              serviceOrderData.Produtos.map(async (product) => {
                await updateServiceOrdersProduct({
                  variables: {
                    Id: product.Id,
                    Identificavel_Id: null,
                    TipoDeIdentificavel_Id: null
                  }
                })
              })
            )

            if (item.RetiradoDoEstoque) {
              registerItemMovimentation({
                variables: {
                  Quantidade: 1,
                  Tipo: 'entrada',
                  Item_Id: item.Item.Id,
                  Motivo_Id: 'frustracaoDeOS'
                }
              }).catch((err) => {
                utils.showError(err)
              })

              updateServiceOrderScheduleItem({
                variables: {
                  Id: item.Id,
                  RetiradoDoEstoque: false
                }
              }).catch((err) => {
                utils.showError(err)
              })
            }
          })
        )
        serviceOrderRefetch()
        serviceOrderActivitiesRefetch()
        setActiveEdit(false)
        setShowModal(false)
        utils.notification('Ordem de serviço frustrada com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  async function getBenefits() {
    const benefits = serviceOrderData?.Beneficios.map(async (benefit) => {
      switch (benefit.TipoPortfolio) {
        case 'serviço':
          return await getServiceById(
            benefit.Portfolio_Id,
            benefit.PrecoDeAdesao_Id,
            benefit.PrecoDeRecorrencia_Id
          ).then((response) => {
            return {
              Name: response?.service?.Nome as string,
              MembershipPrice: response?.price ? response?.price.Valor : 0,
              RecurrencePrice: response?.secondPrice
                ? response?.secondPrice.Valor
                : 0,
              Type: 'serviço'
            }
          })
        case 'plano':
          return await getPlanById(
            benefit.Portfolio_Id,
            benefit.PortfolioPreco_Id
          ).then((response) => {
            return {
              Name: response?.plan?.Nome as string,
              MembershipPrice: response?.price.ValorDeAdesao,
              RecurrencePrice: response?.price.ValorDeRecorrencia,
              Type: 'plano'
            }
          })
        case 'combo':
          return await getComboById(
            benefit.Portfolio_Id,
            benefit.PortfolioPreco_Id
          ).then((response) => {
            return {
              Name: response?.combo?.Nome as string,
              MembershipPrice: response?.price.ValorDeAdesao,
              RecurrencePrice: response?.price.ValorDeRecorrencia,
              Type: 'combo'
            }
          })
      }
    })
    ;(async () => {
      const benefitsArray = await Promise.all(benefits as any)
      setBenefits(benefitsArray)
    })()
  }

  async function getAccessionTotalValue() {
    let totalPrice = 0
    benefits?.map((benefit) => {
      totalPrice += Number(benefit.MembershipPrice)
    })
    await Promise.all(
      serviceOrderData.Produtos?.map(async (product) => {
        if (product.PrecoDeAdesao_Id) {
          const price = await getProductPriceById(product.PrecoDeAdesao_Id)
          totalPrice += Number(price.Valor)
        }
      })
    )
    await Promise.all(
      serviceOrderData.Servicos?.map(async (service) => {
        if (service.PrecoDeAdesao_Id) {
          const price = await getServicePriceById(service.PrecoDeAdesao_Id)
          totalPrice += Number(price.Valor)
        }
      })
    )
    setAccessionValue(BRLMoneyFormat(totalPrice))
  }

  async function getBenefitsTotalValue() {
    let totalPrice = 0

    benefits?.map((benefit) => {
      totalPrice += Number(benefit.RecurrencePrice)
    })

    await Promise.all(
      serviceOrderData.Produtos?.map(async (product) => {
        if (product.PrecoDeRecorrencia_Id) {
          const price = await getProductPriceById(product.PrecoDeRecorrencia_Id)
          totalPrice += Number(price.Valor)
        }
      })
    )
    await Promise.all(
      serviceOrderData.Servicos?.map(async (service) => {
        if (service.PrecoDeRecorrencia_Id) {
          const price = await getServicePriceById(service.PrecoDeRecorrencia_Id)
          totalPrice += Number(price.Valor)
        }
      })
    )
    setBenefitsValue(BRLMoneyFormat(totalPrice))
  }

  function getVehicle() {
    getServiceOrderVehicle(serviceOrderData?.Veiculo_Id as string).then(
      (vehicle) => {
        setVehicle(vehicle)
      }
    )
  }

  function getOSSituation() {
    if (serviceOrderData?.Situacao.Comentario === 'agendada') {
      switch (serviceOrderData.Agendamentos[0].Situacao.Valor) {
        case 'criada':
          return 'Agendamento criado'
        case 'iniciada':
          return 'Serviços iniciados'
        case 'concluida':
          return 'Serviços concluidos'
        case 'frustada':
          return 'Agendamento frustrado'
        default:
          break
      }
    }
    return serviceOrderData?.Situacao.Comentario
  }

  useEffect(() => {
    if (serviceOrderData) {
      getProposalClient(serviceOrderData.Proposta?.Cliente_Id as string).then(
        (client) => {
          setClient(client)
        }
      )

      getBenefits()
      getVehicle()

      const productsItens = []

      const products = serviceOrderData.Produtos.map(async (product) => {
        const scheduleItem = await getItemIdByProductId(product.Produto.Id)
        let identifier = ''
        let itemName = ''
        if (
          serviceOrderData.Situacao.Valor !== 'aberta' &&
          serviceOrderData.Situacao.Valor !== 'cancelada' &&
          serviceOrderData.Situacao.Valor !== 'frustada'
        ) {
          switch (product.TipoDeIdentificavel_Id) {
            case 'chips':
              await getChipIdentifierByItemId(
                scheduleItem[0].Item_Id,
                true,
                product.Identificavel_Id
              ).then((chip) => {
                if (chip.length > 0) {
                  productsItens.push({
                    Id: product.Produto.Id,
                    TipoItem_Id: 'chips',
                    Identificador: chip[0].Id
                  })
                  identifier = utils.phoneFormat(chip[0].NumeroDaLinha)
                  itemName = chip[0].Item.Produto.Nome
                }
              })
              break
            case 'equipamentos':
              await getEquipmentIdentifierByItemId(
                scheduleItem[0].Item_Id,
                true,
                product.Identificavel_Id
              ).then((equipment) => {
                if (equipment.length > 0) {
                  productsItens.push({
                    Id: product.Produto.Id,
                    TipoItem_Id: 'equipamentos',
                    Identificador: equipment[0].Id
                  })
                  identifier = equipment[0].Imei
                  itemName = equipment[0].Item.Produto.Nome
                }
              })
              break
            case 'identificadores':
              await getIdentifierByItemId(
                scheduleItem[0].Item_Id,
                true,
                product.Identificavel_Id
              ).then((identifierResponse) => {
                if (identifierResponse.length > 0) {
                  productsItens.push({
                    Id: product.Produto.Id,
                    TipoItem_Id: 'identificadores',
                    Identificador: identifierResponse[0].Id
                  })
                  identifier =
                    identifierResponse[0].CodigoIdentificador.toString()
                  itemName = identifierResponse[0].Item.Produto.Nome
                }
              })
              break
            case 'rastreadores':
              await getTrackerIdentifierByItemId(
                scheduleItem[0].Item_Id,
                true,
                product.Identificavel_Id
              ).then((tracker) => {
                if (tracker.length > 0) {
                  productsItens.push({
                    Id: product.Produto.Id,
                    TipoItem_Id: 'rastreadores',
                    Identificador: tracker[0].Id
                  })
                  identifier =
                    'RTDR - ' +
                    tracker[0].CodigoReferencia +
                    ' - ' +
                    utils.phoneFormat(tracker[0].Chip.NumeroDaLinha) +
                    ' - ' +
                    tracker[0].Equipamento.Imei
                  itemName = tracker[0].Item.Produto.Nome
                }
              })
              break
            case 'kitsDeInsumo':
              await getInputKitsIdentifierByItemId(
                scheduleItem[0].Item_Id,
                true,
                product.Identificavel_Id
              ).then((inputKit) => {
                if (inputKit.length > 0) {
                  productsItens.push({
                    Id: product.Produto.Id,
                    TipoItem_Id: 'kitsDeInsumo',
                    Identificador: inputKit[0].Id
                  })
                  identifier = 'KTISM - ' + inputKit[0].CodigoReferencia
                  itemName = inputKit[0].Item.Produto.Nome
                }
              })
              break
            case 'kitsDeInstalacao':
              await getInstallationKitsIdentifierByItemId(
                scheduleItem[0].Item_Id,
                true,
                product.Identificavel_Id
              ).then((installationKit) => {
                if (installationKit.length > 0) {
                  productsItens.push({
                    Id: product.Produto.Id,
                    TipoItem_Id: 'kitsDeInstalacao',
                    Identificador: installationKit[0].Id
                  })
                  identifier =
                    'KTIST - ' +
                    installationKit[0].CodigoReferencia +
                    ' - ' +
                    utils.phoneFormat(
                      installationKit[0].Rastreador.Chip.NumeroDaLinha
                    ) +
                    ' - ' +
                    installationKit[0].Rastreador.Equipamento.Imei
                  itemName = installationKit[0].Item.Produto.Nome
                }
              })
              break
            default:
              identifier = '-'
              itemName = (await getItemById(scheduleItem[0].Item_Id)).Produto
                .Nome
              productsItens.push({
                Id: product.Produto.Id,
                TipoItem_Id: null,
                Identificador: null
              })
              break
          }
        }

        return {
          Name: product.Produto.Nome,
          MembershipPrice: product.PrecoDeAdesao_Id
            ? (await getProductPriceById(product.PrecoDeAdesao_Id)).Valor
            : 0,
          RecurrencePrice: product.PrecoDeRecorrencia_Id
            ? (await getProductPriceById(product.PrecoDeRecorrencia_Id)).Valor
            : 0,
          Identifier: identifier,
          ItemId: itemName,
          Retirado:
            (serviceOrderData.Agendamentos.length > 0
              ? serviceOrderData.Agendamentos[0].Situacao.Valor
              : false) !== 'criada' &&
            serviceOrderData.Situacao.Valor !== 'aberta' &&
            serviceOrderData.Situacao.Valor !== 'frustada'
              ? 'Sim'
              : 'Não'
        }
      })

      ;(async () => {
        setProductCollection(await Promise.all(products))
        setProductItens(productsItens)
      })()
    }
  }, [serviceOrderData])

  useEffect(() => {
    if (serviceOrderData) {
      const collection = serviceOrderData.Servicos.filter(
        (service) => service.Servico.GeraOS
      ).map(async (service) => {
        const membershipPrice = service.PrecoDeAdesao_Id
          ? await getServicePriceById(service.PrecoDeAdesao_Id)
          : { Valor: 0 }
        const recurrencePrice = service.PrecoDeRecorrencia_Id
          ? await getServicePriceById(service.PrecoDeRecorrencia_Id)
          : { Valor: 0 }
        return {
          Name: service.Servico.Nome,
          MembershipPrice: membershipPrice.Valor,
          RecurrencePrice: recurrencePrice.Valor
        }
      })

      ;(async () => {
        setServicesCollection(await Promise.all(collection))
      })()
    }
  }, [serviceOrderData])

  useEffect(() => {
    if (benefits) {
      getBenefitsTotalValue()
      getAccessionTotalValue()
    }
  }, [benefits])

  return (
    <div className="flex flex-col col-span-12 gap-4">
      <header className="flex justify-between">
        <div>
          <h3 className="text-xl text-gray-600 dark:text-zinc-400">
            Dados gerais
          </h3>
          <p>
            {address?.logradouro} - {address?.numero} - {address?.bairro} -{' '}
            {address?.cidade} - {address?.estado}
          </p>
          <div className="flex gap-4">
            <p>Tipo da OS: {serviceOrderData?.Tipo.Comentario}</p>
          </div>

          <p>
            Situação:{' '}
            <span
              className={`${
                serviceOrderData?.Situacao.Valor === 'cancelada'
                  ? 'text-primary-3'
                  : 'text-primary-9'
              }`}
            >
              {getOSSituation()}
            </span>
          </p>

          {(serviceOrderData?.Agendamentos?.length || 0) > 0 && (
            <p>
              Data de agendamento:{' '}
              {ptBRtimeStamp(
                serviceOrderData?.Agendamentos[0].Agendamento as Date
              )}
            </p>
          )}
          <p>
            Veículo: {vehicle?.Apelido}{' '}
            {vehicle?.Placa ? vehicle.Placa : vehicle?.NumeroDoChassi}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <h3 className="text-xl text-gray-600 dark:text-zinc-400">
            Detalhes do cliente
          </h3>
          <p className="text-lg font-bold">{client?.Pessoa.Nome}</p>
          <p className="text-sm">
            {client?.Pessoa.PessoaJuridica ? 'CNPJ: ' : 'CPF: '}{' '}
            {client?.Pessoa.PessoaJuridica
              ? CNPJFormat(client?.Pessoa.Identificador)
              : CPFFormat(client?.Pessoa.Identificador as string)}
          </p>
        </div>
      </header>

      <form>
        <common.Separator className="mb-4" />
        <div>
          <h3 className="text-xl font-bold">Serviços</h3>

          {serviceOrderData?.Servicos ? (
            <blocks.Table
              colection={servicesCollection}
              columnTitles={tableColumns}
            />
          ) : (
            <blocks.TableSkeleton />
          )}
        </div>
        <common.Separator className="mt-4 mb-4" />
        <div>
          <h3 className="text-xl font-bold">Produtos</h3>

          {serviceOrderData?.Produtos ? (
            <blocks.Table
              colection={productCollection}
              columnTitles={productTableColumns}
            />
          ) : (
            <blocks.TableSkeleton />
          )}
        </div>
        <common.Separator className="mt-4" />
        <h3 className="text-xl">Beneficios contratados</h3>
        {benefits ? (
          <blocks.Table colection={benefits} columnTitles={tableColumns} />
        ) : (
          <blocks.TableSkeleton />
        )}
      </form>
      <common.Separator className="mt-0 mb-2" />

      <div className="flex justify-between">
        <div>
          <h3 className="text-xl text-gray-600 dark:text-zinc-400">
            Dados gerais
          </h3>

          <p>Recorrência: Mensal</p>
          <p>Valor: {benefitsValue}</p>
          <common.Separator className="my-2" />
          <p>Pagamento de adesão: Recibo</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-lg text-gray-600 dark:text-zinc-400">Adesão</p>
          <p className="text-2xl font-bold">
            Total: <span className="text-primary-4">{accessionValue}</span>
          </p>
        </div>
      </div>

      <common.Separator />

      <div className="flex">
        <div className="flex items-center w-2/6 gap-4">
          <common.buttons.GoBackButton />
          <common.buttons.PrimaryButton
            title={'Ver atividades'}
            onClick={() => {
              event?.preventDefault()
              if (!activeEdit) {
                setSlidePanelState({
                  open: true,
                  type: 'activities'
                })
                return
              }
            }}
          />
          <common.buttons.CancelButton
            onClick={() => setShowModal(true)}
            title="Frustrar"
            disabled={
              rejectServiceOrderLoading ||
              serviceOrderData?.Situacao.Valor !== 'agendada' ||
              serviceOrderData?.Agendamentos[0].Situacao.Valor === 'frustada' ||
              serviceOrderData?.Agendamentos[0].Situacao.Valor === 'concluida'
            }
            loading={rejectServiceOrderLoading}
          />
        </div>
        <div className="flex items-center justify-end w-4/6 gap-4">
          {(serviceOrderData?.Situacao.Valor === 'aberta' ||
            serviceOrderData?.Situacao.Valor === 'frustada') && (
            <common.buttons.PrimaryButton
              title={'Agendar'}
              onClick={() => {
                event?.preventDefault()
                if (!activeEdit) {
                  setSlidePanelState({
                    open: true,
                    type: 'schedule'
                  })
                  return
                }
              }}
            />
          )}

          {(serviceOrderData?.Agendamentos.length || 0) > 0 ? (
            <>
              {serviceOrderData?.Agendamentos[0].Situacao.Valor ===
                'criada' && (
                <common.buttons.SecondaryButton
                  handler={movimentationSubmit}
                  title="Retirar itens"
                  disabled={
                    updateServiceOrdersScheduleLoading ||
                    serviceOrderData?.Situacao.Valor !== 'agendada'
                  }
                  loading={updateServiceOrdersScheduleLoading}
                />
              )}
              {serviceOrderData?.Agendamentos[0].Situacao.Valor ===
                'itensRetirados' && (
                <common.buttons.SecondaryButton
                  handler={initializeServiceOrdersSubmit}
                  title="Iniciar serviço"
                  disabled={
                    initializeServiceOrdersLoading ||
                    serviceOrderData?.Situacao.Valor !== 'agendada'
                  }
                  loading={initializeServiceOrdersLoading}
                />
              )}
              {serviceOrderData?.Agendamentos[0].Situacao.Valor ===
                'iniciada' && (
                <common.buttons.SecondaryButton
                  handler={concludeServiceOrdersSubmit}
                  title="Concluir serviço"
                  disabled={
                    concludeServiceOrderLoading ||
                    serviceOrderData?.Situacao.Valor !== 'agendada'
                  }
                  loading={concludeServiceOrderLoading}
                />
              )}
              {serviceOrderData?.Agendamentos[0].Situacao.Valor ===
                'concluida' && (
                <common.buttons.SecondaryButton
                  handler={finishServiceOrderSubmit}
                  title="Finalizar ordem de serviço"
                  disabled={
                    finishServiceOrderLoading ||
                    serviceOrderData?.Situacao.Valor !== 'agendada'
                  }
                  loading={finishServiceOrderLoading}
                />
              )}
            </>
          ) : null}
        </div>
        <common.Modal
          handleSubmit={rejectSubmit(rejectServiceOrderSubmit)}
          open={showModal}
          disabled={rejectServiceOrderLoading}
          description="Deseja mesmo frustrar o agendamento dessa ordem de serviço?"
          onClose={() => setShowModal(false)}
          buttonTitle="Frustrar o agendamento ordem de serviço"
          modalTitle="Frustrar o agendamento ordem de serviço?"
          color="red"
        >
          <div className="my-2">
            <common.form.Input
              fieldName="MotivoRecusado"
              title="Motivo da recusa"
              register={rejectRegister}
              error={rejectErros.MotivoRecusado}
            />
          </div>
        </common.Modal>
      </div>

      <serviceOrders.UpdateSlidePanel />
    </div>
  )
}
