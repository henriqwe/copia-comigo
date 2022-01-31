import * as blocks from '@comigo/ui-blocks'

type RowsType = {
  lines: any[]
  columns: {
    title: string
    fieldName: string
    type?: 'date' | 'relationship' | 'handler' | undefined
    handler?: (valor: string) => string
  }[]
  actions?: (item: { item: { title: string; fieldName: string } }) => string
}

export function Rows({ lines, columns, actions }: RowsType) {
  return (
    <>
      {lines.map((item, index) => (
        <blocks.table.Row
          columns={columns}
          item={item}
          actions={actions}
          key={`table-row-${index}`}
        />
      ))}
    </>
  )
}
