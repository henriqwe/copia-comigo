import * as common from '&test/components/common'
import { Actions } from './actions'
import { links } from './links'

const InternalNavigation = () => {
  return <common.MainMenu LinkGroup={links} ActionsGroup={Actions()} />
}

export default InternalNavigation
