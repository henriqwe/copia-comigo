import * as blocks from '&test/components/blocks'

import { List } from './Versions'

const sections = {
  Versões: <List />
}

export default function Tabs() {
  return <blocks.Tabs categories={sections} />
}
