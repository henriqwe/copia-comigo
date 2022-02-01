import * as proposals from '&test/components/domains/erp/commercial/Proposals'
import * as blocks from '&test/components/blocks'

export default function List() {
  const { proposalsData } = proposals.useList()
  return proposalsData ? (
    <blocks.Table
      colection={proposalsData}
      columnTitles={[
        {
          title: 'Situação',
          fieldName: 'Comentario',
          type: 'relationship',
          relationshipName: 'Situacao'
        },
        {
          title: 'Data de criação',
          fieldName: 'created_at',
          type: 'date'
        }
      ]}
      actions={proposals.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
