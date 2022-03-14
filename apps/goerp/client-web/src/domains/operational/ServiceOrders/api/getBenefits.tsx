import { Dispatch, SetStateAction } from 'react'
import * as queries from '../operations/queries'
import { CollectionType } from '../types/collection'
import { ServiceOrderData } from '../types/serviceOrder'

type GetBenefitsProps = {
  serviceOrderData: ServiceOrderData
  setBenefits: Dispatch<SetStateAction<CollectionType[]>>
}

export async function getBenefits({
  serviceOrderData,
  setBenefits
}: GetBenefitsProps) {
  const benefits = await Promise.all(
    serviceOrderData?.Planos.map(async (plan) => {
      let planPrice: {
        ValorDeAdesao: string
        ValorDeRecorrencia: string
        Id: string
      }
      if (plan.PlanoPreco_Id) {
        planPrice = await queries.getPlanPriceById(plan.PlanoPreco_Id)
      }

      return {
        Name: (
          <span className={plan.OrdemDeServicoCombo_Id !== null ? 'ml-4' : ''}>
            {plan.Plano.Nome}
          </span>
        ),
        MembershipPrice: planPrice?.ValorDeAdesao || 0,
        RecurrencePrice: planPrice?.ValorDeRecorrencia || 0,
        Type: 'plano'
      }
    })
  )

  serviceOrderData?.Combos.map((combo) => {
    benefits.push({
      Name: <span>{combo.Combo.Nome}</span>,
      MembershipPrice: combo.ComboPreco.ValorDeAdesao,
      RecurrencePrice: combo.ComboPreco.ValorDeRecorrencia,
      Type: 'combo'
    })
  })

  await Promise.all(
    serviceOrderData?.Servicos.filter((service) => service.Beneficio).map(
      async (service) => {
        const response = await queries.getServiceById(
          service.Id,
          service.PrecoDeAdesao_Id,
          service.PrecoDeRecorrencia_Id
        )

        benefits.push({
          Name: (
            <span
              className={
                service.OrdemDeServicoCombo_Id !== null ||
                service.OrdemDeServicoPlano_Id !== null
                  ? 'ml-4'
                  : ''
              }
            >
              {service.Servico.Nome}
            </span>
          ),
          MembershipPrice: response?.price ? response?.price.Valor : 0,
          RecurrencePrice: response?.secondPrice
            ? response?.secondPrice.Valor
            : 0,
          Type: 'serviço'
        })
      }
    )
  )

  const benefitsArray = await Promise.all(benefits)
  setBenefits(benefitsArray)
}
