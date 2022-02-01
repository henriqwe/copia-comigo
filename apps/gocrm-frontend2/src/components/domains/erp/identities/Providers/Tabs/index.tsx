import * as blocks from '&test/components/blocks'
import * as addresses from './Addresses'
import * as sellers from './Sellers'

const sections = {
  Endereços: <addresses.List />,
  Vendedores: <sellers.List />
}

export default function Tabs() {
  return <blocks.Tabs categories={sections} />
}
