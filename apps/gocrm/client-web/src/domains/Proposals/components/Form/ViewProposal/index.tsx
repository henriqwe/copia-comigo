import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'
import * as utils from '@comigo/utils'

import { Tab } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  acceptNewProposal,
  acceptProposalForChangeOwner,
  acceptProposalForChangeVehicle,
  acceptProposalForExistentVehicle
} from '&crm/domains/Proposals/api/acceptProposal'

export function ViewProposal() {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [tabGroupIndex, setTabGroupIndex] = useState({
    currentTab: 0,
    tabsForPageLength: 0
  })

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
    proposalRefetch
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

    switch (router.query.origin) {
      case 'changeOwnership':
        await acceptProposalForChangeOwner(
          proposalData,
          router.query,
          proposalRefetch
        )
        break
      case 'changeVehicle':
        await acceptProposalForChangeVehicle(
          proposalData,
          router.query,
          proposalRefetch
        )
        break
      case 'activeVehicleProposal':
        await acceptProposalForExistentVehicle(
          proposalData,
          router.query,
          proposalRefetch
        )
        break
      default:
        await acceptNewProposal(proposalData, router.query, proposalRefetch)
        break
    }
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
        const resultFilter = response?.filter((res) => {
          if (res.Situacao_Id === 'aceito') return res
        })
        if (resultFilter.length > 0) setDisabledUpdateClientPaymentType(true)
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

        const cliente = await getClientById(proposalData.Cliente_Id)
        setClient(cliente)
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
          <div className="flex flex-1 ">
            {proposalData?.Situacao.Comentario === 'Criado' && (
              <div className="flex items-center flex-1 space-x-2">
                <div>
                  {proposalData?.Situacao.Comentario === 'Criado' &&
                    proposalData !== undefined &&
                    router.query.origin !== 'changeVehicle' && (
                      <common.buttons.SecondaryButton
                        title={'Adicionar veículo'}
                        handler={() => {
                          setSlidePanelState({
                            open: true,
                            type: 'proposalVehicle'
                          })
                        }}
                      />
                    )}
                </div>
                <div>
                  {router.query.origin !== 'changeVehicle' &&
                    proposalData.Veiculos.length > 0 && (
                      <common.Dropdown
                        title={'Benefícios'}
                        handler={() => null}
                        titleClassName={`bg-white px-3 py-2.5 my-2 rounded-lg`}
                        noChevronDownIcon
                        items={dropDownActions}
                      />
                    )}
                </div>
              </div>
            )}
          </div>
          <div>
            {proposalData?.Situacao.Comentario === 'Criado' ? (
              <div className="flex items-center space-x-2">
                <div className="space-x-2">
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
          <proposals.RenderPanelsList tabsForPage={tabsForPage} />
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
