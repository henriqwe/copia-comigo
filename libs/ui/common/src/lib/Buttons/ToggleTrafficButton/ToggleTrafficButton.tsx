import { MapIcon } from "@heroicons/react/solid"
import { useState } from "react"

export function ToggleTrafficButton({trafficLayer,mapa}:{trafficLayer: google.maps.TrafficLayer,mapa: google.maps.Map}){

    const [active, setActive] = useState(false)

    function toogleTrafficLayer(){
        if(trafficLayer.getMap()===null){
          trafficLayer.setMap(mapa)
          setActive(true)
          return
        }
        setActive(false)
        trafficLayer.setMap(null)
      }
    return(
      <button onClick={()=>toogleTrafficLayer()}  className={`${active ? 'bg-gray-700' : 'bg-white' } rounded-sm p-2 drop-shadow-2xl`} >
            <MapIcon className={`${active ? 'text-white' : 'text-gray-700' } w-6 h-6 `}/>
      </button>
    )
  }