import { XIcon } from '@heroicons/react/outline'

export function CloseIcon({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <XIcon className={`w-5 h-5 text-white ${props.className}`} {...props} />
  )
}