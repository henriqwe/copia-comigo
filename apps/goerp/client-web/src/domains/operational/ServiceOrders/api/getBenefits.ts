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
  const benefits = serviceOrderData?.Beneficios.map(async (benefit) => {
    switch (benefit.TipoPortfolio) {
      case 'serviço':
        return await queries
          .getServiceById(
            benefit.Portfolio_Id,
            benefit.PrecoDeAdesao_Id,
            benefit.PrecoDeRecorrencia_Id
          )
          .then((response) => {
            return {
              Name: response?.service?.Nome as string,
              MembershipPrice: response?.price ? response?.price.Valor : 0,
              RecurrencePrice: response?.secondPrice
                ? response?.secondPrice.Valor
                : 0,
              Type: 'serviço'
            }
          })
      case 'plano':
        return await queries
          .getPlanById(benefit.Portfolio_Id, benefit.PortfolioPreco_Id)
          .then((response) => {
            return {
              Name: response?.plan?.Nome as string,
              MembershipPrice: response?.price.ValorDeAdesao,
              RecurrencePrice: response?.price.ValorDeRecorrencia,
              Type: 'plano'
            }
          })
      case 'combo':
        return await queries
          .getComboById(benefit.Portfolio_Id, benefit.PortfolioPreco_Id)
          .then((response) => {
            return {
              Name: response?.combo?.Nome as string,
              MembershipPrice: response?.price.ValorDeAdesao,
              RecurrencePrice: response?.price.ValorDeRecorrencia,
              Type: 'combo'
            }
          })
    }
  })
  const benefitsArray = await Promise.all(benefits)
  setBenefits(benefitsArray)
}
