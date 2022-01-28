import * as common from '@comigo/ui-common'
import { links } from '../../links'

import { Actions } from './actions'

export const InternalNavigation = () => {
  return (
    <common.MainMenu
      ActionsGroup={Actions()}
      FiltersGroup={[{ title: 'test', url: '/' }]}
      LinkGroup={links}
    />
  )
}


