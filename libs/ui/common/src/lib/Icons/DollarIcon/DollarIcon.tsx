import { CurrencyDollarIcon } from '@heroicons/react/outline'

export const DollarIcon = ({ ...props }: React.ComponentProps<'svg'>) => (
  <CurrencyDollarIcon
    {...props}
    className={`w-5 h-5 text-success ${props.className}`}
  />
)
