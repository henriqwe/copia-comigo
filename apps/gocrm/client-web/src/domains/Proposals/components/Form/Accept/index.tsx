import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'
import * as utils from '@comigo/utils'

import { Tab } from '@headlessui/react'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { acceptProposalSubmit } from '&crm/domains/Proposals/api/acceptProposal'
import ReactToPrint from 'react-to-print'

export function Accept() {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [tabGroupIndex, setTabGroupIndex] = useState({
    currentTab: 0,
    tabsForPageLength: 0
  })
  const componentRef = useRef(null)

  const {
    tabsForPage,
    proposalData,
    setTabsForPage,
    setSelectedTab,
    getVehicleById,
    getClientById,
    client,
    setClient,
    refuseProposal,
    refuseProposalLoading,
    getPaymentTypeById,
    setPaymentType,
    setClientPaymentType,
    getClientProposalsByClientId,
    setDisabledUpdateClientPaymentType,
    proposalRefetch,
    setCurrentStage,
    currentStage,
    setLead,
    getLeadById
  } = proposals.useUpdate()

  async function proposalValidation() {
    const isVehicleEmpty = proposalData?.Veiculos.filter((vehicle) => {
      if (
        vehicle.PropostasCombos.length === 0 &&
        vehicle.PropostasPlanos.length === 0 &&
        vehicle.PropostasProdutos.length === 0 &&
        vehicle.PropostasServicos.length === 0
      ) {
        return true
      }
    })
    if (
      proposalData.Combos.length === 0 &&
      proposalData.Planos.length === 0 &&
      proposalData.Produtos.length === 0 &&
      proposalData.Servicos.length === 0 &&
      (proposalData.Veiculos.length === 0 || isVehicleEmpty.length > 0)
    ) {
      return utils.notification(
        'Preencha os veículos para concluir a proposta',
        'error'
      )
    }

    await acceptProposalSubmit(router.query, proposalRefetch)
    setCurrentStage(currentStage + 1)
  }

  async function refuseProposalSubmit() {
    await refuseProposal().then(() => {
      setOpenModal(false)
      proposalRefetch()
      utils.notification('Proposta recusada com sucesso', 'success')
    })
  }

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

  useEffect(() => {
    if (
      tabsForPage.length - 1 !== 1 &&
      tabGroupIndex.tabsForPageLength !== tabsForPage.length
    ) {
      setTabGroupIndex({
        currentTab: tabsForPage.length - 1,
        tabsForPageLength: tabsForPage.length
      })
      setSelectedTab(tabsForPage[tabsForPage.length - 1])
    }
  }, [tabsForPage])

  return (
    <div className={`flex flex-col my-3 w-full`}>
      <Tab.Group
        selectedIndex={tabGroupIndex.currentTab}
        onChange={(item) => {
          setSelectedTab(tabsForPage[item])
          setTabGroupIndex({
            currentTab: item,
            tabsForPageLength: tabGroupIndex.tabsForPageLength
          })
        }}
      >
        <div className={`flex w-full items-center justify-between`}>
          <div className="flex flex-1">
            <Tab.List className="flex p-2 space-x-2 rounded-lg">
              <proposals.RenderTabsList
                tabsForPage={tabsForPage}
                format={utils.licensePlateFormat}
              />
            </Tab.List>
          </div>

          <div>
            {proposalData?.Situacao.Comentario === 'Criado' ? (
              <div className="flex items-center w-full space-x-2">
                <div className="flex items-center justify-center space-x-2">
                  <common.buttons.PrimaryButton
                    title={'Editar proposta'}
                    onClick={() =>  setCurrentStage(currentStage - 1)}
                  />
                  <button
                    type="button"
                    className={`flex items-center px-3 py-2 transition rounded-md bg-gray-600 bg-opacity-70 hover:bg-gray-700 hover:opacity-100 text-white`}
                  >
                    <a
                      target="_blank"
                      href="http://localhost:3001/api/getPageToPrint"
                      rel="noreferrer"
                    >
                      gerar pdf
                    </a>
                  </button>
                  <ReactToPrint
                    trigger={() => (
                      <button
                        type="button"
                        className={`flex items-center px-3 py-2 transition rounded-md bg-gray-600 bg-opacity-70 hover:bg-gray-700 hover:opacity-100`}
                      >
                        <common.icons.PrinterIcon />
                      </button>
                    )}
                    content={() => componentRef.current}
                  />

                  {/* FIXME: normalizar tamanhos e paddings dos botões */}
                  <common.buttons.CancelButton
                    title={'Recusar'}
                    onClick={() => setOpenModal(true)}
                  />
                  <common.buttons.PrimaryButton
                    title={'Aceitar'}
                    onClick={() => proposalValidation()}
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 text-right">
                {proposalData?.Situacao.Comentario === 'Aceito' ? (
                  <p className="text-lg font-bold text-success">
                    Proposta Aceita
                  </p>
                ) : (
                  <p className="text-lg font-bold text-danger">
                    Proposta Recusada
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <Tab.Panels className="mt-2">
          <div ref={componentRef}>
            <proposals.RenderPanelsList tabsForPage={tabsForPage} />
          </div>
        </Tab.Panels>
      </Tab.Group>
      <proposals.UpdateSlidePanel />
      <common.Modal
        handleSubmit={refuseProposalSubmit}
        open={openModal}
        disabled={refuseProposalLoading}
        description="Quer realmente recusar essa proposta? (não poderá editá-la novamente)"
        onClose={() => setOpenModal(false)}
        buttonTitle="Recusar proposta"
        modalTitle="Quer recusar a proposta?"
        color="red"
      />
    </div>
  )
}
