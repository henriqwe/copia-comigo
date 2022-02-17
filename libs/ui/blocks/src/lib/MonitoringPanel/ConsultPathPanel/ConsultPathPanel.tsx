import { Dispatch, SetStateAction } from 'react'

import * as common from '@comigo/ui-common'

import { showError } from '@comigo/utils'
import { ChevronLeftIcon, SearchIcon } from '@heroicons/react/outline'
import { vehicleType } from '../MonitoringPanel'
import { CardTrip } from './CardTrip'

type ConsultPathPanelProps = {
  setPageCard: Dispatch<SetStateAction<string>>
  selectedVehicle: vehicleType | undefined
  consultVehicleHistoric: (
    carro_id: string,
    inicio: string,
    fim: string
  ) => void
  setMoreDetails: Dispatch<SetStateAction<boolean>>
  showAllVehiclesInMap: () => void
  dateStart: string
  setDateStart: Dispatch<SetStateAction<string>>
  dateEnd: string
  setDateEnd: Dispatch<SetStateAction<string>>
  refsPathVehicle: React.MutableRefObject<any[]>
}

export function ConsultPathPanel({
  setPageCard,
  selectedVehicle,
  consultVehicleHistoric,
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
  const labels = [
    {
      horaInicio: '12:37',
      endInicio: 'R. São Caetano, 175',
      endInicioInfo: 'Benedito, Maceió - AL',
      horaFim: '14:15',
      endFim: 'Av. Comendador Gustavo Paiva, 5945',
      endFimInfo: 'Cruz das Almas, Maceió - AL',
      duracao: '01:38:17',
      distanciaPercorrida: '33,51 km',
      qntEventos: '3 eventos',
      consumo: '3,7 L',
      velMedia: '57 km/h',
      maiorVel: '82 km/h'
    },
    {
      horaInicio: '16:02',
      endInicio: 'Av. Comendador Gustavo Paiva, 5945 ',
      endInicioInfo: 'Cruz das Almas, Maceió - AL ',
      horaFim: '17:54',
      endFim: 'R. São Caetano, 175',
      endFimInfo: 'Benedito, Maceió - AL',
      duracao: '01:02:47',
      distanciaPercorrida: '33,51 km',
      qntEventos: '1 evento',
      consumo: '3,7 L',
      velMedia: '53 km/h',
      maiorVel: '74 km/h'
    }
  ]
  return (
    <>
      <div className="h-48 ">
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
              ).toLocaleDateString('pt-br')} 
                    ${new Date(
                      selectedVehicle?.date_rastreador || 0
                    ).toLocaleTimeString('pt-br')}`}
              subtitle="Última atualização"
              classTitle="!text-xs my-1"
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
                    }}
                    className="flex items-center justify-center "
                  >
                    <ChevronLeftIcon
                      className="w-4 h-4 text-black hover:text-gray-900"
                      aria-hidden="true"
                    />{' '}
                    <span className="text-xs hover:underline">Voltar</span>
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
          {labels.map((label, idx) => {
            return (
              <div key={idx}>
                <CardTrip label={label} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
