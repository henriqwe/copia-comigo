import * as table from './itens'
import { Dispatch, ReactNode, SetStateAction } from 'react'

type TableListType = {
  colection: any
  columnTitles: {
    title: string | ReactNode
    fieldName: string
    type?: 'date' | 'relationship' | 'handler' | undefined
    relationshipName?: string

    handler?: (valor: any) => string | ReactNode
  }[]
  pagination?: {
    filters: { limit: number; offset: number; currentPage: number; where: any }
    setFilters: Dispatch<
      SetStateAction<{
        limit: number
        offset: number
        currentPage: number
        where: any
      }>
    >
  }
  tableName?: string
  search?: { field: string[]; where: any }
  actions?: (item: any) => any
  noIntro?: boolean
}

export const BorderLessTable = ({
  colection = [],
  columnTitles = [],
  search,
  pagination,
  tableName,
  actions,
  noIntro = false
}: TableListType) => {
  return (
    <>
      <div
        className={`z-10 col-span-12 overflow-auto ${!noIntro && 'intro-y'}`}
      >
        {search && <table.Search pagination={pagination} search={search} />}
        <table className="table">
          <thead>
            <table.ColumnTitle
              disableActions={!actions}
              columns={columnTitles}
            />
          </thead>
          <tbody>
            {(tableName ? colection[tableName as unknown as number] : colection)
              .length ? (
              <table.Rows
                noIntro
                actions={actions}
                lines={
                  tableName
                    ? colection[tableName as unknown as number]
                    : colection
                }
                columns={columnTitles}
              />
            ) : (
              <table.EmptyLine
                itensLength={
                  actions ? columnTitles.length + 1 : columnTitles.length
                }
              />
            )}
          </tbody>
        </table>
      </div>
      {pagination ? (
        <table.Pagination
          collection={colection}
          pagination={pagination}
          tableName={tableName || ''}
        />
      ) : (
        <div data-testid="sempagina" />
      )}
    </>
  )
}
