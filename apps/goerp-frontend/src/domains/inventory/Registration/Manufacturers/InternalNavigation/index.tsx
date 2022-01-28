import * as common from '@comigo/ui-common'
import * as manufacturers from '&erp/domains/inventory/Registration/Manufacturers'

import { Actions } from './actions'
import { Filters } from './filters'
import { links } from './links'

export const InternalNavigation = () => {
  const { setFilters, filters } = manufacturers.useManufacturer()
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
