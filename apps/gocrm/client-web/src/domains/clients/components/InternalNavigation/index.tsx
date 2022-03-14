import * as common from '@comigo/ui-common'
import { Actions } from './actions'

export function InternalNavigation() {
  return <common.MainMenu ActionsGroup={Actions()} />
}
