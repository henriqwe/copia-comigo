import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'
import * as utils from '@comigo/utils'
import axios from 'axios'

import { Tab } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function ViewProposal() {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const {
    setSlidePanelState,
    categories,
    runServiceQuery,
    runProductQuery,
    runPlanQuery,
    runComboQuery,
    proposalData,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    getVehicleById,
    getClientById,
    client,
    setClient,
    acceptProposal,
    refuseProposal,
    refuseProposalLoading,
    getPaymentTypeById,
    setPaymentType,
    setClientPaymentType,
    getClientProposalsByClientId,
    setDisabledUpdateClientPaymentType
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

  const dropDownConcludesActions = [
    {
      title: 'Concluir Proposta',
      action: async () => {
        await acceptProposal().then(() => {
          if (typeof window !== 'undefined') {
            const hostname = window.location.hostname

            axios.get(
              `http://${hostname}:3002/api/acoes/gerar-os?proposalId=${router.query.id}&type=instalacao`
            )
          }

          utils.notification('Proposta concluida com sucesso', 'success')
        })
      }
    },
    {
      title: 'Recusar Proposta',
      action: () => setOpenModal(true)
    }
  ]

  async function refuseProposalSubmit() {
    await refuseProposal().then(() => {
      setOpenModal(false)
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
      const categoriesIds = categories.map((category) =>
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
        setCategories((old) => {
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

  return (
    <div className={`flex flex-col my-3 w-full`}>
      <Tab.Group onChange={(item) => setSelectedCategory(categories[item])}>
        <div className={`flex w-full items-center justify-between`}>
          <div className="flex flex-1">
            <Tab.List className="flex p-2 space-x-2 rounded-lg">
              <proposals.RenderTabsList
                categories={categories}
                format={utils.licensePlateFormat}
              />
            </Tab.List>
            {proposalData?.Situacao.Comentario === 'Criado' &&
              proposalData !== undefined && (
                <common.buttons.SecondaryButton
                  handler={() => {
                    setSlidePanelState({ open: true, type: 'proposalVehicle' })
                  }}
                />
              )}
          </div>
          {proposalData?.Situacao.Comentario === 'Criado' &&
          proposalData !== undefined ? (
            <div className="flex items-center">
              {selectedCategory.title !== 'Resumo' && (
                <common.Dropdown
                  title={
                    <common.icons.AddIcon className="w-6 h-6 text-black" />
                  }
                  handler={() => null}
                  titleClassName={`bg-white px-3 py-1.5 rounded-lg`}
                  noChevronDownIcon
                  items={dropDownActions}
                />
              )}
              {/* FIXME: normalizar tamanhos e paddings dos botões */}
              <common.Dropdown
                title={
                  <common.icons.CheckIcon className="w-6 h-6 text-white mt-1.5 mb-1" />
                }
                handler={() => null}
                titleClassName={`bg-primary px-3 pb-1 rounded-lg`}
                noChevronDownIcon
                items={dropDownConcludesActions}
              />
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
        <Tab.Panels className="mt-2">
          <proposals.RenderPanelsList categories={categories} />
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
