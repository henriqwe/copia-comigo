import * as common from '@comigo/ui-common'
import { LocationMarkerIcon, MapIcon, TruckIcon, UserIcon } from '@heroicons/react/outline';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type vehicle={
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
/* eslint-disable-next-line */
export interface CardVehicleProps {
  className?: string
  setPageCard: Dispatch<SetStateAction<string>>
  vehicle: vehicle
  open: boolean
  setSelectedVehicle: Dispatch<SetStateAction<vehicle | undefined>>
  getStreetNameToCard(vehicle: vehicle): Promise<{
    addressName: any;
    addressInfo: any;
}>
}

export function CardVehicle({className,setPageCard,vehicle,open = false,setSelectedVehicle,getStreetNameToCard}: CardVehicleProps) {
  
  let statsColor:string
  let velocityColor:string
  const [addressName, setAddressName] = useState('Carregando...')
  const [addressInfo, setAddressInfo] = useState('')



  if(vehicle.ligado ===1 && Math.floor(Number(vehicle.speed)) >=1){
    statsColor = 'bg-green-500'
  }else if(vehicle.ligado ===1 && Math.floor(Number(vehicle.speed)) === 0){
    statsColor = 'bg-blue-500'
  }else{
    statsColor = 'bg-gray-500'
  }

  if(Math.floor(Number(vehicle.speed)) === 0){
    velocityColor = 'gray'
  }else if(Math.floor(Number(vehicle.speed)) >= 80){
    velocityColor = 'red'
  }else{
    velocityColor = 'blue'
  }
  useEffect(() => {
    if(open){
       getStreetNameToCard(vehicle).then((reponse)=>{
         console.log(reponse.addressName)
         console.log(reponse.addressInfo)

        setAddressInfo(reponse.addressInfo)
        setAddressName(reponse.addressName)
      })
     
    }
  },[open])
  return (
    <common.Card  className={`hover:bg-gray-200 !bg-gray-100 my-2 p-2 pr-4 text-gray-600 cursor-pointer ${className}`}>
      <div>
        <div className="flex" >
          <div className=" flex items-center justify-center mr-1 relative">
            <span className={`w-3 h-3 ${statsColor} rounded-full absolute -ml-11`}/>
            <TruckIcon className="w-7 h-7 " />
          </div>
          <div className='flex justify-between w-full'>
            <div className=" flex items-start justify-self-center flex-col">
              <span className="text-xs">Placa</span>
              <span className="font-medium text-gray-900">{vehicle.placa}</span>
            </div>
          </div>
        </div>
        {open && <div className="">
        <common.Separator className=""/>

          <div className="flex justify-between">
            <div className="flex justify-self-center items-center">
              <LocationMarkerIcon className="w-4 h-4 mx-2" />
              <span className="text-xs" >{addressName}<br />{addressInfo}</span>
            </div>
            <div className="flex !items-center !justify-center">
              <div className={`flex justify-center w-20 text-xs border-solid border-2 text-${velocityColor}-500 border-${velocityColor}-200 px-2 py-1 rounded-md bg-${velocityColor}-100 font-semibold`}> 
              <span>
                {Math.floor(Number(vehicle.speed))} 
                </span> {' '}
                <span>
                km/h
                </span>
                </div>
            </div>
          </div>
          <div className='flex justify-end mt-4'>
            <button className="col-span-3 justify-center items-center flex bg-gray-700 rounded-sm text-gray-100 px-2 py-1 hover:bg-gray-600" onClick={()=>
                {
                  setPageCard('pagVehiclesDetails')
                  setSelectedVehicle(vehicle)
                }
            } >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        </div>}
      </div>
    </common.Card>
  );
}

export default CardVehicle;
