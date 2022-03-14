import * as proposals from '&crm/domains/Proposals'

import { useEffect } from 'react'

export function ViewProposalToPrint() {
  const {
    tabsForPage,

    proposalData,
    setTabsForPage,
    getVehicleById,
    getClientById,
    client,
    setClient,

    getPaymentTypeById,
    setPaymentType,
    setClientPaymentType,
    getClientProposalsByClientId,
    setDisabledUpdateClientPaymentType,

    setLead,
    getLeadById
  } = proposals.useUpdate()

  async function getPaymentType() {
    if (proposalData?.FormaDePagamentoDaAdesao_Id) {
      await getPaymentTypeById(proposalData.FormaDePagamentoDaAdesao_Id).then(
        (paymentType) => {
          setPaymentType(paymentType)
        }
      )
    }
  }

  async function getClientPaymentType() {
    if (client?.FormaDePagamento_Id) {
      await getPaymentTypeById(client?.FormaDePagamento_Id).then(
        (paymentType) => {
          setClientPaymentType(paymentType)
        }
      )
    }
  }

  async function getClientProposals() {
    if (client) {
      await getClientProposalsByClientId(client.Id).then((response) => {
        if (response.length > 1) {
          setDisabledUpdateClientPaymentType(true)
        }
      })
    }
  }

  useEffect(() => {
    if (proposalData) {
      const categoriesIds = tabsForPage.map((category) =>
        category.id?.toString()
      )
      const newVehicles = proposalData.Veiculos.map(async (proposalVehicle) => {
        const vehicle = await getVehicleById(proposalVehicle.Veiculo_Id)
        if (vehicle !== null && !categoriesIds.includes(proposalVehicle.Id)) {
          return {
            id: proposalVehicle.Id,
            title: vehicle.Placa ? vehicle.Placa : vehicle.NumeroDoChassi,
            type: 'Vehicle'
          }
        }
      })

      ;(async () => {
        const vehicles = await Promise.all(newVehicles)
        setTabsForPage((old) => {
          return [
            ...old,
            ...vehicles.filter((vehicles) => vehicles !== undefined)
          ]
        })

        if (proposalData.Cliente_Id) {
          const cliente = await getClientById(proposalData.Cliente_Id)
          setClient(cliente)
        }
        if (proposalData.Lead_Id) {
          const lead = await getLeadById(proposalData.Lead_Id)
          setLead(lead)
        }
      })()
      getPaymentType()
    }
  }, [proposalData])

  useEffect(() => {
    if (client) {
      getClientPaymentType()
      getClientProposals()
    }
  }, [client])

  return <proposals.Resume />
}
