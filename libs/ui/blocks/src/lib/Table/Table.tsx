import * as table from '.'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import * as Styles from './_styles'
type TableListType = {
  colection: any
  columnTitles: {
    title: string
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
}

export const Table = ({
  colection = [],
  columnTitles = [],
  search,
  pagination,
  tableName,
  actions
}: TableListType) => {
  return (
    <>
      <div className="z-10 col-span-12 overflow-auto intro-y">
        {search && <table.Search pagination={pagination} search={search} />}
        <table
          className={`${Styles.table['table']} ${Styles.tableReport['table-report']}`}
        >
          <thead>
            <table.ColumnTitle
              disableActions={!actions}
              columns={columnTitles}
            />
          </thead>
          <tbody data-testid="tbody">
            {(tableName ? colection[tableName as unknown as number] : colection)
              .length ? (
              <table.Rows
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
