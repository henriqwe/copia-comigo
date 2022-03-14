import React, { ReactNode, useEffect, useState } from 'react'

import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'
import * as utils from '@comigo/utils'
import * as proposals from '&crm/domains/Proposals'

import { Card } from '@comigo/ui-common'

type Collection = {
  Id: string
  Name?: ReactNode
  MembershipPrice?: string
  RecurrencePrice?: string
  Type?: 'Plano' | 'Combo' | 'Serviço' | 'Produto'
  Amount?: number
}

export const General = () => {
  const [collection, setCollection] = useState<Collection[]>([])

  const {
    proposalData,
    client,
    runPaymentTypeQuery,
    setSlidePanelState,
    paymentType,
    currentStage,
    lead
  } = proposals.useUpdate()
  const clientApiData = client?.Pessoa.DadosDaApi

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
      proposalData.Servicos.map((services) => {
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
      proposalData.Produtos.map((product) => {
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

      setCollection(proposalsItens)
    }
  }, [proposalData])

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
              {proposalData.Situacao.Comentario !== 'Aceito' &&
                currentStage === 0 && (
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
