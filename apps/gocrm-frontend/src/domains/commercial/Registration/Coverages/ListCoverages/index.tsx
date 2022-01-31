import * as blocks from '@comigo/ui-blocks'
import * as coverages from '&crm/domains/commercial/Registration/Coverages'

export default function List() {
  const { coveragesData } = coverages.useCoverage()
  return coveragesData ? (
    <blocks.Table
      colection={coveragesData}
      columnTitles={[{ title: 'Nome', fieldName: 'Nome' }]}
      actions={coverages.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
