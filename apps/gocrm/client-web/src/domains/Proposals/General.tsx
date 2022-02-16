import React, { useEffect, useState } from 'react'

import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'
import * as utils from '@comigo/utils'
import * as proposals from '&crm/domains/Proposals'

import { Card } from '@comigo/ui-common'

type Collection = {
  Name?: string
  MembershipPrice?: string
  RecurrencePrice?: string
  Type?: 'Plano' | 'Combo' | 'Serviço' | 'Produto'
}

export const General = () => {
  const [collection, setCollection] = useState<Collection[]>([])

  const {
    proposalData,
    client,
    runPaymentTypeQuery,
    setSlidePanelState,
    paymentType
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

  useEffect(() => {
    if (proposalData) {
      const proposalsItens: Collection[] = []
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
          Name: product.Produto.Nome,
          MembershipPrice: product.PrecoAdesao
            ? product.PrecoAdesao.Valor
            : '0',
          RecurrencePrice: product.PrecoRecorrencia
            ? product.PrecoRecorrencia.Valor
            : '0',
          Type: 'Produto'
        })
      })

      setCollection(proposalsItens)
    }
  }, [proposalData])

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
              {proposalData.Situacao.Comentario !== 'Aceito' && (
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
      </common.LineInfoDetailsColumns>
    </Card>
  )
}
