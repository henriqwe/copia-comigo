import { SwitchVerticalIcon } from '@heroicons/react/outline'

export const ReturnIcon = ({ ...props }: React.ComponentProps<'svg'>) => (
  <SwitchVerticalIcon
    {...props}
    className={` w-5 h-5 text-white ${props.className}`}
  />
)
