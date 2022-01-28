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

export function Update() {
  const [activeEdit, setActiveEdit] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [accessionValue, setAccessionValue] = useState('0')
  const [benefitsValue, setBenefitsValue] = useState('0')
  const [proposal, setProposal] = useState<{
    Id: string
    Cliente_Id?: string
    Instalacoes: {
      Endereco: {
        Bairro: string
        Cidade: string
        Complemento: string
        Estado: string
        Logradouro: string
        Numero: string
      }
    }[]
    TipoDePagamento_Id: string
  }>()
  const [client, setClient] = useState<{
    Id: string
    Pessoa: {
      Nome: string
      PessoaJuridica: boolean
      Identificador: string
    }
  }>()
  const [benefits, setBenefits] = useState<
    {
      Name: string
      Price: string
      Type: string
    }[]
  >()
  const [services, setServices] = useState<
    {
      Name: string
      Price: string
      OS: boolean
    }[]
  >()
  const [products, setProducts] = useState<
    {
      Name: string
      Price: string
    }[]
  >()
  const [vehicle, setVehicle] = useState<{
    Id: string
    Placa?: string
    NumeroDoChassi?: string
    Apelido?: string
  }>()
  const {
    serviceOrderData,
    serviceOrderRefetch,
    rejectServiceOrder,
    rejectServiceOrderLoading,
    rejectSchema,
    getServiceOrderProposal,
    getProposalClient,
    setSlidePanelState,
    serviceOrderActivitiesRefetch,
    getServiceOrderVehicle,
    getProductById,
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
    finishServiceOrderLoading
  } = serviceOrders.useUpdate()
  const address = proposal?.Instalacoes[0].Endereco

  const {
    register: rejectRegister,
    formState: { errors: rejectErros },
    handleSubmit: rejectSubmit
  } = useForm({ resolver: yupResolver(rejectSchema) })

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
                      ServicoPreco_Id: service.ServicoPreco_Id,
                      Servico_Id: service.Servico_Id,
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
                        ProdutoPreco_Id: product.ProdutoPreco_Id,
                        Produto_Id: product.Produto_Id,
                        VeiculoAtivo_Id:
                          response!.data.update_clientes_VeiculosAtivos_by_pk.Id
                      }
                    })
                  })

                  serviceOrderData?.Servicos.map(async (service) => {
                    await insertActiveVehicleService({
                      variables: {
                        ServicoPreco_Id: service.ServicoPreco_Id,
                        Servico_Id: service.Servico_Id,
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
                    Produto_Id: product.Produto_Id,
                    ProdutoPreco_Id: product.ProdutoPreco_Id,
                    Ativo: true
                  }
                }),
                Servicos: serviceOrderData?.Servicos.map((service) => {
                  return {
                    Servico_Id: service.Servico_Id,
                    ServicoPreco_Id: service.ServicoPreco_Id,
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
            utils.notification('Ordem de serviço finalizada com sucesso', 'success')
          })
          .catch((err) => {
            utils.showError(err)
          })
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
              Price: response?.price?.Valor as string,
              Type: 'serviço'
            }
          })
        case 'produto':
          return await getProductById(
            benefit.Portfolio_Id,
            benefit.PortfolioPreco_Id
          ).then((response) => {
            return {
              Name: response?.product?.Nome as string,
              Price: response?.price?.Valor as string,
              Type: 'produto'
            }
          })
        case 'plano':
          return await getPlanById(
            benefit.Portfolio_Id,
            benefit.PortfolioPreco_Id
          ).then((response) => {
            return {
              Name: response?.plan?.Nome as string,
              Price: response?.price?.ValorPraticado
                ? response?.price?.ValorPraticado + response.price.ValorBase
                : response?.price?.ValorBase +
                (response.price?.ServicoPreco.Valor as string),
              Type: 'plano'
            }
          })
        case 'combo':
          return await getComboById(
            benefit.Portfolio_Id,
            benefit.PortfolioPreco_Id
          ).then((response) => {
            let comboPrice = response?.price?.ValorBase
            response?.combo?.Planos.map((plan) => {
              comboPrice += plan.ValorPraticado
            })
            response?.combo?.Produtos.map((product) => {
              comboPrice += product.ValorPraticado
            })
            response?.combo?.Servicos.map((services) => {
              comboPrice += services.ValorPraticado
            })

            return {
              Name: response?.combo?.Nome as string,
              Price: comboPrice as string,
              Type: 'combo'
            }
          })
      }
    })
      ; (async () => {
        const benefitsArray = await Promise.all(benefits as any)
        setBenefits(benefitsArray)
      })()
  }

  async function getServices() {
    const services = serviceOrderData?.Servicos.map(async (service) => {
      const asyncService = await getServiceById(
        service.Servico_Id,
        service.ServicoPreco_Id
      )

      return {
        Name: asyncService?.service?.Nome,
        Price: asyncService?.price?.Valor,
        OS: asyncService?.service?.GeraOS
      }
    })
      ; (async () => {
        const servicesArray = await Promise.all(services as any)
        setServices(servicesArray)
      })()
  }

  async function getProducts() {
    const products = serviceOrderData?.Produtos.map(async (product) => {
      const asyncProduct = await getProductById(
        product.Produto_Id,
        product.ProdutoPreco_Id
      )

      return {
        Name: asyncProduct?.product?.Nome,
        Price: asyncProduct?.price?.Valor
      }
    })
      ; (async () => {
        const productsArray = await Promise.all(products as any)
        setProducts(productsArray)
      })()
  }

  function getAccessionTotalValue() {
    let totalPrice = 0
    services?.map((service) => {
      totalPrice += Number(service.Price)
    })
    setAccessionValue(BRLMoneyFormat(totalPrice))
  }

  function getBenefitsTotalValue() {
    let totalPrice = 0

    benefits?.map((portfolioItem) => {
      totalPrice += Number(portfolioItem.Price)
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
      getServiceOrderProposal(serviceOrderData.Proposta_Id).then(
        async (proposalResponse) => {
          setProposal(proposalResponse)
          await getProposalClient(proposalResponse?.Cliente_Id as string).then(
            (client) => {
              setClient(client)
            }
          )
        }
      )
      getBenefits()
      getServices()
      getProducts()
      getVehicle()
    }
  }, [serviceOrderData])

  useEffect(() => {
    if (services) {
      getBenefitsTotalValue()
      getAccessionTotalValue()
    }
  }, [services])

  return (
    <div className="flex flex-col col-span-12 gap-4">
      <header className="flex justify-between">
        <div>
          <h3 className="text-xl text-gray-600">Dados gerais</h3>
          <p>
            {address?.Logradouro} - {address?.Numero} - {address?.Bairro} -{' '}
            {address?.Cidade} - {address?.Estado}
          </p>
          <div className="flex gap-4">
            <p>Tipo da OS: {serviceOrderData?.Tipo.Comentario}</p>
          </div>

          <p>
            Situação:{' '}
            <span
              className={`${serviceOrderData?.Situacao.Valor === 'cancelada'
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
          <h3 className="text-xl text-gray-600">Detalhes do cliente</h3>
          <p className="text-lg font-bold">{client?.Pessoa.Nome}</p>
          <p className="text-sm dark:text-gray-300">
            {client?.Pessoa.PessoaJuridica ? 'CNPJ: ' : 'CPF: '}{' '}
            {client?.Pessoa.PessoaJuridica
              ? CNPJFormat(client?.Pessoa.Identificador)
              : CPFFormat(client?.Pessoa.Identificador as string)}
          </p>
        </div>
      </header>

      <form>
        <common.Separator className="mb-4" />
        <common.Card className="px-6 dark:bg-dark-2">
          <h3 className="text-xl font-bold">Serviços</h3>

          {services ? (
            <blocks.Table
              colection={services.filter((service) => service.OS)}
              columnTitles={[
                {
                  title: 'Nome',
                  fieldName: 'Name'
                },
                {
                  title: 'Preco',
                  fieldName: 'Price',
                  type: 'handler',
                  handler: (price: string) => BRLMoneyFormat(price)
                }
              ]}
            />
          ) : (
            <blocks.TableSkeleton />
          )}
        </common.Card>
        <common.Separator className="mt-4 mb-4" />
        <common.Card className="px-6 dark:bg-dark-2">
          <h3 className="text-xl font-bold">Produtos</h3>

          {products ? (
            <blocks.Table
              colection={products}
              columnTitles={[
                {
                  title: 'Nome',
                  fieldName: 'Name'
                },
                {
                  title: 'Preco',
                  fieldName: 'Price',
                  type: 'handler',
                  handler: (price: string) => BRLMoneyFormat(price)
                }
              ]}
            />
          ) : (
            <blocks.TableSkeleton />
          )}
        </common.Card>
        <common.Separator className="mt-4" />
        <h3 className="text-xl text-gray-600">Beneficios contratados</h3>
        {benefits ? (
          <blocks.Table
            colection={benefits}
            columnTitles={[
              {
                title: 'Nome',
                fieldName: 'Name'
              },
              {
                title: 'Preco',
                fieldName: 'Price',
                type: 'handler',
                handler: (price: string) => BRLMoneyFormat(price)
              }
            ]}
          />
        ) : (
          <blocks.TableSkeleton />
        )}
      </form>
      <common.Separator className="mt-0 mb-2" />

      <div className="flex justify-between">
        <div>
          <h3 className="text-xl text-gray-600">Dados gerais</h3>

          <p>Recorrência: Mensal</p>
          <p>Valor: {benefitsValue}</p>
          <common.Separator className="my-2" />
          <p>Pagamento de adesão: Recibo</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-lg text-gray-600">Adesão</p>
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
            disabled={
              serviceOrderData?.Situacao.Valor === 'concluida' ||
              serviceOrderData?.Situacao.Valor === 'finalizada'
            }
          />

          {(serviceOrderData?.Agendamentos.length || 0) > 0 ? (
            <>
              {serviceOrderData?.Agendamentos[0].Situacao.Valor ===
                'criada' && (
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
                    loading={
                      finishServiceOrderLoading ||
                      insertActiveVehicleLoading ||
                      insertActiveVehicleBenefitLoading ||
                      updateActiveVehicleLoading ||
                      updateActiveVehicleBenefitLoading
                    }
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
