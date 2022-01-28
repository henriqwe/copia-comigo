import { ChevronDoubleDownIcon } from '@heroicons/react/outline'

export const DownArrowIcon = ({ ...props }: React.ComponentProps<'svg'>) => (
  <ChevronDoubleDownIcon {...props} className={`${props.className}`} />
)
