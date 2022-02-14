import * as common from '@comigo/ui-common'

const optionsHorizontal = {
  responsive: false,
  indexAxis: 'y' as const,
  plugins: {
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    legend: {
      position: 'right' as const,
      display: false
    }
  }
}

const dataHorizontal = {
  labels: ['0 - 1h', '1 - 6h', '6 - 24h', '24 - 72h', 'Manutenção'],
  datasets: [
    {
      label: '',
      data: [2418, 60, 17, 10, 203],
      borderColor: 'white',
      backgroundColor: ['#00af00', '#007000', 'orange', 'red', 'red']
    }
  ]
}

export function VehicleCommunicationPanel() {
  return (
    <div className="col-span-5 ">
      <span className="text-xl font-medium w-full flex  text-gray-900">
        Comunicação dos veículos
      </span>
      <common.Card compact className="  flex-1 mt-3 h-48 flex items-center">
        <div className="flex w-full justify-between items-center px-4 flex-1">
          <common.charts.HorizontalBarChart
            options={optionsHorizontal}
            data={dataHorizontal}
          />
          {/* <common.charts.DoughnutChart
          options={optionsDoughnut}
          data={dataDoughnut}
        /> */}
          <div className="flex flex-col ">
            <span className="text-lg font-medium text-green-500">2418</span>
            <span className="text-xs text-gray-500 border-b-2">
              Veículos atualizados
            </span>

            <span className="text-lg font-medium text-yellow-500">87</span>
            <span className="text-xs text-gray-500 border-b-2">
              Veículos desatualizados
            </span>
            <span className="text-lg font-medium text-red-800">203</span>
            <span className="text-xs text-gray-500">Veículos em manuteção</span>
          </div>
        </div>
      </common.Card>
    </div>
  )
}
