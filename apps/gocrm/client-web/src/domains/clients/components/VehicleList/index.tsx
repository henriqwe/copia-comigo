type VehicleListProps = {
  itens: {
    activeAmount: string | number
    desactiveAmount: string | number
    title: string
  }[]
  position?: 'left' | 'right'
}

export function VehicleList({ itens, position = 'left' }: VehicleListProps) {
  return (
    <div className={`${position === 'left' ? 'text-left' : 'text-right'}`}>
      {itens.map((item, index) => (
        <p key={index}>
          {position === 'left' && (
            <span className={`text-xl font-bold text-primary`}>
              {item.activeAmount}
            </span>
          )}{' '}
          {item.title}{' '}
          {position === 'right' && (
            <span className={`text-xl font-bold text-primary`}>
              {item.activeAmount}
            </span>
          )}
        </p>
      ))}
    </div>
  )
}
