import * as blocks from '@comigo/ui-blocks'
import { LogsList } from './LogsList'

const sections = {
  Logs: <LogsList />
}

export function Tabs() {
  return <blocks.Tabs categories={sections} />
}
