import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

type DoughnutChartProps = {
  options: {
    responsive: boolean
    plugins: {
      legend: {
        position: string
        fontColor: string
        display?: boolean
      }
      title?: {
        display: boolean
        text: string
      }
    }
    cutout: string | number
  }

  data: {
    labels: string | string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string | string[]
      borderColor: string | string[]
      borderWidth: number
    }[]
  }
  width?: string | number | undefined
  height?: string | number | undefined
}

export function DoughnutChart({
  data,
  options,
  width = undefined,
  height = undefined
}: DoughnutChartProps) {
  return (
    <Doughnut options={options} data={data} width={width} height={height} />
  )
}
