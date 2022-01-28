import { BanIcon } from '@heroicons/react/outline'

export const BlockIcon = ({ ...props }: React.ComponentProps<'svg'>) => (
  <BanIcon {...props} className={`w-5 h-5 text-white ${props.className}`} />
)
