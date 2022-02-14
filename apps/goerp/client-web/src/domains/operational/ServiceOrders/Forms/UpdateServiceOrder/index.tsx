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
    insertActiveVehicleLoading,
    insertActiveVehicleBenefit,
    insertActiveVehicleBenefitLoading,
    updateActiveVehicle,
    updateActiveVehicleLoading,
    getActiveVehicles,
    updateActiveVehicleBenefit,
    updateActiveVehicleBenefitLoading,
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
    registerItemMovimentationLoading,
    updateServiceOrdersSchedule,
    updateServiceOrdersScheduleLoading,
    updateServiceOrderScheduleItem
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
                      ServicoPreco_Id: service.ServicoPreco.Id,
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
                          PortfolioPreco_Id: benefit.PortfolioPreco_Id
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
                        VeiculoAtivo_Id:
                          response!.data.update_clientes_VeiculosAtivos_by_pk
                            .Id,
                        Ativo: true
                      }
                    })
                  })
                  serviceOrderData?.Produtos.map(async (product) => {
                    await insertActiveVehicleProducts({
                      variables: {
                        ProdutoPreco_Id: product.ProdutoPreco.Id,
                        Produto_Id: product.Produto.Id,
                        VeiculoAtivo_Id:
                          response!.data.update_clientes_VeiculosAtivos_by_pk.Id
                      }
                    })
                  })

                  serviceOrderData?.Servicos.map(async (service) => {
                    await insertActiveVehicleService({
                      variables: {
                        ServicoPreco_Id: service.ServicoPreco.Id,
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
                    Ativo: true
                  }
                }),
                Produtos: serviceOrderData?.Produtos.map((product) => {
                  return {
                    Produto_Id: product.Produto.Id,
                    ProdutoPreco_Id: product.ProdutoPreco.Id,
                    Ativo: true
                  }
                }),
                Servicos: serviceOrderData?.Servicos.map((service) => {
                  return {
                    Servico_Id: service.Servico.Id,
                    ServicoPreco_Id: service.ServicoPreco.Id,
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
          Item_Id: item.Item_Id,
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
      .then(() => {
        serviceOrderData.Agendamentos[0].Itens.map((item) => {
          if (item.RetiradoDoEstoque) {
            registerItemMovimentation({
              variables: {
                Quantidade: 1,
                Tipo: 'entrada',
                Item_Id: item.Item_Id,
                Motivo_Id: 'frustracaoDeOS'
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
          }
        })
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
            benefit.PortfolioPreco_Id
          ).then((response) => {
            return {
              Name: response?.service?.Nome as string,
              MembershipPrice:
                response?.price.TipoDePreco.Valor === 'adesao'
                  ? response?.price.Valor
                  : 0,
              RecurrencePrice:
                response?.price.TipoDePreco.Valor === 'recorrencia'
                  ? response?.price.Valor
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

  function getAccessionTotalValue() {
    let totalPrice = 0
    benefits?.map((benefit) => {
      totalPrice += Number(benefit.MembershipPrice)
    })
    serviceOrderData.Produtos?.map((product) => {
      if (product.ProdutoPreco.TipoDePreco.Valor === 'adesao') {
        totalPrice += Number(product.ProdutoPreco.Valor)
      }
    })
    serviceOrderData.Servicos?.map((service) => {
      if (service.ServicoPreco.TipoDePreco.Valor === 'adesao') {
        totalPrice += Number(service.ServicoPreco.Valor)
      }
    })
    setAccessionValue(BRLMoneyFormat(totalPrice))
  }

  function getBenefitsTotalValue() {
    let totalPrice = 0

    benefits?.map((benefit) => {
      totalPrice += Number(benefit.RecurrencePrice)
    })

    serviceOrderData.Produtos?.map((product) => {
      if (product.ProdutoPreco.TipoDePreco.Valor === 'adesao') {
        totalPrice += Number(product.ProdutoPreco.Valor)
      }
    })
    serviceOrderData.Servicos?.map((service) => {
      if (service.ServicoPreco.TipoDePreco.Valor === 'recorrencia') {
        totalPrice += Number(service.ServicoPreco.Valor)
      }
    })
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

      const products = serviceOrderData.Produtos.map(async (product) => {
        const scheduleItem = await getItemIdByProductId(product.Produto.Id)
        let identifier = ''
        let itemName = ''
        if (
          serviceOrderData.Situacao.Valor !== 'aberta' &&
          serviceOrderData.Situacao.Valor !== 'cancelada'
        ) {
          switch (scheduleItem[0].TipoDeItem_Id) {
            case 'chips':
              await getChipIdentifierByItemId(scheduleItem[0].Item_Id).then(
                (chip) => {
                  identifier = utils.phoneFormat(chip[0].NumeroDaLinha)
                  itemName = chip[0].Item.Produto.Nome
                }
              )
              break
            case 'equipamentos':
              await getEquipmentIdentifierByItemId(
                scheduleItem[0].Item_Id
              ).then((equipment) => {
                identifier = equipment[0].Imei
                itemName = equipment[0].Item.Produto.Nome
              })
              break
            case 'identificadores':
              await getIdentifierByItemId(scheduleItem[0].Item_Id).then(
                (identifierResponse) => {
                  identifier =
                    identifierResponse[0].CodigoIdentificador.toString()
                  itemName = identifierResponse[0].Item.Produto.Nome
                }
              )
              break
            case 'rastreadores':
              await getTrackerIdentifierByItemId(scheduleItem[0].Item_Id).then(
                (tracker) => {
                  identifier =
                    utils.phoneFormat(tracker[0].Chip.NumeroDaLinha) +
                    ' - ' +
                    tracker[0].Equipamento.Imei
                  itemName = tracker[0].Item.Produto.Nome
                }
              )
              break
            case 'kitsDeInsumo':
              await getInputKitsIdentifierByItemId(
                scheduleItem[0].Item_Id
              ).then((inputKit) => {
                identifier = inputKit[0].CodigoReferencia.toString()
                itemName = inputKit[0].Item.Produto.Nome
              })
              break
            case 'kitsDeInstalacao':
              await getInstallationKitsIdentifierByItemId(
                scheduleItem[0].Item_Id
              ).then((installationKit) => {
                identifier =
                  installationKit[0].Rastreador.Chip.NumeroDaLinha +
                  ' - ' +
                  installationKit[0].Rastreador.Equipamento.Imei +
                  ' - ' +
                  installationKit[0].CodigoReferencia.toString()
                itemName = installationKit[0].Item.Produto.Nome
              })
              break
          }
        }

        return {
          Name: product.Produto.Nome,
          MembershipPrice:
            product.ProdutoPreco.TipoDePreco?.Valor === 'adesao'
              ? product.ProdutoPreco.Valor
              : 0,
          RecurrencePrice:
            product.ProdutoPreco.TipoDePreco?.Valor === 'recorrencia'
              ? product.ProdutoPreco.Valor
              : 0,
          Identifier: identifier,
          ItemId: itemName,
          Retirado:
            (serviceOrderData.Agendamentos.length > 0
              ? serviceOrderData.Agendamentos[0].Situacao.Valor
              : false) !== 'criada' &&
            serviceOrderData.Situacao.Valor !== 'aberta'
              ? 'Sim'
              : 'Não'
        }
      })

      ;(async () => {
        setProductCollection(await Promise.all(products))
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
              colection={serviceOrderData.Servicos.filter(
                (service) => service.Servico.GeraOS
              ).map((service) => {
                return {
                  Name: service.Servico.Nome,
                  MembershipPrice:
                    service.ServicoPreco.TipoDePreco?.Valor === 'adesao'
                      ? service.ServicoPreco.Valor
                      : 0,
                  RecurrencePrice:
                    service.ServicoPreco.TipoDePreco?.Valor === 'recorrencia'
                      ? service.ServicoPreco.Valor
                      : 0
                }
              })}
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
          {serviceOrderData?.Situacao.Valor === 'aberta' && (
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
