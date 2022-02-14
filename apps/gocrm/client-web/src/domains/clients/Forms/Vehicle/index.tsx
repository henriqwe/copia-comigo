import { useEffect, useState } from 'react'

import * as common from '@comigo/ui-common'

import * as blocks from '@comigo/ui-blocks'

import * as clients from '&crm/domains/clients'

import * as utils from '@comigo/utils'

type Collection = {
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

export function Vehicle() {
  const [totalValue, setTotalValue] = useState(0)
  const [collection, setCollection] = useState<Collection[]>([])
  const [benefits, setBenefits] = useState<BenefitType[]>([])

  const {
    clientData,
    getServiceById,
    getProductById,
    getPlanById,
    getComboById,
    selectedCategory
  } = clients.useUpdate()

  const selectedVehicle = clientData.VeiculosAtivos.filter(
    (activeVehicle) => activeVehicle.Id === selectedCategory.id.toString()
  )[0]

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
    const proposalsItens: Collection[] = []

    const benefits = selectedVehicle.Beneficios.map(async (benefit) => {
      switch (benefit.TipoPortfolio) {
        case 'serviço':
          return await getServiceById(
            benefit.Portfolio_Id,
            benefit.PortfolioPreco_Id
          ).then((response) => {
            return {
              Name: response?.service?.Nome as string,
              MembershipPrice:
                response.price.TipoDePreco.Valor === 'adesao'
                  ? response?.price?.Valor
                  : '0',
              RecurrencePrice:
                response.price.TipoDePreco.Valor === 'recorrencia'
                  ? response?.price?.Valor
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
              Name: response?.combo?.Nome as string,
              MembershipPrice: response?.price?.ValorDeAdesao,
              RecurrencePrice: response?.price?.ValorDeRecorrencia,
              Type: 'Beneficio - Combo'
            }
          })
      }
    })

    const services = selectedVehicle.Servicos.map(async (service) => {
      return await getServiceById(
        service.Servico_Id,
        service.ServicoPreco_Id
      ).then((response) => {
        return {
          Name: response?.service?.Nome as string,
          MembershipPrice:
            response?.price?.TipoDePreco?.Valor === 'adesao'
              ? response?.price?.Valor
              : '0',
          RecurrencePrice:
            response?.price?.TipoDePreco?.Valor === 'recorrencia'
              ? response?.price?.Valor
              : '0',
          Type: 'Serviço'
        }
      })
    })

    const products = selectedVehicle.Produtos.map(async (product) => {
      return await getProductById(
        product.Produto_Id,
        product.ProdutoPreco_Id
      ).then((response) => {
        return {
          Name: response?.product?.Nome as string,
          MembershipPrice:
            response?.price?.TipoDePreco?.Valor === 'adesao'
              ? response?.price?.Valor
              : '0',
          RecurrencePrice:
            response?.price?.TipoDePreco?.Valor === 'recorrencia'
              ? response?.price?.Valor
              : '0',
          Type: 'Produto'
        }
      })
    })

    ;(async () => {
      const finalBenefits = await Promise.all(benefits)
      const finalServices = await Promise.all(services)
      const finalProducts = await Promise.all(products)
      setBenefits(await Promise.all(benefits))
      proposalsItens.push(
        ...finalBenefits.map((benefit) => {
          return {
            Name: benefit.Name,
            MembershipPrice: benefit.MembershipPrice,
            RecurrencePrice: benefit.RecurrencePrice,
            Type: benefit.Type
          }
        }),
        ...finalServices.map((service) => {
          return {
            Name: service.Name,
            MembershipPrice: service.MembershipPrice,
            RecurrencePrice: service.RecurrencePrice,
            Type: service.Type
          }
        }),
        ...finalProducts.map((product) => {
          return {
            Name: product.Name,
            MembershipPrice: product.MembershipPrice,
            RecurrencePrice: product.RecurrencePrice,
            Type: product.Type
          }
        })
      )
      setCollection(proposalsItens)
    })()
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
          }
        ]}
      />
      <common.Divider />
      <common.LineInfoDetailsColumns>
        {/* <clients.InfoDetails
          title={
            <div className="flex">
              <span className="mr-2">Adesão</span>
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
            </div>
          }
          subtitle={getMembershipTotalValue()}
          details={[
            {
              key: 'Forma de Pagamento',
              value: paymentType
            }
          ]}
        /> */}

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