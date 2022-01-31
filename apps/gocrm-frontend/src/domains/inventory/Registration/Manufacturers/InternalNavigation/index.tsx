import * as common from '@comigo/ui-common'
import * as manufacturers from '&crm/domains/inventory/Registration/Manufacturers'

import { Actions } from './actions'
import { Filters } from './filters'
import { links } from './links'

const InternalNavigation = () => {
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

export default InternalNavigation