import { Tab } from '@headlessui/react'
import axios from 'axios'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import * as common from '@comigo/ui-common'
import * as clients from '&crm/domains/clients'
import * as utils from '@comigo/utils'

type VehiclesProps = {
  createVehicleProposal: () => Promise<void>
  filterVehicles: SelectItem
  setFilterVehicles: Dispatch<
    SetStateAction<{
      key: string | number
      title: string | number
    }>
  >
  itensFromSelect: SelectItem[]
  vehiclesActives: Vehicle[]
  vehiclesInactives: Vehicle[]
}

type Vehicle = {
  id: string
  title: string
  type: string
}

type SelectItem = {
  key: string
  title: string
}

export function Vehicles({
  createVehicleProposal,
  filterVehicles,
  setFilterVehicles,
  itensFromSelect,
  vehiclesActives,
  vehiclesInactives
}: VehiclesProps) {
  const [tabGroupIndex, setTabGroupIndex] = useState({ ativo: 0, inativo: 0 })

  const {
    clientData,
    setSlidePanelState,
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    clientRefetch
  } = clients.useUpdate()

  useEffect(() => {
    if (filterVehicles.key === 'ativo') {
      setCategories(vehiclesActives)
      setSelectedCategory(vehiclesActives[tabGroupIndex[filterVehicles.key]])
      return
    }
    setCategories(vehiclesInactives)
    setSelectedCategory(vehiclesInactives[tabGroupIndex[filterVehicles.key]])
  }, [filterVehicles])

  return (
    <Tab.Group
      selectedIndex={tabGroupIndex[filterVehicles.key]}
      onChange={(item) => {
        setTabGroupIndex({
          ...tabGroupIndex,
          [filterVehicles.key]: item
        })

        setSelectedCategory(categories[item])
      }}
    >
      <div className={`flex w-full items-center justify-between`}>
        <div className="flex flex-1">
          <Tab.List className="flex p-2 space-x-2 rounded-lg">
            <clients.RenderTabsList
              categories={categories}
              format={utils.licensePlateFormat}
            />
          </Tab.List>
          <common.buttons.SecondaryButton
            title={'Adicionar veículo'}
            handler={() =>
              setSlidePanelState({
                open: true,
                type: 'proposal'
              })
            }
          />
        </div>
        {clientData.VeiculosAtivos.filter(
          (activeVehicle) => activeVehicle.Situacao_Id === 'ativo'
        ).length > 0 && (
          <div className="flex items-center justify-center flex-1 space-x-2">
            <common.buttons.PrimaryButton
              title={'Nova proposta'}
              onClick={() => createVehicleProposal()}
            />
            <common.buttons.GoBackButton
              title={'Transferir Benefícios'}
              onClick={async () => {
                setSlidePanelState({
                  open: true,
                  type: 'vehicle'
                })
              }}
            />
            <common.Dropdown
              title={'Titularidade'}
              handler={() => null}
              titleClassName={`px-3 py-2 my-2 text-white rounded-md bg-gray-500 bg-opacity-70 hover:bg-gray-500 hover:opacity-100 disabled:cursor-not-allowed disabled:bg-gray-400 transition`}
              noChevronDownIcon
              items={[
                {
                  title: 'Mudar titularidade do veiculo',
                  action: () => {
                    setSlidePanelState({
                      open: true,
                      type: 'ownershipSingle'
                    })
                  }
                },
                {
                  title: 'Mudar titularidade em lote',
                  action: () => {
                    setSlidePanelState({
                      open: true,
                      type: 'ownership'
                    })
                  }
                }
              ]}
            />
          </div>
        )}
        <div className="flex items-center justify-end flex-1 space-x-2">
          <div className="w-[40%]">
            <common.form.Select
              noSearch
              label={'Exibir veículos'}
              onChange={(e) => {
                if (e.key !== filterVehicles.key) {
                  setFilterVehicles(e)
                }
              }}
              itens={itensFromSelect}
              value={filterVehicles}
            />
          </div>
          <div>
            <common.buttons.CancelButton
              title={'Desinstalar'}
              onClick={async () => {
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
              }}
            />
          </div>
        </div>
      </div>
      {categories.length > 0 ? (
        <Tab.Panels className="mt-2 ">
          <clients.RenderPanelsList categories={categories} />
        </Tab.Panels>
      ) : (
        <div className="flex items-center justify-center w-full mt-2 mt-15">
          <span>Não exite veículo {filterVehicles.key}</span>
        </div>
      )}
    </Tab.Group>
  )
}
