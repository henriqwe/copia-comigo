import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type HorizontalBarChartProps = {
  options: {
    indexAxis: string
    elements: {
      bar: {
        borderWidth: number
      }
    }
    responsive: boolean
    plugins: {
      legend: {
        position: string
        display?: boolean
      }
      title: {
        display: boolean
        text: string
      }
    }
  }
  data: {
    labels: string[]
    datasets: [
      {
        label: string
        data: number[]
        backgroundColor: string[]
        borderColor: string[]
        borderWidth: number
      }
    ]
  }
  width?: string | number | undefined
  height?: string | number | undefined
}
export function HorizontalBarChart({
  data,
  options,
  width = undefined,
  height = undefined
}: HorizontalBarChartProps) {
  return <Bar options={options} width={width} height={height} data={data} />
}
