import * as common from '@comigo/ui-common'
import * as clients from '&crm/domains/clients'
import * as utils from '@comigo/utils'
import { v4 as uuid } from 'uuid'

import { Tab } from '@headlessui/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import routes from '&crm/domains/routes'
import axios from 'axios'

export function ViewClient() {
  const router = useRouter()
  const {
    clientData,
    setSlidePanelState,
    createProposal,
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    userAndTicketData,
    clientRefetch
  } = clients.useUpdate()

  const dropDownActions = [
    {
      title: 'Gerar proposta para o veículo selecionado',
      action: createVehicleProposal
    },
    {
      title: 'Mudar titularidade do veículo',
      action: async () => {
        setSlidePanelState({
          open: true,
          type: 'ownership'
        })
      }
    },
    {
      title: 'Trocar veículo',
      action: async () => {
        setSlidePanelState({
          open: true,
          type: 'vehicle'
        })
      }
    }
  ]

  if (selectedCategory.id) {
    dropDownActions.push({
      title: 'Desinstalar veículo',
      action: async () => {
        if (typeof window !== 'undefined') {
          const hostname = window.location.hostname

          axios
            .get(
              `http://${hostname}:3002/api/acoes/gerar-os-desinstalacao?vehicleId=${selectedCategory.id}`
            )
            .then(() => {
              utils.notification(
                'OS de desinstalação criada com sucesso',
                'success'
              )
              clientRefetch()
            })
        }
      }
    })
  }

  async function createVehicleProposal() {
    try {
      const vehicle = clientData.VeiculosAtivos.filter(
        (activeVehicle) => activeVehicle.Id === selectedCategory.id.toString()
      )[0]
      const proposalUUID = uuid()
      await createProposal({
        variables: {
          Id: proposalUUID,
          Lead_Id: null,
          Ticket_Id: null,
          Usuario_Id: userAndTicketData?.autenticacao_Usuarios?.[0].Id,
          Cliente_Id: router.query.id,
          veiculosData: [
            {
              Veiculo_Id: vehicle.Veiculo.Id,
              PropostasCombos: {
                data: vehicle.Beneficios?.filter(
                  (benefit) => benefit.TipoPortfolio === 'combo'
                ).map((combo) => {
                  return {
                    Proposta_Id: proposalUUID,
                    Combo_Id: combo.Portfolio_Id,
                    ComboPreco_Id: combo.PortfolioPreco_Id
                  }
                })
              },
              PropostasPlanos: {
                data: vehicle.Beneficios?.filter(
                  (benefit) => benefit.TipoPortfolio === 'plano'
                ).map((plan) => {
                  return {
                    Proposta_Id: proposalUUID,
                    Plano_Id: plan.Portfolio_Id,
                    PlanoPreco_Id: plan.PortfolioPreco_Id
                  }
                })
              },
              PropostasServicos: {
                data: vehicle.Beneficios?.filter(
                  (benefit) => benefit.TipoPortfolio === 'serviço'
                ).map((service) => {
                  return {
                    Proposta_Id: proposalUUID,
                    Servico_Id: service.Portfolio_Id,
                    ServicosPreco_Id: service.PortfolioPreco_Id
                  }
                })
              }
            }
          ]
          // oportunidadesData: []
        }
      }).then((response) => {
        router.push(
          routes.propostas +
            '/' +
            response?.data.insert_propostas_Propostas_one.Id + '?origin=activeVehicleProposal'
        )
        utils.notification('Proposta criada com sucesso', 'success')
      })
    } catch (err: any) {
      utils.showError(err)
    }
    return
  }

  useEffect(() => {
    if (clientData) {
      const categoriesIds = categories.map((category) =>
        category.id?.toString()
      )
      const newVehicles = clientData.VeiculosAtivos.map((activeVehicle) => {
        if (!categoriesIds.includes(activeVehicle.Id)) {
          return {
            id: activeVehicle.Id,
            title: activeVehicle.Veiculo.Placa
              ? activeVehicle.Veiculo.Placa
              : activeVehicle.Veiculo.NumeroDoChassi,
            type: 'Vehicle'
          }
        }
      })

      setCategories((old) => {
        return [
          ...old,
          ...newVehicles.filter((vehicles) => vehicles !== undefined)
        ]
      })
    }
  }, [clientData])

  return (
    <div className={`flex flex-col my-3 w-full col-span-12`}>
      <Tab.Group onChange={(item) => setSelectedCategory(categories[item])}>
        <div className={`flex w-full items-center justify-between`}>
          <div className="flex w-full">
            <Tab.List className="flex p-2 space-x-2 rounded-lg">
              <clients.RenderTabsList
                categories={categories}
                format={utils.licensePlateFormat}
              />
            </Tab.List>
            <common.buttons.SecondaryButton
              handler={() =>
                setSlidePanelState({
                  open: true,
                  type: 'proposal'
                })
              }
            />
          </div>
          <div className="flex items-center">
            {selectedCategory.title !== 'Resumo' && (
              <common.Dropdown
                title={<common.icons.AddIcon className="w-6 h-6 text-black" />}
                handler={() => null}
                titleClassName={`bg-white px-3 py-1.5 rounded-lg`}
                noChevronDownIcon
                items={dropDownActions}
              />
            )}
          </div>
        </div>
        <Tab.Panels className="mt-2">
          <clients.RenderPanelsList categories={categories} />
        </Tab.Panels>
      </Tab.Group>
      <clients.SlidePanel />
    </div>
  )
}
