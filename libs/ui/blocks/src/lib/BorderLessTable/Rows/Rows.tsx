import * as table from '../itens'

type RowsType = {
  lines: any[]
  columns: {
    title: string
    fieldName: string
    type?: 'date' | 'relationship' | 'handler' | undefined
    handler?: (valor: string) => string
  }[]
  actions?: (item: { item: { title: string; fieldName: string } }) => string
  noIntro?: boolean
}

export function Rows({ lines, columns, actions, noIntro }: RowsType) {
  return (
    <>
      {lines.map((item, index) => (
        <table.Row
          noIntro
          columns={columns}
          item={item}
          actions={actions}
          key={`table-row-${index}`}
        />
      ))}
    </>
  )
}
