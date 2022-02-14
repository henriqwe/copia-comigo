import React, { useEffect, useState } from 'react'

import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'
import * as utils from '@comigo/utils'
import * as proposals from '&crm/domains/Proposals'

import { Card } from '@comigo/ui-common'

type CollectionType = {
  Group?: string
  Name?: string
  MembershipPrice?: string
  RecurrencePrice?: string
  Type?: 'Plano' | 'Combo' | 'Serviço' | 'Produto'
}

type PaymentDayType = {
  Valor: string
  Comentario: string
}

export const Resume = () => {
  const [collection, setCollection] = useState<CollectionType[]>([])
  const [paymentDay, setPaymentDay] = useState<PaymentDayType>()

  const {
    proposalData,
    getVehicleById,
    client,
    runPaymentTypeQuery,
    setSlidePanelState,
    paymentType,
    clientPaymentType,
    disabledUpdateClientPaymentType,
    runPaymentDayQuery,
    getPaymentDayById
  } = proposals.useUpdate()

  const clientData = client?.Pessoa.DadosDaApi

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
          Name: combo.Combo.Nome,
          MembershipPrice: combo.ComboPreco.ValorDeAdesao,
          RecurrencePrice: combo.ComboPreco.ValorDeRecorrencia,
          Type: 'Combo'
        })
      })
      proposalData.Planos.map((plans) => {
        proposalsItens.push({
          Name: plans.Plano.Nome,
          MembershipPrice: plans.PlanoPreco.ValorDeAdesao,
          RecurrencePrice: plans.PlanoPreco.ValorDeRecorrencia,
          Type: 'Plano'
        })
      })
      proposalData.Servicos.map((services) => {
        proposalsItens.push({
          Name: services.Servico.Nome,
          MembershipPrice:
            services.ServicosPreco.TipoDePreco.Valor === 'adesao'
              ? services.ServicosPreco.Valor
              : '0',
          RecurrencePrice:
            services.ServicosPreco.TipoDePreco.Valor === 'recorrencia'
              ? services.ServicosPreco.Valor
              : '0',
          Type: 'Serviço'
        })
      })
      proposalData.Produtos.map((product) => {
        proposalsItens.push({
          Name: product.Produto.Nome,
          MembershipPrice:
            product.ProdutoPreco.TipoDePreco.Valor === 'adesao'
              ? product.ProdutoPreco.Valor
              : '0',
          RecurrencePrice:
            product.ProdutoPreco.TipoDePreco.Valor === 'recorrencia'
              ? product.ProdutoPreco.Valor
              : '0',
          Type: 'Produto'
        })
      })

      const array = proposalData.Veiculos.filter(
        (vehicle) => vehicle.Veiculo_Id !== undefined
      ).map(async (proposalVehicle) => {
        const vehicle = await getVehicleById(proposalVehicle.Veiculo_Id)

        proposalsItens.push({
          Group:
            (vehicle.Placa ? vehicle.Placa : vehicle.NumeroDoChassi) +
            (vehicle.Apelido ? ' - ' + vehicle.Apelido : '')
        })

        proposalVehicle.PropostasCombos.map((combo) => {
          proposalsItens.push({
            Name: combo.Combo.Nome,
            MembershipPrice: combo.ComboPreco.ValorDeAdesao,
            RecurrencePrice: combo.ComboPreco.ValorDeRecorrencia,
            Type: 'Combo'
          })
        })
        proposalVehicle.PropostasPlanos.map((plans) => {
          proposalsItens.push({
            Name: plans.Plano.Nome,
            MembershipPrice: plans.PlanoPreco.ValorDeAdesao,
            RecurrencePrice: plans.PlanoPreco.ValorDeRecorrencia,
            Type: 'Plano'
          })
        })
        proposalVehicle.PropostasServicos.map((services) => {
          proposalsItens.push({
            Name: services.Servico.Nome,
            MembershipPrice:
              services.ServicosPreco.TipoDePreco.Valor === 'adesao'
                ? services.ServicosPreco.Valor
                : '0',
            RecurrencePrice:
              services.ServicosPreco.TipoDePreco.Valor === 'recorrencia'
                ? services.ServicosPreco.Valor
                : '0',
            Type: 'Serviço'
          })
        })
        proposalVehicle.PropostasProdutos.map((product) => {
          proposalsItens.push({
            Name: product.Produto.Nome,
            MembershipPrice:
              product.ProdutoPreco.TipoDePreco.Valor === 'adesao'
                ? product.ProdutoPreco.Valor
                : '0',
            RecurrencePrice:
              product.ProdutoPreco.TipoDePreco.Valor === 'recorrencia'
                ? product.ProdutoPreco.Valor
                : '0',
            Type: 'Produto'
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

  return (
    <Card>
      <common.LineInfoDetailsColumns>
        <proposals.InfoDetails
          title={`Detalhes do cliente`}
          subtitle={client?.Pessoa.Nome}
          details={[
            {
              key: '',
              value: clientData?.emails[0].email
            },
            {
              key: '',
              value: `${clientData?.enderecos[0].logradouro}, ${clientData?.enderecos[0].cidade} - ${clientData?.enderecos[0].estado}`
            }
          ]}
        />
      </common.LineInfoDetailsColumns>
      <common.Divider />
      <blocks.BorderLessTable
        colection={collection}
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
          }
        ]}
      />
      <common.Divider />
      <common.LineInfoDetailsColumns>
        <proposals.InfoDetails
          title={
            <div className="flex">
              <span className="mr-2">Adesão</span>
              {proposalData?.Situacao.Comentario !== 'Aceito' && (
                <common.icons.EditIcon
                  className="w-5 h-5 cursor-pointer text-cyan-900"
                  onClick={() => {
                    setSlidePanelState({
                      open: true,
                      type: 'paymentType'
                    })
                    runPaymentTypeQuery()
                  }}
                />
              )}
            </div>
          }
          subtitle={getMembershipTotalValue()}
          details={[
            {
              key: 'Forma de Pagamento',
              value: paymentType ? paymentType?.Comentario : 'Não definida'
            }
          ]}
        />

        <proposals.InfoDetails
          title={
            !disabledUpdateClientPaymentType &&
            proposalData?.Situacao.Comentario !== 'Aceito' ? (
              <div className="flex">
                <span className="flex-1 mr-2">Recorrência</span>

                <common.icons.EditIcon
                  className="w-5 h-5 cursor-pointer text-cyan-900"
                  onClick={() => {
                    setSlidePanelState({
                      open: true,
                      type: 'clientPaymentType'
                    })
                    runPaymentTypeQuery()
                    runPaymentDayQuery()
                  }}
                />
              </div>
            ) : (
              'Recorrência'
            )
          }
          subtitle={getRecurrenceTotalValue()}
          details={[
            {
              key: 'Forma de Pagamento',
              value: clientPaymentType
                ? clientPaymentType?.Comentario
                : 'Não definida'
            },
            {
              key: 'Vencimento',
              value: paymentDay ? paymentDay.Comentario : 'Não definida'
            }
          ]}
          textAlignRight
          contentAlignRight
        >
          <div className="mt-1">Adesão</div>
        </proposals.InfoDetails>
      </common.LineInfoDetailsColumns>
    </Card>
  )
}