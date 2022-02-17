import {
  BellIcon,
  ClockIcon,
  ExclamationIcon,
  InformationCircleIcon,
  LocationMarkerIcon,
  MapIcon
} from '@heroicons/react/outline'

type labelType = {
  horaInicio: string
  endInicio: string
  endInicioInfo: string
  horaFim: string
  endFim: string
  endFimInfo: string
  duracao: string
  distanciaPercorrida: string
  qntEventos: string
  consumo: string
  velMedia: string
  maiorVel: string
}

export function CardTrip({ label }: { label: labelType }) {
  return (
    <div className="bg-gray-100 p-3 rounded-md mb-4">
      <div className={`relative`}>
        <div className="z-10 m-2 absolute w-[95%] h-px block mt-1.5 border-y-2 border-gray-300 border-dashed" />
        <div className=" relative flex justify-between z-50">
          <div
            className={`w-4 h-4 rounded-full border-2 border-gray-200 bg-blue-700`}
            title={'Inicio da viagem'}
          />
          <div
            className={`w-4 h-4 rounded-full border-2 border-gray-200 bg-red-700`}
            title={'Fim da viagem'}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="font-medium text-tiny">{label.horaInicio}</span>
          <span className="text-gray-700 text-super-tiny">
            {label.endInicio}
          </span>
          <span className="text-gray-700 text-super-tiny">
            {label.endInicioInfo}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium flex justify-end text-tiny">
            {label.horaFim}
          </span>
          <span className="text-gray-700 flex justify-end text-super-tiny">
            {label.endFim}
          </span>
          <span className="text-gray-700 flex justify-end text-super-tiny">
            {label.endFimInfo}
          </span>
        </div>
      </div>
      <Grid label={label} />
    </div>
  )
}
function Grid({ label }: { label: labelType }) {
  const icons = [
    {
      title: 'duracao',
      description: 'Duração da viagem',
      icon: <ClockIcon className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'qntEventos',
      description: 'Quantidade de eventos',
      icon: <BellIcon className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'velMedia',
      description: 'Velocidade Média',
      icon: <LocationMarkerIcon className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'distanciaPercorrida',
      description: 'Distância percorrida',
      icon: <MapIcon className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'consumo',
      description: 'Consumo de combustivel',
      icon: <InformationCircleIcon className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'maiorVel',
      description: 'Maior velocidade',
      icon: <ExclamationIcon className="w-5 h-5 text-blue-400" />
    }
  ]
  return (
    <div className="grid grid-cols-3 mt-2 gap-2">
      {icons.map(({ icon, title, description }, idx) => {
        return (
          <div
            className="col-span-1 flex items-center"
            title={description}
            key={idx}
          >
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center mr-1">
              {icon}
            </div>
            <span className="text-super-tiny text-gray-700">
              {label[title]}
            </span>
          </div>
        )
      })}
    </div>
  )
}
