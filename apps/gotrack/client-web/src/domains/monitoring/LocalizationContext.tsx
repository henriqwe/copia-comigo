import { createContext, ReactNode, useContext, useState } from 'react'
import * as yup from 'yup'
import { vehicleType, centerMapInVehicle } from './api/vehicle'
import { useMap, useVehicle } from '.'

type LocalizationContextProps = {
  localizationsLoading: boolean
  localizationsRefetch: () => void
  localizationSchema: any
  openCardKey: number
  setOpenCardKey: React.Dispatch<React.SetStateAction<number>>
  pageCard: string
  setPageCard: React.Dispatch<React.SetStateAction<string>>
  handlerClickOnVehicleMarker: (vehicle: vehicleType) => void
  handleClickScrollToCard: (carro_id: string) => void
}

type ProviderProps = {
  children: ReactNode
}

export const LocalizationContext = createContext<LocalizationContextProps>(
  {} as LocalizationContextProps
)

export const LocalizationProvider = ({ children }: ProviderProps) => {
  const { mapa, panorama } = useMap()

  const { setSelectedVehicle, refsCardVehicle } = useVehicle()

  const [localizationsLoading, setLocalizationsLoading] = useState(false)
  const localizationSchema = yup.object().shape({
    carro_id: yup.string()
  })
  const [openCardKey, setOpenCardKey] = useState<number>()
  const [pageCard, setPageCard] = useState('pagAllVehicles')

  async function localizationsRefetch() {
    return
  }

  function handlerClickOnVehicleMarker(vehicle: vehicleType) {
    setSelectedVehicle(vehicle)
    panorama.setVisible(false)
    centerMapInVehicle(
      {
        lat: Number(vehicle.latitude),
        lng: Number(vehicle.longitude),
        carro_id: vehicle.carro_id
      },
      mapa
    )
  }

  function handleClickScrollToCard(carro_id: string) {
    setOpenCardKey(Number(carro_id))
    const index = refsCardVehicle.current.findIndex((elem) => {
      if (elem.carro_id === carro_id) {
        return elem
      }
    })
    if (index !== -1) {
      refsCardVehicle?.current[index]['elem']?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      refsCardVehicle?.current[index]['elem']?.firstChild.classList.add(
        'border-2',
        'border-yellow-500'
      )
      setTimeout(() => {
        refsCardVehicle?.current[index]['elem']?.firstChild.classList.remove(
          'border-2',
          'border-yellow-500'
        )
      }, 3000)
    }
  }

  return (
    <LocalizationContext.Provider
      value={{
        localizationsRefetch,
        localizationSchema,
        localizationsLoading,
        openCardKey,
        setOpenCardKey,
        pageCard,
        setPageCard,
        handlerClickOnVehicleMarker,
        handleClickScrollToCard
      }}
    >
      {children}
    </LocalizationContext.Provider>
  )
}

export const useLocalization = () => {
  return useContext(LocalizationContext)
}
