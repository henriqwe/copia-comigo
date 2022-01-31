import * as blocks from '@comigo/ui-blocks'

import { List as AttributesList } from './Activities'

const sections = {
  Atividades: <AttributesList />
}

export default function Tabs() {
  return <blocks.Tabs categories={sections} />
}
