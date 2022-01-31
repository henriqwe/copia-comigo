import * as blocks from '@comigo/ui-blocks'
import * as questionsGroups from '&crm/domains/services/Registration/Questions/Groups'

export default function List() {
  const { questionsGroupsData } = questionsGroups.useList()
  return questionsGroupsData ? (
    <blocks.Table
      colection={questionsGroupsData}
      columnTitles={[{ title: 'Nome', fieldName: 'Nome' }]}
      actions={questionsGroups.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
