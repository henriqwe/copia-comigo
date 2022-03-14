import * as table from '../itens'
import { ptBRtimeStamp } from '@comigo/utils'

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
  noIntro?: boolean
}

export function Row({ columns, item, actions, noIntro = false }: RowProps) {
  return (
    <tr className={`${!noIntro && 'intro-x'} `} data-testid="linha">
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
