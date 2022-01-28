import { PlusIcon } from '@heroicons/react/outline'

export const AddIcon = ({ ...props }: React.ComponentProps<'svg'>) => (
  <PlusIcon {...props} className={`${props.className}`} />
)
