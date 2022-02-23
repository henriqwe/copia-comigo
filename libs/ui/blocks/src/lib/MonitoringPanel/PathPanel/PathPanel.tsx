import { Dispatch, SetStateAction } from 'react'
import { Icon } from '@iconify/react'
import { coordsToCenterMap, vehicleType } from '../MonitoringPanel'
import * as common from '@comigo/ui-common'

type PathPanelProps = {
  setPageCard: Dispatch<SetStateAction<string>>
  selectedVehicle: vehicleType | undefined
  vehicleConsultData: vehicleType[]
  getStreetNameByLatLng: (lat: string, lng: string) => Promise<any>
  showBounceMarker: Dispatch<SetStateAction<coordsToCenterMap>>
  refsPathVehicle: React.MutableRefObject<any[]>
  setPositionStreetView: (
    lat: number,
    lng: number,
    rotation: number,
    panorama: any
  ) => void
  panorama: google.maps.StreetViewPanorama
  setVehicleConsultData: Dispatch<SetStateAction<vehicleType[] | undefined>>
}

export function PathPanel({
  setPageCard,
  selectedVehicle,
  vehicleConsultData,
  getStreetNameByLatLng,
  showBounceMarker,
  refsPathVehicle,
  setPositionStreetView,
  panorama,
  setVehicleConsultData
}: PathPanelProps) {
  const labels = [
    {
      title: 'Dist. total',
      icon: (
        <Icon
          icon="icon-park-outline:connection-point-two"
          className="w-8 h-8 text-blue-400"
        />
      ),
      subTitle: '82 Km'
    },
    {
      title: 'Duração',
      icon: <Icon icon="akar-icons:clock" className="w-8 h-8 text-blue-400" />,
      subTitle: '02h37m'
    },
    {
      title: 'Vel. média',
      icon: (
        <Icon
          icon="fluent:top-speed-20-filled"
          className="w-8 h-8 text-blue-400"
        />
      ),
      subTitle: '57km/h'
    },
    {
      title: 'Maior vel.',
      icon: (
        <Icon
          icon="fluent:top-speed-20-filled"
          className="w-8 h-8 text-blue-400"
        />
      ),
      subTitle: '81km/h'
    }
  ]

  const heightDashedLine = `${(vehicleConsultData?.length - 1) * 11}rem`

  return (
    <>
      <div className=" h-48 w-full bg-gray-100 flex flex-col">
        <div className="flex justify-between px-3 py-2 bg-gray-100">
          <div className="flex justify-center">
            <common.TitleWithSubTitleAtTheTop
              title={selectedVehicle!.placa!}
              subtitle="Placa"
              classSubtitle="text-xs"
              classTitle="!text-xl"
            />
          </div>
          <div className="flex">
            <common.TitleWithSubTitleAtTheTop
              title={`${new Date(
                selectedVehicle?.date_rastreador || 0
              ).toLocaleDateString('pt-br', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}`}
              subtitle="Dados da viagem"
              classTitle="!text-xs my-1"
              classSubtitle="text-xs flex justify-end"
            />
          </div>
        </div>
        <div className="flex justify-evenly h-[5.75rem]">
          {labels.map((label, idx) => {
            return (
              <div className="flex flex-col justify-center" key={idx}>
                <div className="flex justify-center mb-1">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex justify-center items-center">
                    {label.icon}
                  </div>
                </div>
                <span className="text-sm flex justify-center">
                  {label.subTitle}
                </span>
                <span className="text-xs text-gray-500 flex justify-center">
                  {label.title}
                </span>
              </div>
            )
          })}
        </div>
        <div className="h-[1.75rem] flex items-center my-1 px-3">
          <button
            onClick={() => {
              setPageCard('pagVehiclesDetails')
              setVehicleConsultData([])
            }}
            className="flex items-center justify-center"
          >
            <Icon
              icon="akar-icons:chevron-left"
              className="w-4 h-4 text-black hover:text-gray-900"
            />
            <span className="text-xs hover:underline">Voltar</span>
          </button>
        </div>
      </div>
      <div className="flex-1 px-3 py-2 overflow-y-scroll">
        <div>
          {vehicleConsultData?.length !== 0 ? (
            <div className={`relative mt-2`}>
              <div
                className="absolute w-px ml-[2.84rem] block mt-20 border-x-2 border-gray-300 border-dashed"
                style={{ height: heightDashedLine }}
              />
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
                      setPositionStreetView={setPositionStreetView}
                      panorama={panorama}
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
