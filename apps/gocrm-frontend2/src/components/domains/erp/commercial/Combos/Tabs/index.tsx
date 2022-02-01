import * as blocks from '&test/components/blocks'

import { List as ProductsList } from './Combos'

const sections = {
  'Combos dependentes': <ProductsList />
}

export default function Tabs() {
  return <blocks.Tabs categories={sections} />
}
