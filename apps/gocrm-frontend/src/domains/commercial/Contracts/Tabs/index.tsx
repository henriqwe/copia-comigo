import * as blocks from '@comigo/ui-blocks'

import { List } from './Versions'

const sections = {
  Versões: <List />
}

export default function Tabs() {
  return <blocks.Tabs categories={sections} />
}
