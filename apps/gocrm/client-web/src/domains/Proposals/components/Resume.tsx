import React, { ReactNode, useEffect, useState } from 'react'

import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'
import * as utils from '@comigo/utils'
import * as proposals from '&crm/domains/Proposals'

import { Card } from '@comigo/ui-common'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'

type CollectionType = {
  Id?: string
  Group?: string
  Name?: ReactNode
  MembershipPrice?: string
  RecurrencePrice?: string
  Type?: 'Plano' | 'Combo' | 'Serviço' | 'Produto'
  Amount?: number
}

type PaymentDayType = {
  Valor: string
  Comentario: string
}

export const Resume = () => {
  const {
    formState: { errors },
    control
  } = useForm()
  const router = useRouter()
  const [collection, setCollection] = useState<CollectionType[]>([])
  const [paymentDay, setPaymentDay] = useState<PaymentDayType>()
  const [changePaymentTypeAdesao, setChangePaymentTypeAdesao] = useState(false)
  const [changePaymentTypeRecorrencia, setChangePaymentTypeRecorrencia] =
    useState(false)
  const [changeInvoiceDayRecorrencia, setChangeInvoiceDayRecorrencia] =
    useState(false)

  const {
    proposalData,
    getVehicleById,
    client,
    runPaymentTypeQuery,
    paymentType,
    clientPaymentType,
    disabledUpdateClientPaymentType,
    runPaymentDayQuery,
    getPaymentDayById,
    paymentTypesData,
    proposalRefetch,
    insertProposalPaymentType,
    insertOnlyClientPaymentType,
    insertOnlyClientInvoiceDate,
    getClientById,
    setClient,
    paymentDayData,
    currentStage,
    lead
  } = proposals.useUpdate()

  const clientApiData = client?.Pessoa.DadosDaApi

  function getMembershipTotalValue() {
    let totalPrice = 0
    if (router.query.origin === 'changeVehicle') {
      proposalData?.Veiculos[1].PropostasCombos.map((combo) => {
        if (combo.ComboPreco.ValorDeAdesao) {
          totalPrice += Number(combo.ComboPreco.ValorDeAdesao)
        }
      })
      proposalData?.Veiculos[1].PropostasPlanos.map((plans) => {
        if (plans.PlanoPreco?.ValorDeAdesao) {
          totalPrice += Number(plans.PlanoPreco.ValorDeAdesao)
        }
      })
      proposalData?.Veiculos[1].PropostasProdutos.map((product) => {
        if (product.PrecoAdesao) {
          totalPrice += Number(product.PrecoAdesao.Valor)
        }
      })
      proposalData?.Veiculos[1].PropostasServicos.map((service) => {
        if (service.PrecoDeAdesao) {
          totalPrice += Number(service.PrecoDeAdesao.Valor)
        }
      })
      return utils.BRLMoneyFormat(totalPrice)
    }
    collection.map((item) => {
      if (item.MembershipPrice) {
        totalPrice += Number(item.MembershipPrice)
      }
    })

    return utils.BRLMoneyFormat(totalPrice)
  }

  function getRecurrenceTotalValue() {
    let totalPrice = 0
    if (router.query.origin === 'changeVehicle') {
      proposalData?.Veiculos[1].PropostasCombos.map((combo) => {
        if (combo.ComboPreco.ValorDeRecorrencia) {
          totalPrice += Number(combo.ComboPreco.ValorDeRecorrencia)
        }
      })
      proposalData?.Veiculos[1].PropostasPlanos.map((plans) => {
        if (plans.PlanoPreco?.ValorDeRecorrencia) {
          totalPrice += Number(plans.PlanoPreco.ValorDeRecorrencia)
        }
      })
      proposalData?.Veiculos[1].PropostasProdutos.map((product) => {
        if (product.PrecoRecorrencia) {
          totalPrice += Number(product.PrecoRecorrencia.Valor)
        }
      })
      proposalData?.Veiculos[1].PropostasServicos.map((service) => {
        if (service.PrecoDeRecorrencia) {
          totalPrice += Number(service.PrecoDeRecorrencia.Valor)
        }
      })
      return utils.BRLMoneyFormat(totalPrice)
    }
    collection.map((item) => {
      if (item.RecurrencePrice) {
        totalPrice += Number(item.RecurrencePrice)
      }
    })

    return utils.BRLMoneyFormat(totalPrice)
  }

  useEffect(() => {
    if (proposalData) {
      const proposalsItens: CollectionType[] = []
      if (
        proposalData.Combos.length > 0 ||
        proposalData.Planos.length > 0 ||
        proposalData.Servicos.length > 0 ||
        proposalData.Produtos.length > 0
      ) {
        proposalsItens.push({
          Group: 'Sem Veículo'
        })
      }

      proposalData.Combos.map((combo) => {
        proposalsItens.push({
          Id: combo.Id,
          Name: combo.Combo.Nome,
          MembershipPrice: combo.ComboPreco.ValorDeAdesao,
          RecurrencePrice: combo.ComboPreco.ValorDeRecorrencia,
          Type: 'Combo'
        })
      })
      proposalData.Planos.map((plans) => {
        proposalsItens.push({
          Id: plans.Id,
          Name: plans.Plano.Nome,
          MembershipPrice: plans.PlanoPreco?.ValorDeAdesao || '0',
          RecurrencePrice: plans.PlanoPreco?.ValorDeRecorrencia || '0',
          Type: 'Plano'
        })
      })
      proposalData.Servicos.map((services) => {
        proposalsItens.push({
          Id: services.Id,
          Name: services.Servico.Nome,
          MembershipPrice: services.PrecoDeAdesao
            ? services.PrecoDeAdesao.Valor
            : '0',
          RecurrencePrice: services.PrecoDeRecorrencia
            ? services.PrecoDeRecorrencia.Valor
            : '0',
          Type: 'Serviço'
        })
      })
      proposalData.Produtos.map((product) => {
        proposalsItens.push({
          Id: product.Id,
          Name: product.Produto.Nome,
          MembershipPrice: product.PrecoAdesao
            ? product.PrecoAdesao.Valor
            : '0',
          RecurrencePrice: product.PrecoRecorrencia
            ? product.PrecoRecorrencia.Valor
            : '0',
          Type: 'Produto',
          Amount: product.Quantidade
        })
      })

      const array = proposalData.Veiculos.filter(
        (vehicle) => vehicle.Veiculo_Id !== undefined
      ).map(async (proposalVehicle) => {
        const vehicle = await getVehicleById(proposalVehicle.Veiculo_Id)

        proposalsItens.push({
          Group: `
          ${vehicle.Placa ? vehicle.Placa : vehicle.NumeroDoChassi} 
          ${vehicle.Apelido ? ' - ' + vehicle.Apelido : ''} 
          ${
            router.query.origin === 'changeVehicle'
              ? proposalData.Veiculos[0].Id === proposalVehicle.Id
                ? '(Vai ser desativado)'
                : '(Vai ser ativado)'
              : ''
          }`
        })

        proposalVehicle.PropostasCombos.map((combo) => {
          proposalsItens.push({
            Id: combo.Id,
            Name: combo.Combo.Nome,
            MembershipPrice: combo.ComboPreco.ValorDeAdesao,
            RecurrencePrice: combo.ComboPreco.ValorDeRecorrencia,
            Type: 'Combo'
          })
        })
        proposalVehicle.PropostasPlanos.map((plans) => {
          proposalsItens.push({
            Id: plans.Id,
            Name: (
              <span className={plans.PropostaCombo_Id !== null ? 'ml-4' : ''}>
                {plans.Plano.Nome}
              </span>
            ),
            MembershipPrice: plans.PlanoPreco?.ValorDeAdesao || '0',
            RecurrencePrice: plans.PlanoPreco?.ValorDeRecorrencia || '0',
            Type: 'Plano'
          })
        })
        proposalVehicle.PropostasServicos.map((services) => {
          proposalsItens.push({
            Id: services.Id,
            Name: (
              <span
                className={
                  services.PropostaCombo_Id !== null ||
                  services.PropostaPlano_Id !== null
                    ? 'ml-4'
                    : ''
                }
              >
                {services.Servico.Nome}
              </span>
            ),
            MembershipPrice: services.PrecoDeAdesao
              ? services.PrecoDeAdesao.Valor
              : '0',
            RecurrencePrice: services.PrecoDeRecorrencia
              ? services.PrecoDeRecorrencia.Valor
              : '0',
            Type: 'Serviço'
          })
        })
        proposalVehicle.PropostasProdutos.map((product) => {
          proposalsItens.push({
            Id: product.Id,
            Name: (
              <span
                className={
                  product.PropostaCombo_Id !== null ||
                  product.PropostaPlano_Id !== null
                    ? 'ml-4'
                    : ''
                }
              >
                {product.Produto.Nome}
              </span>
            ),
            MembershipPrice: product.PrecoAdesao
              ? product.PrecoAdesao.Valor
              : '0',
            RecurrencePrice: product.PrecoRecorrencia
              ? product.PrecoRecorrencia.Valor
              : '0',
            Type: 'Produto',
            Amount: product.Quantidade
          })
        })
      })

      ;(async () => {
        await Promise.all(array)
        setCollection(proposalsItens)
      })()
    }
  }, [proposalData])

  useEffect(() => {
    if (client?.DiaDeFaturamento_Id) {
      getPaymentDayById(client?.DiaDeFaturamento_Id).then((paymentDay) => {
        setPaymentDay(paymentDay)
      })
    }
  }, [client])

  const onSubmit = async (formData, type) => {
    try {
      if (type === 'TipoDePagamento_Adesao') {
        await insertProposalPaymentType({
          variables: {
            FormaDePagamentoDaAdesao_Id: formData.key
          }
        })
        proposalRefetch()
        utils.notification('Tipo de pagamento alterado com sucesso', 'success')
        return
      }
      if (type === 'TipoDePagamento_Recorrencia') {
        await insertOnlyClientPaymentType({
          variables: {
            Id: proposalData.Cliente_Id,
            FormaDePagamento_Id: formData.key
          }
        })
        const cliente = await getClientById(proposalData.Cliente_Id)
        setClient(cliente)
        utils.notification(
          'Tipo de pagamento da recorrencia alterado com sucesso',
          'success'
        )
        return
      }
      if (type === 'DiaDeFaturamento_Recorrencia') {
        await insertOnlyClientInvoiceDate({
          variables: {
            Id: proposalData.Cliente_Id,
            DiaDeFaturamento_Id: formData.key
          }
        })
        const cliente = await getClientById(proposalData.Cliente_Id)
        setClient(cliente)
        utils.notification('Tipo de pagamento alterado com sucesso', 'success')
        return
      }
      utils.notification('Ocorreu um erro', 'error')
      return
    } catch (err) {
      utils.showError(err)
    }
  }

  return (
    <Card>
      <common.LineInfoDetailsColumns>
        {lead ? (
          <common.InfoDetails
            title={`Detalhes da Lead`}
            subtitle={lead?.Nome}
            details={[
              {
                key: '',
                value: lead.Email
              },
              {
                key: '',
                value: utils.phoneFormat(lead.Telefone)
              }
            ]}
          />
        ) : (
          <common.InfoDetails
            title={`Detalhes do cliente`}
            subtitle={client?.Pessoa.Nome}
            details={[
              {
                key: '',
                value: client?.Pessoa.PessoaJuridica
                  ? clientApiData.email
                  : clientApiData?.emails[0].email
              },
              {
                key: '',
                value: client?.Pessoa.PessoaJuridica
                  ? `${clientApiData?.address.street}, ${clientApiData?.address.city} - ${clientApiData?.address.state}`
                  : `${clientApiData?.enderecos[0].logradouro}, ${clientApiData?.enderecos[0].cidade} - ${clientApiData?.enderecos[0].estado}`
              }
            ]}
          />
        )}
      </common.LineInfoDetailsColumns>
      <common.Divider />

      <blocks.BorderLessTable
        colection={collection}
        actions={currentStage === 0 ? proposals.UpdateRowActions : undefined}
        columnTitles={[
          {
            title: 'Grupo',
            fieldName: 'Group',
            type: 'handler',
            handler: (value) => (value ? value : '')
          },
          {
            title: 'Nome',
            fieldName: 'Name',
            type: 'handler',
            handler: (value) => (value ? value : '')
          },

          {
            title: 'Tipo',
            fieldName: 'Type',
            type: 'handler',
            handler: (value) => (value ? value : '')
          },
          {
            title: 'Adesão (R$)',
            fieldName: 'MembershipPrice',
            type: 'handler',
            handler: (value) =>
              value !== undefined ? utils.BRLMoneyFormat(Number(value)) : ''
          },
          {
            title: 'Recorrência (R$)',
            fieldName: 'RecurrencePrice',
            type: 'handler',
            handler: (value) =>
              value !== undefined ? utils.BRLMoneyFormat(Number(value)) : ''
          },
          {
            title: 'Quantidade (R$)',
            fieldName: 'Amount',
            type: 'handler',
            handler: (value) => (value ? value : '')
          }
        ]}
      />

      <common.Divider />
      <common.LineInfoDetailsColumns>
        <common.InfoDetails
          title={
            <div className="flex">
              <span className="mr-2">Adesão</span>
            </div>
          }
          subtitle={getMembershipTotalValue()}
          details={[
            {
              key: <span className="text-slate-500">Forma de Pagamento</span>,
              value: proposalData?.Situacao.Comentario !== 'Aceito' && (
                <div className="flex">
                  {changePaymentTypeAdesao ? (
                    <div className="flex items-center">
                      <Controller
                        control={control}
                        name={'TipoDePagamento_Id'}
                        render={({ field: { onChange, value } }) => (
                          <common.form.Select
                            noSearch
                            className="w-44"
                            itens={
                              paymentTypesData
                                ? paymentTypesData.map((paymentType) => {
                                    return {
                                      key: paymentType.Valor,
                                      title: paymentType.Comentario
                                    }
                                  })
                                : []
                            }
                            value={value}
                            onChange={(e) => {
                              setChangePaymentTypeAdesao(false)
                              onSubmit(e, 'TipoDePagamento_Adesao')
                            }}
                            error={errors.TipoDePagamento_Id}
                            label="Tipo de pagamento"
                          />
                        )}
                      />
                      <common.buttons.CancelButton
                        title="Cancelar"
                        className="ml-2"
                        onClick={() => setChangePaymentTypeAdesao(false)}
                      />
                    </div>
                  ) : (
                    <>
                      <span className="font-semibold">
                        {paymentType?.Comentario
                          ? paymentType?.Comentario
                          : 'Não definida'}
                      </span>
                      {currentStage === 0 &&
                        proposalData?.Situacao.Comentario !== 'Aceito' && (
                          <common.icons.EditIcon
                            className="w-5 h-5 ml-4 cursor-pointer text-cyan-900 print:hidden"
                            onClick={() => {
                              setChangePaymentTypeAdesao(true)
                              runPaymentTypeQuery()
                            }}
                          />
                        )}
                    </>
                  )}
                </div>
              )
            }
          ]}
        />

        <common.InfoDetails
          title={'Recorrência'}
          subtitle={getRecurrenceTotalValue()}
          textAlignRight
          details={[
            {
              key: <span className="text-slate-500">Forma de Pagamento</span>,
              value: (
                <>
                  {!disabledUpdateClientPaymentType &&
                    proposalData?.Situacao.Comentario !== 'Aceito' && (
                      <>
                        {changePaymentTypeRecorrencia ? (
                          <div className="flex items-center">
                            <common.buttons.CancelButton
                              title="Cancelar"
                              className="mr-2"
                              onClick={() =>
                                setChangePaymentTypeRecorrencia(false)
                              }
                            />
                            <Controller
                              control={control}
                              name={'TipoDePagamento_Id'}
                              render={({ field: { onChange, value } }) => (
                                <common.form.Select
                                  noSearch
                                  className="w-44"
                                  itens={
                                    paymentTypesData
                                      ? paymentTypesData.map((paymentType) => {
                                          return {
                                            key: paymentType.Valor,
                                            title: paymentType.Comentario
                                          }
                                        })
                                      : []
                                  }
                                  value={value}
                                  onChange={(e) => {
                                    setChangePaymentTypeRecorrencia(false)
                                    onSubmit(e, 'TipoDePagamento_Recorrencia')
                                  }}
                                  error={errors.TipoDePagamento_Id}
                                  label="Tipo de pagamento"
                                />
                              )}
                            />
                          </div>
                        ) : (
                          <div className="flex justify-end">
                            {currentStage === 0 &&
                              !disabledUpdateClientPaymentType &&
                              proposalData?.Situacao.Comentario !==
                                'Aceito' && (
                                <common.icons.EditIcon
                                  className="w-5 h-5 mr-4 cursor-pointer text-cyan-900 print:hidden"
                                  onClick={() => {
                                    setChangePaymentTypeRecorrencia(true)
                                    runPaymentTypeQuery()
                                    runPaymentDayQuery()
                                  }}
                                />
                              )}
                            <span className="font-semibold">
                              {clientPaymentType
                                ? clientPaymentType?.Comentario
                                : 'Não definida'}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                </>
              )
            },
            {
              key: (
                <span className="flex justify-end text-base text-slate-500">
                  Vencimento
                </span>
              ),
              value: (
                <>
                  {!disabledUpdateClientPaymentType &&
                    proposalData?.Situacao.Comentario !== 'Aceito' && (
                      <>
                        {changeInvoiceDayRecorrencia ? (
                          <div className="flex items-center">
                            <common.buttons.CancelButton
                              title="Cancelar"
                              className="mr-2"
                              onClick={() =>
                                setChangeInvoiceDayRecorrencia(false)
                              }
                            />
                            <Controller
                              control={control}
                              name={'TipoDePagamento_Id'}
                              render={({ field: { onChange, value } }) => (
                                <common.form.Select
                                  noSearch
                                  className="w-44"
                                  itens={
                                    paymentDayData
                                      ? paymentDayData.map((paymentType) => {
                                          return {
                                            key: paymentType.Valor,
                                            title: paymentType.Comentario
                                          }
                                        })
                                      : []
                                  }
                                  value={value}
                                  onChange={(e) => {
                                    setChangeInvoiceDayRecorrencia(false)
                                    onSubmit(e, 'DiaDeFaturamento_Recorrencia')
                                  }}
                                  error={errors.TipoDePagamento_Id}
                                  label="Dia de faturamento"
                                />
                              )}
                            />
                          </div>
                        ) : (
                          <div className="flex justify-end">
                            {currentStage === 0 &&
                              !disabledUpdateClientPaymentType &&
                              proposalData?.Situacao.Comentario !==
                                'Aceito' && (
                                <common.icons.EditIcon
                                  className="w-5 h-5 mr-4 cursor-pointer text-cyan-900 print:hidden"
                                  onClick={() => {
                                    setChangeInvoiceDayRecorrencia(true)
                                    runPaymentTypeQuery()
                                    runPaymentDayQuery()
                                  }}
                                />
                              )}
                            <span className="font-semibold">
                              {paymentDay
                                ? paymentDay.Comentario
                                : 'Não definida'}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                </>
              )
            }
          ]}
          contentAlignRight
        />
      </common.LineInfoDetailsColumns>
    </Card>
  )
}
