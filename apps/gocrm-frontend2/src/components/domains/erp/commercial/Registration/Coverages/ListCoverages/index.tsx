import * as blocks from '&test/components/blocks'
import * as coverages from '&test/components/domains/erp/commercial/Registration/Coverages'

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
