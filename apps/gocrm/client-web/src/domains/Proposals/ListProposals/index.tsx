import * as proposals from '&crm/domains/Proposals'
import * as blocks from '@comigo/ui-blocks'

export function ListProposals() {
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
