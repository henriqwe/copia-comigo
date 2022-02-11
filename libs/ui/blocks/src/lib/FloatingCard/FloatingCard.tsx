/* eslint-disable-next-line */
import {
  ChevronLeftIcon,
  ClockIcon,
  ExclamationIcon,
  LocationMarkerIcon,
  MapIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  TruckIcon,
  UserIcon
} from '@heroicons/react/outline'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import * as common from '@comigo/ui-common'
import { Transition } from '@headlessui/react'

type coordsToCenterMap = {
  lat?: number
  lng?: number
  carro_id?: number
}
type vehicle = {
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
type pagAllVehiclesProps = {
  inputSearchValue: string
  setInputSearchValue: Dispatch<SetStateAction<string>>
  titleFilter: string
  setTitleFilter: Dispatch<SetStateAction<string>>
  vehiclesInTransit: vehicle[]
  vehiclesStopped: vehicle[]
  vehiclesOff: vehicle[]
  setPageCard: Dispatch<SetStateAction<string>>
  handlerClickOnVehicleMarker: Dispatch<SetStateAction<vehicle | undefined>>
  refsCardVehicle: React.MutableRefObject<any[]>
  shearchVehicle: vehicle[]
  openCardKey: number | undefined
  setOpenCardKey: Dispatch<SetStateAction<number | undefined>>
  getStreetNameToCard(vehicle: vehicle): Promise<{
    addressName: any
    addressInfo: any
  }>
}
type pagVehiclesDetailsProps = {
  setInputSearchValue: Dispatch<SetStateAction<string>>
  setPageCard: Dispatch<SetStateAction<string>>
  selectedVehicle: vehicle | undefined
  consultVehicleHistoric: (
    carro_id: string,
    inicio: string,
    fim: string
  ) => void
  vehicleConsultData: vehicle[]
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
export interface FloatingCardProps {
  allUserVehicle: vehicle[]
  schemaYup: any
  consultVehicleHistoric: (
    carro_id: string,
    inicio: string,
    fim: string
  ) => void
  vehicleConsultData: vehicle[]
  getStreetNameByLatLng: (lat: string, lng: string) => Promise<any>
  selectedVehicle: vehicle | undefined
  handlerClickOnVehicleMarker: Dispatch<SetStateAction<vehicle | undefined>>
  showBounceMarker: Dispatch<SetStateAction<coordsToCenterMap>>
  showAllVehiclesInMap: () => void
  refsCardVehicle: React.MutableRefObject<any[]>
  openCardKey: number | undefined
  setOpenCardKey: Dispatch<SetStateAction<number | undefined>>
  refsPathVehicle: React.MutableRefObject<any[]>
  pageCard: string
  setPageCard: Dispatch<SetStateAction<string>>
}

export function FloatingCard({
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
  setPageCard
}: FloatingCardProps) {
  const [open, setOpen] = useState(true)
  const [titleFilter, setTitleFilter] = useState('Em trânsito')
  const [vehiclesInTransit, setVehiclesInTransit] = useState<vehicle[]>([])
  const [vehiclesStopped, setVehiclesStopped] = useState<vehicle[]>([])
  const [vehiclesOff, setVehiclesOff] = useState<vehicle[]>([])
  const [shearchVehicle, setShearchVehicle] = useState<vehicle[]>([
    ...sortByPlaca(allUserVehicle)
  ])
  const [inputSearchValue, setInputSearchValue] = useState<string | undefined>(
    undefined
  )
  const [dadosEnd, setDadosEnd] = useState('')
  const [moreDetails, setMoreDetails] = useState(false)
  const [dateStart, setDateStart] = useState(currentDateAndTime('onlyDate'))
  const [dateEnd, setDateEnd] = useState(currentDateAndTime(''))

  function currentDateAndTime(type = '') {
    const date = new Date()
    let day: string | number = date.getDate()
    let month: string | number = date.getMonth() + 1
    const year = date.getFullYear()
    if (day < 10) day = '0' + day
    if (month < 10) month = '0' + month

    if (type === 'onlyDate') return year + '-' + month + '-' + day + 'T00:00:00'

    let hour: string | number = date.getHours()
    let minute: string | number = date.getMinutes()
    if (hour < 10) hour = '0' + hour
    if (minute < 10) minute = '0' + minute

    return year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00'
  }

  async function getStreetName(vehicle: vehicle) {
    const response = await getStreetNameByLatLng(
      vehicle.latitude,
      vehicle.longitude
    )

    setDadosEnd(response.results[0].formatted_address)
  }
  async function getStreetNameToCard(vehicle: vehicle) {
    const response = await getStreetNameByLatLng(
      vehicle.latitude,
      vehicle.longitude
    )
    let splitend = response.results[0].formatted_address.split(',')

    let addressName = splitend.splice(0, 2).toString()
    let addressInfo = splitend.splice(0, splitend.length).toString()
    return { addressName, addressInfo }
  }

  function sortByPlaca(allUserVehicle: vehicle[]) {
    return allUserVehicle.sort((a, b) => {
      if ((a.placa || 0) > (b.placa || 0)) {
        return 1
      }
      if ((a.placa || 0) < (b.placa || 0)) {
        return -1
      }
      return 0
    })
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
    const vehiclesInTransitFilter: vehicle[] = []
    const vehiclesStoppedFilter: vehicle[] = []
    const vehiclesOffFilter: vehicle[] = []

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

  useEffect(() => {
    setMoreDetails(false)
  }, [pageCard])

  useEffect(() => {
    if (selectedVehicle) {
      getStreetName(selectedVehicle)
      // setPageCard('pagVehiclesDetails')
      // setMoreDetails(false)
    }
  }, [selectedVehicle])

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
            <MinusIcon className="w-5 h-5 text-gray-100 " />
          ) : (
            <PlusIcon className="w-5 h-5 text-gray-100 " />
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
          ? pagAllVehicles({
              inputSearchValue,
              setInputSearchValue,
              titleFilter,
              setTitleFilter,
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
          ? pagVehiclesDetails({
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
            })
          : ''}
      </Transition>
    </aside>
  )
}

function pagAllVehicles({
  inputSearchValue,
  setInputSearchValue,
  titleFilter,
  setTitleFilter,
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
}: pagAllVehiclesProps) {
  return (
    <>
      <div className="">
        <div className="px-3 py-3 bg-gray-100">
          <div className="rounded-sm ring-1 ring-gray-300">
            <common.form.Input
              fieldName="Veículos"
              title="Pesquise o veiculo aqui"
              onChange={(e) => {
                setInputSearchValue(e.target.value)
              }}
              value={inputSearchValue}
            />
          </div>
        </div>
        {/* <div className="flex items-center justify-between px-3 py-1 bg-gray-100">
              <span className="text-sm text-gray-600" >Ordenar por</span>
              <common.Dropdown
                title={titleFilter}
                titleClassName="text-sm"
                handler={(e)=>{setTitleFilter(e)}}
                items={[
                  'Em trânsito',
                  'Parado',
                  'Desligado'
                ]}
              />
              
            </div> */}
      </div>
      <div className="flex-1 px-3 py-2 overflow-y-scroll">
        <ul>
          {shearchVehicle.length > 0 &&
            shearchVehicle.map((vehicle) => {
              vehicle
              return (
                <li
                  key={vehicle.carro_id}
                  ref={(elem) => {
                    const ref_index = refsCardVehicle?.current.findIndex(
                      (ref) => {
                        if (ref?.carro_id === vehicle.carro_id) return ref
                      }
                    )
                    if (ref_index !== -1) {
                      refsCardVehicle.current[ref_index] = {
                        elem: elem,
                        carro_id: vehicle.carro_id
                      }
                      return
                    }
                    refsCardVehicle.current.push({
                      elem: elem,
                      carro_id: vehicle.carro_id
                    })
                  }}
                  onClick={() => {
                    handlerClickOnVehicleMarker(vehicle)
                    if (vehicle.carro_id !== openCardKey) {
                      setOpenCardKey(vehicle.carro_id)
                      return
                    }
                    setOpenCardKey(undefined)
                  }}
                >
                  <common.CardVehicle
                    setPageCard={setPageCard}
                    handlerClickOnVehicleMarker={handlerClickOnVehicleMarker}
                    vehicle={vehicle}
                    open={vehicle.carro_id === openCardKey}
                    getStreetNameToCard={getStreetNameToCard}
                  />
                </li>
              )
            })}
        </ul>
        {vehiclesOff.length === 0 &&
          vehiclesStopped.length === 0 &&
          vehiclesInTransit.length === 0 && (
            <div className="flex justify-center w-full mt-4">
              <common.EmptyContent />
            </div>
          )}
      </div>
    </>
  )
}

function pagVehiclesDetails({
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
}: pagVehiclesDetailsProps) {
  const onSubmit = (formData: {
    target: { dateStart: { value: string }; dateEnd: { value: string } }
  }) => {
    event?.preventDefault()
    try {
      refsPathVehicle.current = []
      consultVehicleHistoric(
        selectedVehicle.carro_id.toString(),
        formData.target.dateStart.value,
        formData.target.dateEnd.value
      )
    } catch (err: any) {
      // showError(err)
      console.log(err)
    }
  }
  function filterConsult(item: string) {
    let result: vehicle[]
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
              title={selectedVehicle?.placa!}
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
        {!moreDetails ? (
          <div className="w-full mt-2">
            <div className="relative mt-1 report-timeline">
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
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between">
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
            </div>
            {vehicleConsultData?.length !== 0 ? (
              <div className="relative mt-5 report-timeline">
                <ul>
                  {vehicleConsultData?.map((vehicle, index) => {
                    return (
                      <li
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
                      </li>
                    )
                  })}
                </ul>
              </div>
            ) : (
              <div className="flex justify-center w-full mt-4">
                <common.EmptyContent />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default FloatingCard
