import {
  LocationMarkerIcon,
  MinusIcon,
  PlusIcon
} from '@heroicons/react/outline'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { currentDateAndTime, sortByPlaca } from './functions'
import { AllVehiclesPanel } from './AllVehiclesPanel/AllVehiclesPanel'
import { ConsultPathPanel } from './ConsultPathPanel/ConsultPathPanel'
import { PathPanel } from './PathPanel/PathPanel'
export type coordsToCenterMap = {
  lat?: number
  lng?: number
  carro_id?: number
}
export type vehicleType = {
  crs: string
  data: string
  dist: string
  latitude: string
  ligado: number
  longitude: string
  speed: string
  carro_id?: number
  placa?: string
  chassis?: string
  renavan?: string
  ano_modelo?: string
  cor?: string
  veiculo?: string
  carro_fabricante?: string
  carro_categoria?: string
  carro_tipo?: string
  combustivel?: string
  ano?: string
  frota?: string
  imei?: string
  date_rastreador?: string
}

export interface FloatingCardProps {
  allUserVehicle: vehicleType[]
  schemaYup: any
  consultVehicleHistoric: (
    carro_id: string,
    inicio: string,
    fim: string
  ) => void
  vehicleConsultData: vehicleType[]
  getStreetNameByLatLng: (lat: string, lng: string) => Promise<any>
  selectedVehicle: vehicleType | undefined
  handlerClickOnVehicleMarker: Dispatch<SetStateAction<vehicleType | undefined>>
  showBounceMarker: Dispatch<SetStateAction<coordsToCenterMap>>
  showAllVehiclesInMap: () => void
  refsCardVehicle: React.MutableRefObject<any[]>
  openCardKey: number | undefined
  setOpenCardKey: Dispatch<SetStateAction<number | undefined>>
  refsPathVehicle: React.MutableRefObject<any[]>
  pageCard: string
  setPageCard: Dispatch<SetStateAction<string>>
  setPositionStreetView: (
    lat: number,
    lng: number,
    rotation: number,
    panorama: any
  ) => void
  panorama: google.maps.StreetViewPanorama
}

