import List from './ListProducts'
import RowActions from './ListProducts/rowActions'
import InternalNavigation from './InternalNavigation'
import Create from './SlidePanel/CreateProduct'
import Update from './Forms/UpdateProduct'
import SlidePanel from './SlidePanel'
import Tabs from './Tabs'
import { ProductContext, ProductProvider, useProduct } from './ProductsContext'
import { UpdateContext, UpdateProvider, useUpdate } from './UpdateContext'

export * as products from './Tabs/Products'
export * as services from './Tabs/Services'
export * as upSelling from './Tabs/UpSelling'
export * as attributes from './Tabs/Attributes'
export * as alerts from './Tabs/Alerts'

export {
  List,
  RowActions,
  InternalNavigation,
  Create,
  SlidePanel,
  Tabs,
  Update,
  ProductContext,
  ProductProvider,
  useProduct,
  UpdateContext,
  UpdateProvider,
  useUpdate,
}
