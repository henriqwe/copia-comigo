import * as queries from '../operations/queries'
import * as utils from '@comigo/utils'
import { CollectionType } from '../types/collection'
import { ServiceOrderData } from '../types/serviceOrder'
import { Dispatch, SetStateAction } from 'react'

type GetAccessionTotalValueProps = {
  benefits: CollectionType[]
  serviceOrderData: ServiceOrderData
  setAccessionValue: Dispatch<SetStateAction<string>>
}

export async function getAccessionTotalValue({
  benefits,
  serviceOrderData,
  setAccessionValue
}: GetAccessionTotalValueProps) {
  let totalPrice = 0
  benefits?.map((benefit) => {
    totalPrice += Number(benefit.MembershipPrice)
  })
  await Promise.all(
    serviceOrderData.Produtos?.map(async (product) => {
      if (product.PrecoDeAdesao_Id) {
        const price = await queries.getProductPriceById(
          product.PrecoDeAdesao_Id
        )
        totalPrice += Number(price.Valor)
      }
    })
  )
  await Promise.all(
    serviceOrderData.Servicos?.map(async (service) => {
      if (service.PrecoDeAdesao_Id) {
        const price = await queries.getServicePriceById(
          service.PrecoDeAdesao_Id
        )
        totalPrice += Number(price.Valor)
      }
    })
  )
  setAccessionValue(utils.BRLMoneyFormat(totalPrice))
}
