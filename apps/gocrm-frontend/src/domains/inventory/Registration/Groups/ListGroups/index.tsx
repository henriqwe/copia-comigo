import * as blocks from '@comigo/ui-blocks'
import * as groups from '&crm/domains/inventory/Registration/Groups'

export default function List() {
  const { filteredGroups, filters, setFilters } = groups.useGroup()
  return filteredGroups ? (
    <blocks.Table
      colection={filteredGroups}
      tableName="estoque_Grupos"
      columnTitles={[
        { title: 'Nome', fieldName: 'Nome' },
        { title: 'Descrição', fieldName: 'Descricao' }
      ]}
      actions={groups.RowActions}
      pagination={{ filters, setFilters }}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
