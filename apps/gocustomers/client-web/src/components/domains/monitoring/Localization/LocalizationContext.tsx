import React, { useRef } from 'react';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as yup from 'yup';
import { getAllUserVehicles, getVehicleHistoric } from './api/index';

type vehicle = {
  crs: string;
  data: string;
  dist: string;
  latitude: string;
  ligado: number;
  longitude: string;
  speed: string;
  carro_id?: number;
  placa?: string;
  chassis?: string;
  renavan?: string;
  ano_modelo?: string;
  cor?: string;
  veiculo?: string;
  carro_fabricante?: string;
  carro_categoria?: string;
  carro_tipo?: string;
  combustivel?: string;
  ano?: string;
  frota?: string;
  imei?: string;
  date_rastreador?: string;
};

type coordsToCenterMap = {
  lat?: number;
  lng?: number;
  carro_id?: number;
};
type LocalizationContextProps = {
  setVehicleConsultData?: Dispatch<SetStateAction<vehicle | undefined>>;
  vehicleConsultData?: vehicle;
  setAllUserVehicle: Dispatch<React.SetStateAction<vehicle[]>>;
  allUserVehicle?: vehicle[];
  coordsToCenterMap?: coordsToCenterMap;
  vehicleLocationInfo?: vehicle;
  setVehicleLocationInfo: Dispatch<(prevState: undefined) => undefined>;
  slidePanelState: SlidePanelStateType;
  setSlidePanelState: Dispatch<SetStateAction<SlidePanelStateType>>;
  localizationsLoading: boolean;
  localizationsRefetch: () => void;
  localizationSchema: any;
  centerVehicleInMap?: (carroId: number) => void;
  consultVehicleHistoric?: (
    carro_id: string,
    inicio: string,
    fim: string
  ) => void;
  coordsToCenterPointInMap: coordsToCenterMap;
  setCoordsToCenterPointInMap: Dispatch<SetStateAction<coordsToCenterMap>>;
  refs: unknown;
  setRefs: Dispatch<SetStateAction<unknown>>;
  setVehicleOnFocusId: Dispatch<SetStateAction<number>>;
  vehicleOnFocusId: number;
};

type ProviderProps = {
  children: ReactNode;
};

type SlidePanelStateType = {
  type: 'create' | 'update';
  data?: null;
  open: boolean;
};

export const LocalizationContext = createContext<LocalizationContextProps>(
  {} as LocalizationContextProps
);

export const LocalizationProvider = ({ children }: ProviderProps) => {
  const [slidePanelState, setSlidePanelState] = useState<SlidePanelStateType>({
    type: 'create',
    open: false,
  });
  const [vehicleOnFocusId, setVehicleOnFocusId] = useState();
  const [vehicleLocationInfo, setVehicleLocationInfo] = useState();
  const [vehicleConsultData, setVehicleConsultData] = useState<vehicle>();
  const [allUserVehicle, setAllUserVehicle] = useState<vehicle[]>([]);
  const [coordsToCenterMap, setCoordsToCenterMap] = useState<coordsToCenterMap>(
    {}
  );
  const [localizationsLoading, setLocalizationsLoading] = useState(false);
  const localizationSchema = yup.object().shape({
    carro_id: yup.string(),
  });
  const [coordsToCenterPointInMap, setCoordsToCenterPointInMap] =
    useState<coordsToCenterMap>({});
  const [refs, setRefs] = useState({});

  function centerVehicleInMap(carroId: number) {
    const vehicle = allUserVehicle?.filter((elem: vehicle) => {
      if (elem.carro_id === carroId) return elem;
    });

    if (vehicle) {
      setCoordsToCenterMap({
        lat: Number(vehicle[0].latitude),
        lng: Number(vehicle[0].longitude),
        carro_id: vehicle[0].carro_id,
      });
    }
  }
  async function localizationsRefetch() {
    await updateAllUserVehiclesLocations();
  }
  async function updateAllUserVehiclesLocations() {
    setLocalizationsLoading(true);
    const response = await getAllUserVehicles('operacional@radarescolta.com');
    const responseGetUserVehicles = response?.filter((vehicle) => {
      if (vehicle.latitude && vehicle.longitude) return vehicle;
    });
    if (responseGetUserVehicles) setAllUserVehicle(responseGetUserVehicles);
    setLocalizationsLoading(false);
  }

  async function consultVehicleHistoric(
    carro_id: string,
    inicio: string,
    fim: string
  ) {
    setLocalizationsLoading(true);
    const response = await getVehicleHistoric(carro_id, inicio, fim);
    setVehicleConsultData(response);
    setLocalizationsLoading(false);
  }

  useEffect(() => {
    updateAllUserVehiclesLocations();
    setInterval(async () => {
      updateAllUserVehiclesLocations();
    }, 30000);
  }, []);

  // useEffect(() => {
  //     const refsList = allUserVehicle.reduce((acc, value) => {
  //       acc[String(value.carro_id)] = React.createRef();
  //       return acc;
  //     }, {});
  //     console.log('refsList');
  //     console.log(refsList);

  //     setRefs(refsList)
  // },[allUserVehicle])

  return (
    <LocalizationContext.Provider
      value={{
        localizationsRefetch,
        slidePanelState,
        setSlidePanelState,
        localizationSchema,
        vehicleLocationInfo,
        setVehicleLocationInfo,
        allUserVehicle,
        setAllUserVehicle,
        centerVehicleInMap,
        coordsToCenterMap,
        localizationsLoading,
        vehicleConsultData,
        setVehicleConsultData,
        consultVehicleHistoric,
        coordsToCenterPointInMap,
        setCoordsToCenterPointInMap,
        refs,
        setRefs,
        setVehicleOnFocusId,
        vehicleOnFocusId,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  return useContext(LocalizationContext);
};
