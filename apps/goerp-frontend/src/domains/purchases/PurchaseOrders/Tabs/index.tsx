import * as blocks from '@comigo/ui-blocks'
import * as orcamentos from './Budgets'
import { LogsList } from './LogsList'

const sections = {
  Orçamentos: <orcamentos.List />,
  Logs: <LogsList />
}

export function Tabs() {
  return <blocks.Tabs categories={sections} />
}
