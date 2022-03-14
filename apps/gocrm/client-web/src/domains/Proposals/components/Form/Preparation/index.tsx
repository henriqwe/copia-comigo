import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'
import * as utils from '@comigo/utils'

import { Tab } from '@headlessui/react'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import ReactToPrint from 'react-to-print'
import { deleteProposalVehicle } from '&crm/domains/Proposals/operations/deleteProposalVehicle'
import { generateProposal } from '&crm/domains/Proposals/operations/generateProposal'

export function Preparation() {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [tabGroupIndex, setTabGroupIndex] = useState({
    currentTab: 0,
    tabsForPageLength: 0
  })
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const componentRef = useRef(null)

  const {
    setSlidePanelState,
    tabsForPage,
    runServiceQuery,
    runProductQuery,
    runPlanQuery,
    runComboQuery,
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
    updateProposalAlert,
    setLead,
    getLeadById,
    selectedTab
  } = proposals.useUpdate()

  const dropDownActions = [
    {
      title: 'Adicionar Serviço',
      action: async () => {
        await runServiceQuery()
        setSlidePanelState({ open: true, type: 'proposalService' })
      }
    },
    {
      title: 'Adicionar Produto',
      action: async () => {
        await runProductQuery()
        setSlidePanelState({ open: true, type: 'proposalProduct' })
      }
    },
    {
      title: 'Adicionar Plano',
      action: async () => {
        await runPlanQuery()
        setSlidePanelState({ open: true, type: 'proposalPlan' })
      }
    },
    {
      title: 'Adicionar Combo',
      action: async () => {
        await runComboQuery()
        setSlidePanelState({ open: true, type: 'proposalCombo' })
      }
    }
  ]

  async function refuseProposalSubmit() {
    await refuseProposal().then(() => {
      setOpenModal(false)
      proposalRefetch()
      utils.notification('Proposta recusada com sucesso', 'success')
    })
  }

  async function deleteVehicleSubmit() {
    try {
      setLoading(true)
      await deleteProposalVehicle({ Id: selectedTab.id.toString() })
      setShowModal(false)
      setLoading(false)
      proposalRefetch()
      setSelectedTab(tabsForPage[0])

      setTabsForPage((old) => [
        ...old.filter((oldTabs) => oldTabs?.id !== selectedTab.id)
      ])
      setTabGroupIndex({
        currentTab: 0,
        tabsForPageLength: tabsForPage.filter(
          (oldTabs) => oldTabs?.id !== selectedTab.id
        ).length
      })
      utils.notification('Veículo deletado com sucesso', 'success')
    } catch (err) {
      setLoading(false)
      utils.showError(err)
    }
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

  async function setProposalData() {
    const categoriesIds = tabsForPage.map((category) => category.id?.toString())

    const newVehicles = await Promise.all(
      proposalData.Veiculos.map(async (proposalVehicle) => {
        const vehicle = await getVehicleById(proposalVehicle.Veiculo_Id)
        if (vehicle !== null && !categoriesIds.includes(proposalVehicle.Id)) {
          return {
            id: proposalVehicle.Id,
            title: vehicle.Placa ? vehicle.Placa : vehicle.NumeroDoChassi,
            type: 'Vehicle'
          }
        }
      })
    )

    setTabsForPage((old) => {
      return [
        ...old,
        ...newVehicles.filter((vehicles) => vehicles !== undefined)
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
  }

  useEffect(() => {
    if (proposalData) {
      setProposalData()
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
    <div className={`flex flex-col my-3 w-full`} id="print">
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
        {proposalData?.RegrasETermosDeUsos.map((alert, index) => (
          <div
            className="flex items-center justify-between p-2 mb-2 alert alert-warning show"
            role="alert"
            key={index}
          >
            <p>
              {alert.ProdutoRegrasETermosDeUso
                ? alert.ProdutoRegrasETermosDeUso.Mensagem
                : alert.ServicoRegrasETermosDeUso?.Mensagem}
            </p>
            <div className="flex gap-2">
              <p>Foi informado?</p>
              <common.form.Switch
                onChange={async () => {
                  await updateProposalAlert({
                    variables: {
                      Id: alert.Id,
                      Informado: !alert.Informado
                    }
                  })
                  proposalRefetch()
                }}
                size="small"
                value={alert.Informado}
              />
            </div>
          </div>
        ))}
        <div className={`flex w-full items-center justify-between`}>
          <div className="flex flex-1">
            <Tab.List className="flex p-2 space-x-2 rounded-lg">
              <proposals.RenderTabsList
                tabsForPage={tabsForPage}
                format={utils.licensePlateFormat}
              />
            </Tab.List>
          </div>
          <div className="flex flex-1">
            {proposalData?.Situacao.Comentario === 'Criado' && (
              <div className="flex items-center flex-1 space-x-2">
                {proposalData?.Situacao.Comentario === 'Criado' &&
                  proposalData !== undefined &&
                  router.query.origin !== 'changeVehicle' && (
                    <div>
                      <common.buttons.SecondaryButton
                        title={'Adicionar veículo'}
                        handler={() => {
                          setSlidePanelState({
                            open: true,
                            type: 'proposalVehicle'
                          })
                        }}
                      />
                    </div>
                  )}

                {router.query.origin !== 'changeVehicle' &&
                  proposalData.Veiculos.length > 0 && (
                    <div>
                      <common.Dropdown
                        title={'Benefícios'}
                        handler={() => null}
                        titleClassName={`bg-white px-3 py-2.5 my-2 rounded-lg`}
                        noChevronDownIcon
                        items={dropDownActions}
                      />
                    </div>
                  )}

                <div>
                  <ReactToPrint
                    trigger={() => (
                      <button
                        type="button"
                        className={`flex items-center text-white px-3 py-2 transition rounded-md bg-opacity-70 hover:opacity-100 disabled:cursor-not-allowed disabled:bg-gray-400 btn btn-primary w-full`}
                        disabled={
                          proposalData?.RegrasETermosDeUsos.filter(
                            (alert) => !alert.Informado
                          ).length > 0
                        }
                      >
                        <p>Gerar proposta</p>
                      </button>
                    )}
                    content={() => componentRef.current}
                    onAfterPrint={() => {
                      setCurrentStage(currentStage + 1)
                      generateProposal({ Id: router.query.id as string })
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div>
            {proposalData?.Situacao.Comentario === 'Criado' ? (
              <div className="flex items-center space-x-2">
                {proposalData?.Situacao.Comentario === 'Criado' &&
                  proposalData !== undefined &&
                  router.query.origin !== 'changeVehicle' &&
                  selectedTab.id && (
                    <div>
                      <common.buttons.CancelButton
                        onClick={() => setShowModal(true)}
                        title={'Remover veículo'}
                      />
                    </div>
                  )}
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
      <common.Modal
        handleSubmit={deleteVehicleSubmit}
        open={showModal}
        disabled={loading}
        description="Quer realmente deletar esse veículo e seus itens? (não poderá recuperar o veículo novamente)"
        onClose={() => setShowModal(false)}
        buttonTitle="Deletar veículo"
        modalTitle="Quer deletar o veículo e seus itens"
        color="red"
      />
    </div>
  )
}
