import React, { ReactNode, useEffect, useState } from 'react'

import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'
import * as utils from '@comigo/utils'
import * as proposals from '&crm/domains/Proposals'

import { Card } from '@comigo/ui-common'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'

type Collection = {
  Id: string
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

export function Vehicle() {
  const router = useRouter()
  const {
    formState: { errors },
    control
  } = useForm()
  const [collection, setCollection] = useState<Collection[]>([])
  const [paymentDay, setPaymentDay] = useState<PaymentDayType>()
  const [changePaymentTypeAdesao, setChangePaymentTypeAdesao] = useState(false)
  const [changePaymentTypeRecorrencia, setChangePaymentTypeRecorrencia] =
    useState(false)
  const [changeInvoiceDayRecorrencia, setChangeInvoiceDayRecorrencia] =
    useState(false)

  const {
    proposalData,
    selectedTab,
    client,
    runPaymentTypeQuery,
    paymentType,
    clientPaymentType,
    disabledUpdateClientPaymentType,
    getPaymentDayById,
    insertProposalPaymentType,
    proposalRefetch,
    insertOnlyClientPaymentType,
    getClientById,
    setClient,
    insertOnlyClientInvoiceDate,
    paymentTypesData,
    runPaymentDayQuery,
    paymentDayData,
    currentStage,
    lead
  } = proposals.useUpdate()

  const clientApiData = client?.Pessoa.DadosDaApi
  const hasGNV = proposalData.Veiculos.filter((vehicle) => {
    return vehicle.Id === selectedTab?.id?.toString()
  })[0]?.PossuiGNV

  function getMembershipTotalValue() {
    let totalPrice = 0
    collection.map((item) => {
      if (item.MembershipPrice) {
        totalPrice += Number(item.MembershipPrice)
      }
    })

    return utils.BRLMoneyFormat(totalPrice)
  }

  function getRecurrenceTotalValue() {
    let totalPrice = 0
    collection.map((item) => {
      if (item.RecurrencePrice) {
        totalPrice += Number(item.RecurrencePrice)
      }
    })

    return utils.BRLMoneyFormat(totalPrice)
  }

  useEffect(() => {
    if (proposalData) {
      const proposalsItens: Collection[] = []
      proposalData.Veiculos.filter((vehicle) => {
        return vehicle.Id === selectedTab?.id?.toString()
      }).map((vehicle) => {
        vehicle.PropostasCombos.map((combo) => {
          proposalsItens.push({
            Id: combo.Id,
            Name: combo.Combo.Nome,
            MembershipPrice: combo.ComboPreco.ValorDeAdesao,
            RecurrencePrice: combo.ComboPreco.ValorDeRecorrencia,
            Type: 'Combo'
          })
        })
        vehicle.PropostasPlanos.map((plans) => {
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
        vehicle.PropostasServicos.map((services) => {
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
        vehicle.PropostasProdutos.map((product) => {
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
      setCollection(proposalsItens)
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
              },
              {
                key: hasGNV !== undefined ? 'Possui GNV' : '',
                value: hasGNV === undefined ? '' : hasGNV ? 'Sim' : 'Não'
              }
            ]}
          />
        )}

        {router.query.origin === 'changeVehicle' && selectedTab.id && (
          <common.InfoDetails
            title={`Status do veículo`}
            subtitle={`Este veículo será ${
              proposalData.Veiculos[0].Id === selectedTab.id.toString()
                ? 'desativado'
                : 'ativado'
            }`}
            dangerTitle={
              proposalData.Veiculos[0].Id === selectedTab.id.toString()
            }
            textAlignRight
            contentAlignRight
          />
        )}
      </common.LineInfoDetailsColumns>
      <common.Divider />
      <blocks.BorderLessTable
        colection={collection}
        actions={currentStage === 0 ? proposals.UpdateRowActions : undefined}
        columnTitles={[
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
              value: (
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
                            className="w-5 h-5 ml-4 cursor-pointer text-cyan-900"
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
          details={[
            {
              key: <span className="text-slate-500">Forma de Pagamento</span>,
              value: (
                <>
                  {changePaymentTypeRecorrencia ? (
                    <div className="flex items-center">
                      <common.buttons.CancelButton
                        title="Cancelar"
                        className="mr-2"
                        onClick={() => setChangePaymentTypeRecorrencia(false)}
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
                      {!disabledUpdateClientPaymentType &&
                        proposalData?.Situacao.Comentario !== 'Aceito' &&
                        currentStage === 0 && (
                          <common.icons.EditIcon
                            className="w-5 h-5 mr-4 cursor-pointer text-cyan-900"
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
              )
            },
            {
              key: <span className="text-base text-slate-500">Vencimento</span>,
              value: (
                <>
                  {changeInvoiceDayRecorrencia ? (
                    <div className="flex items-center">
                      <common.buttons.CancelButton
                        title="Cancelar"
                        className="mr-2"
                        onClick={() => setChangeInvoiceDayRecorrencia(false)}
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
                      {!disabledUpdateClientPaymentType &&
                        proposalData?.Situacao.Comentario !== 'Aceito' &&
                        currentStage === 0 && (
                          <common.icons.EditIcon
                            className="w-5 h-5 mr-4 cursor-pointer text-cyan-900"
                            onClick={() => {
                              setChangeInvoiceDayRecorrencia(true)
                              runPaymentTypeQuery()
                              runPaymentDayQuery()
                            }}
                          />
                        )}
                      <span className="font-semibold">
                        {paymentDay ? paymentDay.Comentario : 'Não definida'}
                      </span>
                    </div>
                  )}
                </>
              )
            }
          ]}
          textAlignRight
          contentAlignRight
        />
      </common.LineInfoDetailsColumns>
    </Card>
  )
}
