import * as queries from '../operations/queries'
import { Dispatch, SetStateAction } from 'react'
import { CollectionType } from '../types/collection'
import { ServiceOrderData } from '../types/serviceOrder'

type GetServicesProps = {
  serviceOrderData: ServiceOrderData
  setServicesCollection: Dispatch<
    SetStateAction<Omit<CollectionType, 'Type'>[]>
  >
}

export async function getServices({
  serviceOrderData,
  setServicesCollection
}: GetServicesProps) {
  const collection = serviceOrderData.Servicos.filter(
    (service) => service.Servico.GeraOS
  ).map(async (service) => {
    const membershipPrice = service.PrecoDeAdesao_Id
      ? await queries.getServicePriceById(service.PrecoDeAdesao_Id)
      : { Valor: 0 }
    const recurrencePrice = service.PrecoDeRecorrencia_Id
      ? await queries.getServicePriceById(service.PrecoDeRecorrencia_Id)
      : { Valor: 0 }
    return {
      Name: service.Servico.Nome,
      MembershipPrice: membershipPrice.Valor,
      RecurrencePrice: recurrencePrice.Valor
    }
  })

  ;(async () => {
    setServicesCollection(await Promise.all(collection))
  })()
}
