import { Content } from './Content'
import { useEffect, useState } from 'react'
import { itensChecklistType } from '../../../types/checklist'

import * as serviceOrders from '&erp/domains/operational/ServiceOrders'
import * as queries from '../../../operations/queries'

export function Checklist() {
  const [itensChecklist, setItensChecklist] = useState<itensChecklistType[]>()
  const [collaborator, setCollaborator] = useState<{
    Id: string
    Pessoa: {
      Nome: string
    }
  }>()

  const {
    serviceOrderData,
    client,
    setClient,
    setVehicle,
    vehicle,
    collaboratorsData
  } = serviceOrders.useUpdate()

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

      getVehicle()
      queries.getItensCheckListByNameChecklist('checklist 1').then((itens) => {
        setItensChecklist(itens)
      })
      if (serviceOrderData.Agendamentos.length > 0) {
        collaboratorsData.forEach((collaborator) => {
          if (
            collaborator.Id === serviceOrderData.Agendamentos[0].Colaborador_Id
          ) {
            setCollaborator(collaborator)
          }
        })
      }
    }
  }, [serviceOrderData])

  return (
    <div className="flex flex-col w-full">
      {client && serviceOrderData && vehicle && itensChecklist ? (
        <Content
          itensChecklist={itensChecklist}
          client={client}
          serviceOrderData={serviceOrderData}
          collaborator={collaborator}
          vehicle={vehicle}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
