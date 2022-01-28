import * as blocks from '@comigo/ui-blocks'
import * as operators from '&erp/domains/production/identifiable/Chips/Operators'

export default function List() {
  const { operatorsData } = operators.useOperator()
  return operatorsData ? (
    <blocks.Table
      colection={operatorsData}
      columnTitles={[
        { title: 'Nome', fieldName: 'Nome' },
        { title: 'Apn', fieldName: 'Apn' },
        { title: 'Usuario', fieldName: 'Usuario' }
      ]}
      actions={operators.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