export function MonitoringPanel({
  allUserVehicle,
  schemaYup,
  consultVehicleHistoric,
  vehicleConsultData,
  getStreetNameByLatLng,
  selectedVehicle,
  handlerClickOnVehicleMarker,
  showBounceMarker,
  showAllVehiclesInMap,
  refsCardVehicle,
  openCardKey,
  setOpenCardKey,
  refsPathVehicle,
  pageCard,
  setPageCard,
  setPositionStreetView,
  panorama
}: FloatingCardProps) {
  const [open, setOpen] = useState(true)
  const [vehiclesInTransit, setVehiclesInTransit] = useState<vehicleType[]>([])
  const [vehiclesStopped, setVehiclesStopped] = useState<vehicleType[]>([])
  const [vehiclesOff, setVehiclesOff] = useState<vehicleType[]>([])
  const [shearchVehicle, setShearchVehicle] = useState<vehicleType[]>([
    ...sortByPlaca(allUserVehicle)
  ])
  const [inputSearchValue, setInputSearchValue] = useState<string | undefined>(
    undefined
  )
  const [dateStart, setDateStart] = useState(currentDateAndTime('onlyDate'))
  const [dateEnd, setDateEnd] = useState(currentDateAndTime(''))

  async function getStreetNameToCard(vehicle: vehicleType) {
    const response = await getStreetNameByLatLng(
      vehicle.latitude,
      vehicle.longitude
    )
    const addressComplete = response.results[0].formatted_address
    let splitend = addressComplete.split(',')
    let addressName = splitend.splice(0, 2).toString()
    let addressInfo = splitend.splice(0, splitend.length).toString()
    return { addressInfo, addressName, addressComplete }
  }

  function filterVehicles() {
    if (inputSearchValue === '' || inputSearchValue === undefined) {
      setShearchVehicle([...sortByPlaca(allUserVehicle)])
      return
    }
    const filter = sortByPlaca(allUserVehicle).filter((vehicle) => {
      if (
        vehicle.placa?.toUpperCase().includes(inputSearchValue?.toUpperCase())
      ) {
        return vehicle
      }
      return
    })
    setShearchVehicle(filter)
  }

  useEffect(() => {
    refsCardVehicle.current.length = 0

    setShearchVehicle([...sortByPlaca(allUserVehicle)])
    if (inputSearchValue != '') {
      filterVehicles()
    }
  }, [allUserVehicle])

  useEffect(() => {
    const vehiclesInTransitFilter: vehicleType[] = []
    const vehiclesStoppedFilter: vehicleType[] = []
    const vehiclesOffFilter: vehicleType[] = []

    shearchVehicle.forEach((vehicle) => {
      if (vehicle.ligado === 1 && Number(vehicle.speed) >= 1) {
        vehiclesInTransitFilter.push(vehicle)
      } else if (vehicle.ligado === 1 && Number(vehicle.speed) < 1) {
        vehiclesStoppedFilter.push(vehicle)
      } else if (vehicle.ligado === 0) {
        vehiclesOffFilter.push(vehicle)
      }
    })
    setVehiclesInTransit(vehiclesInTransitFilter)
    setVehiclesStopped(vehiclesStoppedFilter)
    setVehiclesOff(vehiclesOffFilter)
  }, [shearchVehicle])

  useEffect(() => {
    filterVehicles()
  }, [inputSearchValue])

  return (
    <aside
      className={`flex flex-col w-full ${
        open ? 'h-full' : 'h-10'
      } bg-white rounded-sm pb-10`}
    >
      <div
        className={`flex bg-gray-900 h-10 w-full p-4 items-center  ${
          open ? 'rounded-t-sm' : 'rounded-sm'
        }  text-gray-100 justify-between`}
      >
        <LocationMarkerIcon className="w-5 h-5 text-gray-100 " />
        <div>
          <span className="text-sm ">Veículos</span>
          <span className="px-2 ml-2 text-sm bg-gray-800 rounded-full">
            {allUserVehicle ? allUserVehicle.length : 0}
          </span>
        </div>
        <button
          onClick={() => {
            setOpen(!open)
          }}
        >
          {open ? (
            <div title={'Minimizar'}>
              <MinusIcon className="w-5 h-5 text-gray-100 " />
            </div>
          ) : (
            <div title={'Maximizar'}>
              <PlusIcon className="w-5 h-5 text-gray-100 " />
            </div>
          )}
        </button>
      </div>

      <Transition
        show={open}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className={`flex flex-col w-full ${
          open ? 'h-full' : 'h-10'
        } bg-white rounded-sm`}
      >
        {pageCard === 'pagAllVehicles'
          ? AllVehiclesPanel({
              inputSearchValue,
              setInputSearchValue,
              vehiclesInTransit,
              vehiclesStopped,
              vehiclesOff,
              setPageCard,
              handlerClickOnVehicleMarker,
              refsCardVehicle,
              shearchVehicle,
              openCardKey,
              setOpenCardKey,
              getStreetNameToCard
            })
          : pageCard === 'pagVehiclesDetails'
          ? ConsultPathPanel({
              setPageCard,
              selectedVehicle,
              consultVehicleHistoric,
              dateStart,
              setDateStart,
              dateEnd,
              setDateEnd,
              refsPathVehicle
            })
          : pageCard === 'pagPathPanel'
          ? PathPanel({
              setPageCard,
              selectedVehicle,
              vehicleConsultData,
              getStreetNameByLatLng,
              showBounceMarker,
              showAllVehiclesInMap,
              refsPathVehicle,
              setPositionStreetView,
              panorama
            })
          : ''}
      </Transition>
    </aside>
  )
}

export default MonitoringPanel
