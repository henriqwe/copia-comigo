import { UserIcon as Icon } from '@heroicons/react/outline'

export const UserIcon = ({ ...props }: React.ComponentProps<'svg'>) => (
  <Icon
    {...props}
    className={`w-8 h-8 p-1 image-fit border rounded-full dark:border-white dark:text-white border-zinc-500 text-primary-1 ${props.className}`}
  />
)