import * as queries from '../operations/queries'
import * as utils from '@comigo/utils'
import { CollectionType } from '../types/collection'
import { ServiceOrderData } from '../types/serviceOrder'
import { Dispatch, SetStateAction } from 'react'

type GetBenefitsTotalValueProps = {
  benefits: CollectionType[]
  serviceOrderData: ServiceOrderData
  setBenefitsValue: Dispatch<SetStateAction<string>>
}

export async function getBenefitsTotalValue({
  benefits,
  serviceOrderData,
  setBenefitsValue
}: GetBenefitsTotalValueProps) {
  let totalPrice = 0
  benefits?.map((benefit) => {
    totalPrice += Number(benefit.RecurrencePrice)
  })
  await Promise.all(
    serviceOrderData.Produtos?.map(async (product) => {
      if (product.PrecoDeRecorrencia_Id) {
        const price = await queries.getProductPriceById(
          product.PrecoDeRecorrencia_Id
        )
        totalPrice += Number(price.Valor)
      }
    })
  )
  await Promise.all(
    serviceOrderData.Servicos?.map(async (service) => {
      if (service.PrecoDeRecorrencia_Id) {
        const price = await queries.getServicePriceById(
          service.PrecoDeRecorrencia_Id
        )
        totalPrice += Number(price.Valor)
      }
    })
  )
  setBenefitsValue(utils.BRLMoneyFormat(totalPrice))
}
