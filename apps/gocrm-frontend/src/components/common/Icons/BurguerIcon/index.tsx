import { MenuIcon } from '@heroicons/react/outline'

const BurguerIcon = ({ ...props }: React.ComponentProps<'svg'>) => (
  <MenuIcon
    {...props}
    className={`w-5 h-5 dark:text-white text-black ${props.className}`}
  />
)

export default BurguerIcon
