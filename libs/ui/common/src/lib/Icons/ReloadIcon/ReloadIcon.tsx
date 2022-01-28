import { RefreshIcon as HeroIconRefresh } from '@heroicons/react/outline'

export const ReloadIcon = ({ ...props }: React.ComponentProps<'svg'>) => (
  <HeroIconRefresh {...props} className={`${props.className}`} />
)