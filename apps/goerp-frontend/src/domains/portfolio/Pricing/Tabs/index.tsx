import * as blocks from '@comigo/ui-blocks'

import { List as ServicesList } from './Services'
import { List as ProductsList } from './Products'

const sections = {
  Produtos: <ProductsList />,
  Serviços: <ServicesList />
}

export function Tabs() {
  return <blocks.Tabs categories={sections} />
}
