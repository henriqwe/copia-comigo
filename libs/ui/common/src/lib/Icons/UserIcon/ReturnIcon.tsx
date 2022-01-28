import { UserIcon as Icon } from '@heroicons/react/outline'

const UserIcon = ({ ...props }: React.ComponentProps<'svg'>) => (
  <Icon
    {...props}
    className={`w-8 h-8 p-1 image-fit border rounded-full dark:border-white border-theme-13 dark:text-white text-primary-1 ${props.className}`}
  />
)

export default UserIcon
