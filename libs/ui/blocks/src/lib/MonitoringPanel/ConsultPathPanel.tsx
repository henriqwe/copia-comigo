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

type ConsultPathPanelProps = {
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

export function ConsultPathPanel({
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
}: ConsultPathPanelProps) {
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
      setPageCard('pagPathPanel')
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
      <div className="">
        <div className="flex justify-between px-3 py-2 bg-gray-100">
          <div className="flex justify-center">
            <common.TitleWithSubTitleAtTheTop
              title={selectedVehicle!.placa!}
              subtitle="Placa"
              classSubtitle="text-xs"
              classTitle="!text-xl"
            />
          </div>
          <div className="flex items-center">
            <common.TitleWithSubTitleAtTheTop
              title={`${new Date(
                selectedVehicle?.date_rastreador || 0
              ).toLocaleDateString('pt-br')} 
                    ${new Date(
                      selectedVehicle?.date_rastreador || 0
                    ).toLocaleTimeString('pt-br')}`}
              subtitle="Última atualização"
              classTitle="!text-sm my-1"
              classSubtitle="text-xs flex justify-end"
            />
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-1 bg-gray-100">
          <div className="w-full">
            <div className="grid w-full grid-flow-col gap-2 ">
              <form
                onSubmit={(e) => {
                  onSubmit(e)
                  setMoreDetails(true)
                }}
                className="grid grid-cols-12"
              >
                <div className="flex col-span-12 ">
                  <p className="flex items-center mr-2 text-sm ">De:</p>
                  <input
                    type="datetime-local"
                    name="dateStart"
                    className="w-full col-span-10 p-2 text-sm bg-gray-200 rounded-md dark:bg-gray-700"
                    value={dateStart}
                    max={dateEnd}
                    onChange={(e) => setDateStart(e.target.value)}
                  />
                </div>

                <div className="flex col-span-12 my-1">
                  <p className="flex items-center justify-end pr-1 text-sm">
                    Até:
                  </p>
                  <input
                    type="datetime-local"
                    name="dateEnd"
                    className="w-full col-span-10 p-2 text-sm bg-gray-200 rounded-md dark:bg-gray-700"
                    value={dateEnd}
                    max={dateEnd}
                    onChange={(e) => setDateEnd(e.target.value)}
                  />
                </div>

                <div className="flex justify-between col-span-12 my-2">
                  <button
                    onClick={() => {
                      setPageCard('pagAllVehicles')
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
                  <button
                    type="submit"
                    className="flex items-center justify-center col-span-3 px-2 py-1 text-gray-200 bg-gray-700 rounded-sm"
                    // disabled={pathsLoading}
                    // loading={pathsLoading}
                  >
                    {' '}
                    <SearchIcon className="w-5 h-5 text-gray-200" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 px-3 py-2 overflow-y-scroll">
        <div className="w-full mt-2">
          <span>teste</span>
          {/* <div className="relative mt-1 report-timeline">
                <common.ListCard
                  icon={<LocationMarkerIcon className="w-6 h-6" />}
                  title={'Velocidade'}
                  description={
                    <p>{Number(selectedVehicle?.speed).toFixed() + ' Km/H'}</p>
                  }
                />
                <common.ListCard
                  icon={<ClockIcon className="w-6 h-6" />}
                  title={'Ignição'}
                  description={
                    <div>
                      <p>{selectedVehicle?.ligado ? 'Ligado' : 'Desligado'}</p>
                    </div>
                  }
                />
                <common.ListCard
                  icon={<MapIcon className="w-6 h-6" />}
                  title={'Endereço'}
                  description={
                    dadosEnd ? <span>{dadosEnd}</span> : <span>Buscando...</span>
                  }
                />
              </div> */}
        </div>
      </div>
    </>
  )
}
