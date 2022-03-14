import * as common from '@comigo/ui-common'
import { Content } from './Content'
import * as serviceOrders from '&erp/domains/operational/ServiceOrders'
import { useEffect, useState } from 'react'
import * as api from '../../../api'
import * as queries from '../../../operations/queries'
import { CollectionType } from '../../../types/collection'

export function Invoice() {
  const [accessionValue, setAccessionValue] = useState('0')
  const [benefits, setBenefits] = useState<CollectionType[]>()
  const { serviceOrderData, client, setClient, setVehicle } =
    serviceOrders.useUpdate()

  function getVehicle() {
    queries
      .getServiceOrderVehicle(serviceOrderData?.Veiculo_Id as string)
      .then((vehicle) => {
        setVehicle(vehicle)
      })
  }

  useEffect(() => {
    if (serviceOrderData) {
      if (serviceOrderData.Proposta) {
        queries
          .getProposalClient(serviceOrderData.Proposta?.Cliente_Id as string)
          .then((client) => {
            setClient(client)
          })
      }

      if (
        serviceOrderData.Proposta === null &&
        client === undefined &&
        serviceOrderData.Situacao.Valor !== 'finalizada'
      ) {
        queries
          .getClientByVehicle(serviceOrderData.Veiculo_Id as string)
          .then((client) => {
            if (client.VeiculosAtivos.length > 0) {
              setClient(client.VeiculosAtivos[0].Cliente)
            }
          })
      }

      api.getBenefits({
        serviceOrderData,
        setBenefits
      })

      getVehicle()
    }
  }, [serviceOrderData])

  useEffect(() => {
    if (benefits) {
      api.getAccessionTotalValue({
        benefits,
        serviceOrderData,
        setAccessionValue
      })
    }
  }, [benefits])

  return (
    <div className="flex flex-col w-full">
      {client && serviceOrderData && (
        <>
          <Content
            client={client}
            accessionValue={accessionValue}
            serviceOrderData={serviceOrderData}
          />
          <common.Separator className="my-3.5 border-dashed" />
          <Content
            client={client}
            accessionValue={accessionValue}
            serviceOrderData={serviceOrderData}
          />
        </>
      )}
    </div>
  )
}
