import * as table from '&test/components/blocks/BorderLessTable/itens'
import { ptBRtimeStamp } from '&test/utils/formaters'

type RowProps = {
  actions?: (item: { item: { title: string; fieldName: string } }) => void
  columns: {
    title: string
    fieldName: string
    type?: 'date' | 'relationship' | 'handler' | undefined
    relationshipName?: string
    handler?: (valor: string) => string
  }[]
  item: any
}

export default function Row({ columns, item, actions }: RowProps) {
  return (
    <tr className="intro-x" data-testid="linha">
      {columns.map((coluna, index) => {
        if (coluna.type === 'date') {
          return (
            <table.Field
              key={`table-cell-${index}`}
              value={ptBRtimeStamp(item[coluna.fieldName])}
              position={index === 0 ? 'left' : 'right'}
            />
          )
        }
        if (coluna.type === 'relationship') {
          return (
            <table.Field
              key={`table-cell-${index}`}
              value={item[coluna.relationshipName as string][coluna.fieldName]}
              position={index === 0 ? 'left' : 'right'}
            />
          )
        }
        if (coluna.type === 'handler' && coluna.handler) {
          return (
            <table.Field
              key={`table-cell-${index}`}
              value={coluna.handler(item[coluna.fieldName as string])}
              position={index === 0 ? 'left' : 'right'}
            />
          )
        }
        if (coluna.type === undefined) {
          return (
            <table.Field
              key={`table-cell-${index}`}
              value={item[coluna.fieldName]}
              position={index === 0 ? 'left' : 'right'}
            />
          )
        }
      })}
      {actions && actions({ item: item })}
    </tr>
  )
}
