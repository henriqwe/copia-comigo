import { CheckIcon } from '@heroicons/react/outline'

export const AuthorizationIcon = ({ ...props }: React.ComponentProps<'svg'>) => (
  <CheckIcon {...props} className={`w-5 h-5 text-theme-9 ${props.className}`} />
)
