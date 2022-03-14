import * as service from '&erp/domains/operational/ServiceOrders'
import * as common from '@comigo/ui-common'
import { links } from './links'
import { Filters } from './filters'

export const InternalNavigation = () => {
  const { filters, setFilters } = service.useServiceOrder()
  return (
    <common.MainMenu
      LinkGroup={links}
      FiltersGroup={Filters()}
      filters={filters}
      setFilters={setFilters}
    />
  )
}
