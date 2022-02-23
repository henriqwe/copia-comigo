import { useEffect, useState } from 'react'

import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as clients from '&crm/domains/clients'
import * as utils from '@comigo/utils'
import axios from 'axios'

type CollectionType = {
  Vehicle?: string
  Name?: string
  MembershipPrice?: string
  RecurrencePrice?: string
  Type?: string
}

type BenefitType = {
  Name: string
  MembershipPrice: string
  RecurrencePrice: string
}

export function Resume() {
  const [totalValue, setTotalValue] = useState(0)
  const [collection, setCollection] = useState<CollectionType[]>([])
  const [benefits, setBenefits] = useState<BenefitType[]>([])

  const {
    clientData,
    getServiceById,
    getProductById,
    getPlanById,
    getComboById,
    getItemIdentifier
  } = clients.useUpdate()

  async function getRecurrenceTotalValue() {
    let total = 0
    benefits.map((benefit) => {
      if (benefit.RecurrencePrice) {
        total += Number(benefit.RecurrencePrice)
      }
    })
    setTotalValue(total)
  }

  async function getCollection() {
    const proposalsItens: CollectionType[] = []
    await Promise.all(
      clientData.VeiculosAtivos.map(async (activeVehicle) => {
        const benefits = await Promise.all(
          activeVehicle.Beneficios.map(async (benefit) => {
            switch (benefit.TipoPortfolio) {
              case 'serviço':
                return await getServiceById(
                  benefit.Portfolio_Id,
                  benefit.PrecoDeAdesao_Id,
                  benefit.PrecoDeRecorrencia_Id
                ).then((response) => {
                  return {
                    Id: response.service?.Id,
                    PriceId: response.price?.Id,
                    Name: response?.service?.Nome as string,
                    MembershipPrice: response.price
                      ? response?.price?.Valor
                      : '0',
                    RecurrencePrice: response.secondPrice
                      ? response?.secondPrice?.Valor
                      : '0',
                    Type: 'Beneficio - Serviço'
                  }
                })
              case 'plano':
                return await getPlanById(
                  benefit.Portfolio_Id,
                  benefit.PortfolioPreco_Id
                ).then((response) => {
                  return {
                    Id: response.plan?.Id,
                    PriceId: response.price?.Id,
                    Name: response?.plan?.Nome as string,
                    MembershipPrice: response?.price?.ValorDeAdesao,
                    RecurrencePrice: response?.price?.ValorDeRecorrencia,
                    Type: 'Beneficio - Plano'
                  }
                })
              case 'combo':
                return await getComboById(
                  benefit.Portfolio_Id,
                  benefit.PortfolioPreco_Id
                ).then((response) => {
                  return {
                    Id: response.combo?.Id,
                    PriceId: response.price?.Id,
                    Name: response?.combo?.Nome as string,
                    MembershipPrice: response?.price?.ValorDeAdesao,
                    RecurrencePrice: response?.price?.ValorDeRecorrencia,
                    Type: 'Beneficio - Combo'
                  }
                })
            }
          })
        )

        const services = await Promise.all(
          activeVehicle.Servicos.map(async (service) => {
            return await getServiceById(
              service.Servico_Id,
              service.PrecoDeAdesao_Id,
              service.PrecoDeRecorrencia_Id
            ).then((response) => {
              return {
                Id: response.service?.Id,
                PriceId: response.price?.Id,
                Name: response?.service?.Nome as string,
                MembershipPrice: response?.price ? response?.price?.Valor : '0',
                RecurrencePrice: response?.secondPrice
                  ? response?.secondPrice.Valor
                  : '0',
                Type: 'Serviço'
              }
            })
          })
        )

        const products = await Promise.all(
          activeVehicle.Produtos.map(async (product) => {
            const Identifier = await getItemIdentifier(
              product.TipoItem_Id,
              product.Identificador
            )
            return await getProductById(
              product.Produto_Id,
              product.PrecoDeAdesao_Id,
              product.PrecoDeRecorrencia_Id
            ).then((response) => {
              return {
                Id: response?.product?.Id,
                PriceId: response?.price?.Id,
                Name: response?.product?.Nome as string,
                MembershipPrice: response?.price ? response?.price.Valor : '0',
                RecurrencePrice: response?.secondPrice
                  ? response?.secondPrice?.Valor
                  : '0',
                Type: 'Produto',
                Identifier
              }
            })
          })
        )

        setBenefits(benefits)
        if(activeVehicle.Situacao_Id === 'inativo'){
          proposalsItens.push(
            {
              Vehicle: `${
                activeVehicle.Veiculo.Placa
                  ? activeVehicle.Veiculo.Placa
                  : activeVehicle.Veiculo.NumeroDoChassi
              } ${
                activeVehicle.Veiculo.Apelido
                  ? ' - ' + activeVehicle.Veiculo.Apelido
                  : ''
              } (inativo)`
            }
          )
          return
        }
        proposalsItens.push(
          {
            Vehicle: `${
              activeVehicle.Veiculo.Placa
                ? activeVehicle.Veiculo.Placa
                : activeVehicle.Veiculo.NumeroDoChassi
            } ${
              activeVehicle.Veiculo.Apelido
                ? ' - ' + activeVehicle.Veiculo.Apelido
                : ''
            }`
          },
          ...benefits.map((benefit) => {
            return {
              Name: benefit.Name,
              MembershipPrice: benefit.MembershipPrice,
              RecurrencePrice: benefit.RecurrencePrice,
              Type: benefit.Type
            }
          }),
          ...services.map((service) => {
            return {
              Name: service.Name,
              MembershipPrice: service.MembershipPrice,
              RecurrencePrice: service.RecurrencePrice,
              Type: service.Type
            }
          }),
          ...products.map((product) => {
            return {
              Name: product.Name,
              MembershipPrice: product.MembershipPrice,
              RecurrencePrice: product.RecurrencePrice,
              Type: product.Type,
              Identifier: product.Identifier
            }
          })
        )
      })
    )
    setCollection(proposalsItens)
  }

  useEffect(() => {
    if (clientData) {
      getCollection()
    }
  }, [clientData])

  useEffect(() => {
    getRecurrenceTotalValue()
  }, [benefits])

  return (
    <common.Card>
      <div className="flex pt-3">
        <clients.InfoDetails
          title={`Detalhes do cliente`}
          subtitle={clientData?.Pessoa.Nome}
          details={[
            {
              key: clientData?.Pessoa.PessoaJuridica ? 'CNPJ' : 'CPF',
              value: clientData?.Pessoa.PessoaJuridica
                ? utils.CNPJFormat(clientData?.Pessoa.Identificador)
                : utils.CPFFormat(clientData?.Pessoa.Identificador as string)
            }
          ]}
        />
      </div>
      <common.Divider />
      <blocks.BorderLessTable
        colection={collection}
        columnTitles={[
          {
            title: 'Veículo',
            fieldName: 'Vehicle',
            type: 'handler',
            handler: (value) => (value ? value : '')
          },
          {
            title: 'Descrição do Beneficio / Serviço / Produto',
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
            title: 'Identificador',
            fieldName: 'Identifier',
            type: 'handler',
            handler: (value) => (value !== undefined ? value : '')
          }
        ]}
      />
      <common.Divider />
      <common.LineInfoDetailsColumns>
        <clients.InfoDetails
          title={`Recorrência`}
          subtitle={utils.BRLMoneyFormat(totalValue)}
          details={[
            {
              key: 'Forma de Pagamento',
              value: 'Mastercard'
            },
            {
              key: 'Vencimento',
              value: 'Mastercard'
            }
          ]}
          textAlignRight
        >
          <div className="mt-1">Adesão</div>
        </clients.InfoDetails>
      </common.LineInfoDetailsColumns>
    </common.Card>
  )
}
