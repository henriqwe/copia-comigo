import { RefreshIcon } from '@heroicons/react/outline'
import * as common from '@comigo/ui-common'

export default function ReloadPage({
  reload
}: {
  reload: { state: boolean; action: () => void }
}) {
  return reload.state ? (
    <common.AnimatedSpin
      className="w-6 h-6 cursor-pointer text-theme-1 dark:text-theme-2"
      data-testid="spin"
    />
  ) : (
    <RefreshIcon
      className="w-6 h-6 cursor-pointer text-theme-1 dark:text-theme-2"
      onClick={() => reload.action()}
      data-testid="refresh"
    />
  )
}
