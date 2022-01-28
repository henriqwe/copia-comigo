import { CloudDownloadIcon } from '@heroicons/react/outline'

export const MoveIcon = ({ ...props }: React.ComponentProps<'svg'>) => (
  <CloudDownloadIcon
    {...props}
    className={`w-5 h-5 text-theme-9 ${props.className}`}
  />
)
