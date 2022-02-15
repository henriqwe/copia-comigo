import { Dispatch, SetStateAction } from 'react'
import { coordsToCenterMap, vehicleType } from './MonitoringPanel'
import { showError } from '@comigo/utils'
import * as common from '@comigo/ui-common'
import {
  ChevronLeftIcon,
  LocationMarkerIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon
} from '@heroicons/react/outline'

type PathPanelProps = {
  setInputSearchValue: Dispatch<SetStateAction<string>>
  setPageCard: Dispatch<SetStateAction<string>>
  selectedVehicle: vehicleType | undefined
  consultVehicleHistoric: (
    carro_id: string,
    inicio: string,
    fim: string
  ) => void
  vehicleConsultData: vehicleType[]
  getStreetNameByLatLng: (lat: string, lng: string) => Promise<any>
  dadosEnd: string
  showBounceMarker: Dispatch<SetStateAction<coordsToCenterMap>>
  moreDetails: boolean
  setMoreDetails: Dispatch<SetStateAction<boolean>>
  showAllVehiclesInMap: () => void
  dateStart: string
  setDateStart: Dispatch<SetStateAction<string>>
  dateEnd: string
  setDateEnd: Dispatch<SetStateAction<string>>
  refsPathVehicle: React.MutableRefObject<any[]>
}

export function PathPanel({
  setInputSearchValue,
  setPageCard,
  selectedVehicle,
  consultVehicleHistoric,
  vehicleConsultData,
  getStreetNameByLatLng,
  dadosEnd,
  showBounceMarker,
  moreDetails,
  setMoreDetails,
  showAllVehiclesInMap,
  dateStart,
  setDateStart,
  dateEnd,
  setDateEnd,
  refsPathVehicle
}: PathPanelProps) {
  const onSubmit = (formData: {
    target: { dateStart: { value: string }; dateEnd: { value: string } }
  }) => {
    event?.preventDefault()
    try {
      refsPathVehicle.current = []
      consultVehicleHistoric(
        selectedVehicle!.carro_id!.toString(),
        formData.target.dateStart.value,
        formData.target.dateEnd.value
      )
    } catch (err: any) {
      showError(err)
    }
  }
  function filterConsult(item: string) {
    let result: vehicleType[]
    switch (item) {
      case 'Visualizar todos':
        // setVehicleConsultDataFiltered(vehicleConsultData)
        break
      case 'Eventos de velocidade':
        result = vehicleConsultData?.filter((vehicle) => {
          if (Number(vehicle.speed) > 80) {
            return vehicle
          }
        })
        // setVehicleConsultDataFiltered(result)
        break
      case 'Ignição ligada e parado':
        result = vehicleConsultData?.filter((vehicle) => {
          if (Number(vehicle.speed) < 1 && vehicle.ligado === 1) {
            return vehicle
          }
        })
        // setVehicleConsultDataFiltered(result)

        break
    }
  }

  return (
    <>
      <div className="h-48 w-full bg-gray-100">
        <button
          onClick={() => {
            setPageCard('pagVehiclesDetails')
            showAllVehiclesInMap()
          }}
          className="flex items-center justify-center "
        >
          <ChevronLeftIcon
            className="w-5 h-5 text-black hover:text-gray-900"
            aria-hidden="true"
          />{' '}
          Voltar
        </button>
      </div>
      <div className="flex-1 px-3 py-2 overflow-y-scroll">
        <div>
          {/* <div className="flex justify-between">
                <button
                  onClick={() => {
                    setMoreDetails(false)
                  }}
                  className="flex items-center justify-center px-2 text-gray-200 bg-gray-700 rounded-sm "
                >
                  <MinusIcon
                    className="w-3 h-3 mr-2 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
                  />
                  {'  '}
                  <span className="text-xs"> Exibir menos</span>
                </button>
                <common.Dropdown
                  title={'Filtro'}
                  handler={filterConsult}
                  items={[
                    'Visualizar todos',
                    'Eventos de velocidade',
                    'Ignição ligada e parado'
                  ]}
                />
              </div> */}
          {vehicleConsultData?.length !== 0 ? (
            <div className="relative mt-2 before:block before:absolute before:w-px before:h-[100%] before:ml-1.5  before:mt-16  before:-pb-16 before:border-x-2 before:border-gray-300 before:border-dashed ">
              {vehicleConsultData?.map((vehicle, index) => {
                return (
                  <div
                    key={index}
                    ref={(elem) => {
                      const ref_index = refsPathVehicle?.current.findIndex(
                        (ref) => {
                          if (ref?.index === index) return ref
                        }
                      )
                      if (ref_index !== -1) {
                        refsPathVehicle.current[ref_index] = {
                          elem: elem,
                          index
                        }
                        return
                      }
                      refsPathVehicle.current.push({ elem: elem, index })
                    }}
                  >
                    <common.VehicleCard
                      key={index}
                      vehicle={vehicle}
                      description={
                        <div>
                          <p>Situação: {vehicle.speed}</p>
                        </div>
                      }
                      showBounceMarker={showBounceMarker}
                      getStreetNameByLatLng={getStreetNameByLatLng}
                    />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex justify-center w-full mt-4">
              <common.EmptyContent />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
