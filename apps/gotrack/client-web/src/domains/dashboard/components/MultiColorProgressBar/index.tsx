const labels = [
  { quantity: 1808, titule: '0 - 1h', color: 'bg-blue-600' },
  { quantity: 81, titule: '1 - 6h', color: 'bg-blue-500' },
  { quantity: 52, titule: '6 - 24h', color: 'bg-yellow-500' },
  { quantity: 21, titule: '24 - 48h', color: 'bg-orange-500' },
  { quantity: 12, titule: '48 - 72h', color: 'bg-pink-500' },
  { quantity: 253, titule: 'Falha na comunicação', color: 'bg-red-500' },
  { quantity: 132, titule: 'Manutenção', color: 'bg-gray-900' }
]
export function MultiColorProgressBar() {
  return (
    <div className="flex flex-col w-full mt-1 h-full">
      <div className="w-full h-5 flex rounded-full">{createBars(labels)}</div>
      <ul className="grid grid-cols-2 grid-rows-3 mt-3 grid-flow-col">
        {labels.map((label, idx) => {
          return <li key={idx}>{labelProgressiveBar(label)}</li>
        })}
      </ul>
    </div>
  )
}

function labelProgressiveBar({
  quantity,
  titule,
  color
}: {
  quantity: number
  titule: string
  color: string
}) {
  return (
    <div className="flex items-center mt-1">
      <div>
        <div className={`h-4 w-4 ${color} mr-2 rounded-full`}></div>
      </div>
      <div className="flex flex-col">
        <span className="text-base font-medium">{quantity}</span>
        <span className="text-xs text-gray-500">{titule}</span>
      </div>
    </div>
  )
}

function createBars(
  labels: {
    quantity: number
    titule: string
    color: string
  }[]
) {
  const quantityTotal = labels.reduce((acc, label) => {
    return label.quantity + acc
  }, 0)

  return labels.map((label, idx) => {
    const percent = (label.quantity * 100) / quantityTotal
    const rounded = genereteRounded(idx, labels)
    return (
      <div
        key={idx}
        className={`${label.color} ${rounded}`}
        style={{ width: `${percent}%` }}
      />
    )
  })
}

function genereteRounded(idx, labels) {
  if (labels.length === 1) {
    return 'rounded-full'
  }
  if (idx === 0) {
    return 'rounded-l-full'
  }
  if (idx === labels.length - 1) {
    return 'rounded-r-full'
  }
  return ''
}
