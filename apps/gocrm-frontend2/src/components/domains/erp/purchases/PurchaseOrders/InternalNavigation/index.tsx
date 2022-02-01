import * as common from '&test/components/common'

import { Actions } from './actions'

const InternalNavigation = () => {
  return (
    <common.MainMenu
      ActionsGroup={Actions()}
      FiltersGroup={[{ title: 'test', url: '/' }]}
    />
  )
}

export default InternalNavigation
