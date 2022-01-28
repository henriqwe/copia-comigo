import * as common from '@comigo/ui-common'
import * as groups from '&erp/domains/inventory/Registration/Groups'
import { Actions } from './actions'
import { Filters } from './filters'
import { links } from './links'

export const InternalNavigation = () => {
  const { setFilters, filters } = groups.useGroup()
  return (
    <common.MainMenu
      LinkGroup={links}
      ActionsGroup={Actions()}
      FiltersGroup={Filters()}
      filters={filters}
      setFilters={setFilters}
    />
  )
}
