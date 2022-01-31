import * as blocks from '@comigo/ui-blocks'
import * as flows from '&crm/domains/services/Registration/Flows'

export default function List() {
  const { flowsData } = flows.useFlow()
  return flowsData ? (
    <blocks.Table
      colection={flowsData}
      columnTitles={[{ title: 'Nome', fieldName: 'Nome' }]}
      actions={flows.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
