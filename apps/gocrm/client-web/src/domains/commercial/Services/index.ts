import List from './ListServices'
import RowActions from './ListServices/rowActions'
import InternalNavigation from './InternalNavigation'
import Create from './SlidePanel/CreateService'
import Update from './Forms/UpdateService'
import SlidePanel from './SlidePanel'
import Tabs from './Tabs'
import { ServiceContext, ServiceProvider, useService } from './ServiceContext'
import { UpdateContext, UpdateProvider, useUpdate } from './UpdateContext'

export * as products from './Tabs/Products'
export * as services from './Tabs/Services'
export * as upSelling from './Tabs/UpSelling'
export * as attributes from './Tabs/Attributes'
export * as tariffs from './Tabs/Tariffs'
export * as alerts from './Tabs/Alerts'

export {
  List,
  RowActions,
  InternalNavigation,
  Tabs,
  Create,
  SlidePanel,
  Update,
  ServiceContext,
  ServiceProvider,
  useService,
  UpdateContext,
  UpdateProvider,
  useUpdate
}
